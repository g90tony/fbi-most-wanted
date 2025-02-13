import handleGetWantedList from "@/api/handleGetWantedList";
import isDevEnv from "@/lib/isDevEnv";
import { AuthState } from "@/state/slices/authStateSlice";
import { TWantedListResponse } from "@/types/apiResponse";
import { TAuthState } from "@/types/state";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import GlobalLoader from "./globalLoader";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "../ui/card";

export default function WantedList() {
  const authState: TAuthState = useSelector(AuthState);
  const router = useNavigate();

  const observerRef = useRef<IntersectionObserver>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [wantedList, setWantedList] = useState<TWantedListResponse>([]);

  function handleViewWantedPerson(personUID: string) {
    router(`/wanted-persons/${personUID}`, {
      state: { trigger: "user" },
    });
  }

  const handleFetchData = useCallback(
    async function () {
      if (authState.isAuthenticated && authState.authenticatedUser !== null) {
        if (currentPage === 1) setIsLoading(true);

        try {
          const response = await handleGetWantedList(
            authState.authenticatedUser.token,
            currentPage
          );

          if (response !== undefined && response.status === "success") {
            setWantedList((prevState) => [...prevState, ...response.data]);
            setIsLoading(false);
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
        router("/sign-up", {
          state: { trigger: "user" },
        });
      }
    },
    [
      authState.authenticatedUser,
      authState.isAuthenticated,
      currentPage,
      router,
    ]
  );

  const lastListElementRef = useCallback((node: HTMLDivElement) => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setCurrentPage((prevPage) => prevPage + 1); // trigger loading of new posts by chaging page no
      }
    });

    if (node) observerRef.current.observe(node);
  }, []);

  useMemo(() => {
    if (currentPage > 1) {
      handleFetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    if (currentPage === 1) {
      handleFetchData();
    }
  }, [currentPage, handleFetchData]);

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
            ref={
              index === wantedList.length - 1 ? lastListElementRef : undefined
            }
            key={index}
            onClick={() => handleViewWantedPerson(person.uid)}
            className="grid col-span-1 lg:col-span-1 rounded-xl justify-items-stretch text-center content-start w-full h-full max-h-[550px] border-0 mb-4 bg-zinc-950 cursor-pointer"
          >
            <CardHeader className="flex flex-row justify-end items-center w-full h-auto"></CardHeader>
            <CardContent className="flex flex-col items-center justify-start min-h-[400px]">
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
