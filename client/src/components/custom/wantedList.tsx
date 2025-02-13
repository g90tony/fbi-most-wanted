import handleGetWantedList from "@/api/handleGetWantedList";
import isDevEnv from "@/lib/isDevEnv";
import { AuthState } from "@/state/slices/authStateSlice";
import { TAuthState, TWantedListState } from "@/types/state";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import GlobalLoader from "./globalLoader";
import { cn } from "@/lib/utils";
import {
  LOAD_LIST_DATA,
  LOAD_NEXT_PAGE,
  LOAD_NEXT_PAGE_LIST_DATA,
  WantedListState,
} from "@/state/slices/wantedListSlice";
import WantedListItem from "./wantedListItem";
import GlobalEmptyPlaceholder from "./globalEmptyPlaceholder";
import { WantedListProps } from "@/types/props";

export default function WantedList({ type = "normal" }: WantedListProps) {
  const authState: TAuthState = useSelector(AuthState);
  const wantedListState: TWantedListState = useSelector(WantedListState);

  const router = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const observerRef = useRef<IntersectionObserver>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEmpty, setIsEmpty] = useState<boolean>(true);

  const handleViewWantedPerson = useCallback(
    function (personUID: string) {
      router(`/wanted-persons/${personUID}`, {
        state: { trigger: "user" },
      });
    },
    [router]
  );

  const handleFetchMyWantedListData = useCallback(
    async function () {
      if (authState.isAuthenticated && authState.authenticatedUser !== null) {
        setIsEmpty(false);
        if (
          wantedListState.currentPage === 1 &&
          wantedListState.myWantedList.length === 0
        )
          setIsLoading(true);

        try {
          const response = await handleGetWantedList(
            authState.authenticatedUser.token,
            wantedListState.currentPage
          );

          if (response !== undefined && response.status === "success") {
            if (wantedListState.currentPage === 1) {
              dispatch(LOAD_LIST_DATA({ listType: type, list: response.data }));
            } else {
              dispatch(
                LOAD_NEXT_PAGE_LIST_DATA({
                  listType: type,
                  list: response.data,
                })
              );
            }
            setIsLoading(false);
          }
        } catch (error) {
          if (isDevEnv) {
            console.error("FETCH_DASHBOARD_FAILURE", error);
          }
          setIsLoading(false);
          setIsEmpty(true);

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
    [authState, wantedListState, dispatch, router, type]
  );

  const handleFetchCategorizedWantedListData = useCallback(
    async function () {
      if (authState.isAuthenticated && authState.authenticatedUser !== null) {
        setIsEmpty(false);
        if (
          wantedListState.currentPage === 1 &&
          wantedListState.categorizedWantedList.length === 0
        )
          setIsLoading(true);

        try {
          const response = await handleGetWantedList(
            authState.authenticatedUser.token,
            wantedListState.currentPage
          );

          if (response !== undefined && response.status === "success") {
            if (wantedListState.currentPage === 1) {
              dispatch(LOAD_LIST_DATA({ listType: type, list: response.data }));
            } else {
              dispatch(
                LOAD_NEXT_PAGE_LIST_DATA({
                  listType: type,
                  list: response.data,
                })
              );
            }
            setIsLoading(false);
          }
        } catch (error) {
          if (isDevEnv) {
            console.error("FETCH_DASHBOARD_FAILURE", error);
          }
          setIsLoading(false);
          setIsEmpty(false);

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
    [authState, wantedListState, dispatch, router, type]
  );

  const handleFetchFilteredListData = useCallback(
    async function () {
      if (authState.isAuthenticated && authState.authenticatedUser !== null) {
        setIsEmpty(false);
        if (
          wantedListState.currentPage === 1 &&
          wantedListState.filteredWantedList.length === 0
        )
          setIsLoading(true);

        try {
          const response = await handleGetWantedList(
            authState.authenticatedUser.token,
            wantedListState.currentPage
          );

          if (response !== undefined && response.status === "success") {
            if (wantedListState.currentPage === 1) {
              dispatch(LOAD_LIST_DATA({ listType: type, list: response.data }));
            } else {
              dispatch(
                LOAD_NEXT_PAGE_LIST_DATA({
                  listType: type,
                  list: response.data,
                })
              );
            }
            setIsLoading(false);
          }
        } catch (error) {
          if (isDevEnv) {
            console.error("FETCH_DASHBOARD_FAILURE", error);
          }
          setIsLoading(false);
          setIsEmpty(false);

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
    [authState, wantedListState, dispatch, router, type]
  );

  const handleFetchWantedListData = useCallback(
    async function () {
      if (authState.isAuthenticated && authState.authenticatedUser !== null) {
        setIsEmpty(false);
        if (
          wantedListState.currentPage === 1 &&
          wantedListState.wantedList.length === 0
        )
          setIsLoading(true);

        try {
          const response = await handleGetWantedList(
            authState.authenticatedUser.token,
            wantedListState.currentPage
          );

          if (response !== undefined && response.status === "success") {
            if (wantedListState.currentPage === 1) {
              dispatch(LOAD_LIST_DATA({ listType: type, list: response.data }));
            } else {
              dispatch(
                LOAD_NEXT_PAGE_LIST_DATA({
                  listType: type,
                  list: response.data,
                })
              );
            }
            setIsLoading(false);
          }
        } catch (error) {
          if (isDevEnv) {
            console.error("FETCH_DASHBOARD_FAILURE", error);
          }
          setIsLoading(false);
          setIsEmpty(false);

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
    [authState, wantedListState, dispatch, type, router]
  );

  const lastListElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          dispatch(LOAD_NEXT_PAGE());
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [dispatch]
  );

  const handleRenderList = useCallback(() => {
    switch (type) {
      case "filtered":
        return wantedListState.filteredWantedList.length === 0 ? (
          <GlobalEmptyPlaceholder
            type="page"
            message={`
              <p style="font-weight:700">
                There was a problem loading the queried data
              </p> <br/>
              <p style="color:#fff;font-size:0.7rem;margin-top:2px">
                  Please reload the page.
              </p> 
           `}
          />
        ) : (
          <>
            {wantedListState.filteredWantedList.map((person, index: number) => (
              <WantedListItem
                lastElementRef={
                  index === wantedListState.filteredWantedList.length - 1
                    ? lastListElementRef
                    : undefined
                }
                handleViewWantedPerson={handleViewWantedPerson}
                person={person}
                key={index}
              />
            ))}
          </>
        );

      case "categorized":
        return wantedListState.categorizedWantedList.length === 0 ? (
          <GlobalEmptyPlaceholder
            type="page"
            message={`
              <p style="font-weight:700">
                There was a problem loading the wanted persons categorized under ${
                  params.category ?? "--"
                }
              </p> <br/>
              <p style="color:#fff;font-size:0.7rem;margin-top:2px">
                  Please reload the page.
              </p> 
           `}
          />
        ) : (
          <>
            {wantedListState.wantedList.map((person, index: number) => (
              <WantedListItem
                lastElementRef={
                  index === wantedListState.categorizedWantedList.length - 1
                    ? lastListElementRef
                    : undefined
                }
                handleViewWantedPerson={handleViewWantedPerson}
                person={person}
                key={index}
              />
            ))}
          </>
        );

      case "personal":
        return wantedListState.myWantedList.length === 0 ? (
          <GlobalEmptyPlaceholder
            type="page"
            message={`
              <p style="font-weight:700">
                There was a problem loading the your watch list data.
              </p> <br/>
              <p style="color:#fff;font-size:0.7rem;margin-top:2px">
                  Please reload the page.
              </p> 
           `}
          />
        ) : (
          <>
            {wantedListState.myWantedList.map((person, index: number) => (
              <WantedListItem
                lastElementRef={
                  index === wantedListState.filteredWantedList.length - 1
                    ? lastListElementRef
                    : undefined
                }
                handleViewWantedPerson={handleViewWantedPerson}
                person={person}
                key={index}
              />
            ))}
          </>
        );

      case "normal":
        return wantedListState.wantedList.length === 0 ? (
          <GlobalEmptyPlaceholder
            type="page"
            message={`
              <p style="font-weight:700">
                There was a problem loading the wanted persons data.
              </p> <br/>
              <p style="color:#fff;font-size:0.7rem;margin-top:2px">
                  Please reload the page.
              </p> 
           `}
          />
        ) : (
          wantedListState.wantedList.map((person, index: number) => (
            <WantedListItem
              lastElementRef={
                index === wantedListState.wantedList.length - 1
                  ? lastListElementRef
                  : undefined
              }
              handleViewWantedPerson={handleViewWantedPerson}
              person={person}
              key={index}
            />
          ))
        );

      default:
        return (
          <GlobalEmptyPlaceholder
            type="page"
            message={`
              <p style="font-weight:700">
                There was a problem loading the page.
              </p> <br/>
              <p style="color:#fff;font-size:0.7rem;margin-top:2px">
                  Please reload the page or try again later.
              </p> 
           `}
          />
        );
    }
  }, [
    handleViewWantedPerson,
    lastListElementRef,
    params.category,
    type,
    wantedListState.categorizedWantedList.length,
    wantedListState.filteredWantedList,
    wantedListState.myWantedList,
    wantedListState.wantedList,
  ]);

  useMemo(() => {
    if (wantedListState.currentPage > 1) {
      switch (wantedListState.listType) {
        case "filtered":
          handleFetchFilteredListData();

          break;
        case "categorized":
          handleFetchCategorizedWantedListData();

          break;
        case "personal":
          handleFetchMyWantedListData();

          break;
        case "normal":
          handleFetchWantedListData();
          break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wantedListState.currentPage]);

  useEffect(() => {
    if (wantedListState.currentPage === 1) {
      switch (type) {
        case "filtered":
          handleFetchFilteredListData();

          break;
        case "categorized":
          handleFetchCategorizedWantedListData();
          break;
        case "personal":
          handleFetchMyWantedListData();

          break;
        case "normal":
          handleFetchWantedListData();
          break;
        default:
          setIsLoading(false);
          break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={cn(
        isLoading || isEmpty
          ? "flex flex-row justify-center items-start w-full h-full min-h-[100px] bg-zinc-950 rounded-lg"
          : "grid grid-cols-1 lg:grid-cols-3 gap-4 w-full h-full rounded-lg"
      )}
    >
      {isLoading ? (
        <GlobalLoader message="Loading Page Data" type="card" />
      ) : (
        handleRenderList()
      )}
    </div>
  );
}
