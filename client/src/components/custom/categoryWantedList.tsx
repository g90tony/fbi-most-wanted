import isDevEnv from "@/lib/isDevEnv";
import { AuthState } from "@/state/slices/authStateSlice";
import { TAuthState } from "@/types/state";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import GlobalLoader from "./globalLoader";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "../ui/card";

import handleDashboardGetCategoryList from "@/api/handleDashboardGetCategoryList";
import { TDashboardListResponse } from "@/types/apiResponse";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import handleDashboardGetInitialList from "@/api/handleDashboardGetInitialList";
import { TWantedPersonMeta } from "@/types/types";

export default function CategoriesCategoryWantedList() {
  const authState: TAuthState = useSelector(AuthState);
  const router = useNavigate();
  const params = useParams();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [wantedList, setWantedList] = useState<TDashboardListResponse>([]);

  function handleViewWantedPerson(personUID: string) {
    router(`/wanted-persons/${personUID}`);
  }

  const handleAddToPersonalList = useCallback(
    async function (selectedPerson: TWantedPersonMeta) {
      if (authState.isAuthenticated && authState.authenticatedUser !== null) {
        try {
          const response = await handleDashboardGetInitialList(
            authState.authenticatedUser.token
          );

          if (response) {
            toast.success(
              `${selectedPerson.title} wass added successfully to your watch list`,
              {
                id: "add-to-watchlist",
              }
            );
          }
        } catch (error) {
          if (isDevEnv) {
            console.error("FETCH_DASHBOARD_FAILURE", error);
          }
          toast.error(
            "There was a problem loading the data. Please try again later",
            {
              id: "add-to-watchlist",
            }
          );
        }
      } else {
        router("/signup");
      }
    },
    [authState.authenticatedUser, authState.isAuthenticated, router]
  );

  const handleFetchData = useCallback(
    async function () {
      if (authState.isAuthenticated && authState.authenticatedUser !== null) {
        setIsLoading(true);

        const category = params.category;

        let wantedCategory: string = "";

        String(category)
          .toLowerCase()
          .split(" ")
          .forEach((word, index) => {
            if (index !== 0) {
              wantedCategory = `${wantedCategory}-${word}`;
            } else {
              wantedCategory = word;
            }
          });

        console.log(category);

        try {
          const response = await handleDashboardGetCategoryList(
            authState.authenticatedUser.token,
            category!
          );

          if (response !== undefined && response.status === "success") {
            setWantedList(response.data);
            setIsLoading(false);
          }
        } catch (error) {
          if (isDevEnv) {
            console.error("FETCH_CATEGORY_LIST_FAILURE", error);
          }

          toast.error(
            "There was a problem loading the data. Please try again later",
            {
              id: "fetch-dashboard-statistics",
            }
          );
        }
      } else {
        router("/signup");
      }
    },
    [
      authState.authenticatedUser,
      authState.isAuthenticated,
      params.category,
      router,
    ]
  );

  useEffect(() => {
    handleFetchData();
  }, [handleFetchData]);

  return (
    <div
      className={cn(
        isLoading
          ? "flex flex-row justify-center items-start w-full h-full min-h-[100px] bg-zinc-950 rounded-lg"
          : "grid grid-cols-1 lg:grid-cols-3 gap-4 w-full h-full rounded-lg"
      )}
    >
      {isLoading ? (
        <GlobalLoader message="Loading Most Wonted List" type="card" />
      ) : (
        wantedList.length > 0 &&
        wantedList.map((person, index: number) => (
          <Card
            key={index}
            onClick={() => handleViewWantedPerson(person.uid)}
            className="grid col-span-1 lg:col-span-1 rounded-xl justify-items-stretch text-center content-start w-full h-full max-h-[550px] border-0 mb-4 bg-zinc-950"
          >
            <CardHeader className="flex flex-row justify-end items-center w-full h-auto">
              <Button
                onClick={() => handleAddToPersonalList(person)}
                className="bg-blue-400 text-sm font-bold rounded-full border-0 w-auto h-8"
              >
                Add to WatchList <Plus />
              </Button>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-start h-[400px]">
              <div className="flex flex-row w-full h-[350px] mb-4">
                <img
                  src={person.image}
                  alt={person.title}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <p className="block w-full text-md text-blue-400 text-start font-bold">
                {String(person.title).split("-")[0]}
              </p>
              <p className="block w-full text-sm text-white text-start font-semibold">
                Nationality: {person.nationality ? person.nationality : "--"}
              </p>
              <p className="block w-full text-sm text-white text-start font-semibold">
                Published on:{" "}
                {person.publication
                  ? new Date(person.publication).toDateString()
                  : "--"}
              </p>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
