import isDevEnv from "@/lib/isDevEnv";
import { AuthState } from "@/state/slices/authStateSlice";
import { TAuthState } from "@/types/state";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import GlobalLoader from "./globalLoader";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "../ui/card";

import handleDashboardGetCategories from "@/api/handleDashboardGetCategories";
import GlobalEmptyPlaceholder from "./globalEmptyPlaceholder";

export default function WantedCategoryList() {
  const authState: TAuthState = useSelector(AuthState);
  const router = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEmpty, setIsEmpty] = useState<boolean>(true);

  const [categoryList, setCategoryList] = useState<string[]>([]);

  function handleViewCategorizedWantedList(selectedCategory: string) {
    let wantedCategory: string = "";

    String(selectedCategory)
      .toLowerCase()
      .split(" ")
      .forEach((word, index) => {
        if (index !== 0) {
          wantedCategory = `${wantedCategory}-${word}`;
        } else {
          wantedCategory = word;
        }
      });

    router(`/wanted-categories/${wantedCategory}`, {
      state: { trigger: "user" },
    });
  }

  const handleFetchData = useCallback(
    async function () {
      if (authState.isAuthenticated && authState.authenticatedUser !== null) {
        setIsLoading(true);

        try {
          const response = await handleDashboardGetCategories(
            authState.authenticatedUser.token
          );

          if (response !== undefined && response.status === "success") {
            setCategoryList(response.data!);
            setIsLoading(false);
            setIsEmpty(false);

            if (response.data!.length === 0) {
              setIsEmpty(true);
            }
          } else if (response !== undefined && response.status === "error") {
            setIsEmpty(true);
          }
        } catch (error) {
          if (isDevEnv) {
            console.error("FETCH_DASHBOARD_FAILURE", error);
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
    [authState.authenticatedUser, authState.isAuthenticated, router]
  );

  useEffect(() => {
    handleFetchData();
  }, [handleFetchData]);

  return (
    <div
      className={cn(
        isLoading || isEmpty
          ? "flex flex-row justify-center items-start w-full h-full min-h-[100px] bg-zinc-950 rounded-lg"
          : "grid auto-rows-min grid-cols-1 lg:grid-cols-3 grid-rows-4 gap-4 w-full min-h-[100px] rounded-lg"
      )}
    >
      {isLoading ? (
        <GlobalLoader message="Loading Most Wonted List" type="card" />
      ) : isEmpty ? (
        <div className="grid col-span-full lg:col-span-full rounded-xl justify-items-stretch text-center content-center w-full h-full border-0 mb-4 bg-black cursor-pointer">
          <GlobalEmptyPlaceholder
            type="page"
            message={`
                      <p style="font-weight:700">
                        There was a problem loading the categories data
                      </p> <br/>
                      <p style="color:#fff;font-size:0.7rem;margin-top:2px">
                          Please reload the page.
                      </p> 
                   `}
          />
        </div>
      ) : (
        categoryList.length > 0 &&
        categoryList.map(
          (category, index: number) =>
            category !== null && (
              <Card
                key={index}
                onClick={() => handleViewCategorizedWantedList(category)}
                className="grid row-span-4 col-span-1 lg:col-span-1 rounded-xl justify-items-stretch text-center content-start w-full min-h-[200px] border-0 mb-4 bg-zinc-950 hover:bg-zinc-900 cursor-pointer"
              >
                <CardContent className="flex flex-col items-center justify-center h-[200px]">
                  <p className="block w-full text-center text-md text-blue-400 font-bold">
                    {category}
                  </p>
                </CardContent>
              </Card>
            )
        )
      )}
    </div>
  );
}
