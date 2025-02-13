import { AuthenticatedNavigationSidebar } from "@/components/custom/authenticatedNavigationSidebar";
import { AuthenticatedNavigationSidebarUserPopup } from "@/components/custom/authenticatedNavigationSidebarUserPopup";
import GlobalLoader from "@/components/custom/globalLoader";
import { Button } from "@/components/ui/button";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import useSessionTimeout from "@/hooks/useSessionTimeout";
import { AuthState } from "@/state/slices/authStateSlice";
import { TAuthState } from "@/types/state";
import { Separator } from "@radix-ui/react-separator";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Suspense, useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Outlet, useLocation, useNavigate } from "react-router";
import { THistoryTraverserState } from "../types/state";
import {
  ADD_TO_HISTORY,
  CLEAR_HISTORY,
  GO_BACK_ON_HISTORY,
  GO_FORTH_INTO_HISTORY,
  HistoryTraverserState,
} from "@/state/slices/historyTraverseSlice";

const user = {
  avatar: "",
  email: "calebmbugua@gmail.com",
  name: "Caleb Mbugua",
};

export default function AuthLayout() {
  const authState: TAuthState = useSelector(AuthState);
  const historyTraverseState: THistoryTraverserState = useSelector(
    HistoryTraverserState
  );

  const dispatch = useDispatch();
  const router = useNavigate();
  const location = useLocation();

  useSessionTimeout();

  const handleGoBack = useCallback(() => {
    if (historyTraverseState.currentPageURI > 0) {
      router(
        historyTraverseState.history[historyTraverseState.currentPageURI - 1],
        {
          state: { trigger: "goBack" },
        }
      );
    }
    dispatch(GO_BACK_ON_HISTORY());
  }, [dispatch, historyTraverseState, router]);

  const handleGoForth = useCallback(() => {
    if (
      historyTraverseState.currentPageURI <
      historyTraverseState.history.length - 1
    ) {
      router(
        historyTraverseState.history[historyTraverseState.currentPageURI + 1],
        {
          state: { trigger: "goForth" },
        }
      );
    }
    dispatch(GO_FORTH_INTO_HISTORY());
  }, [dispatch, historyTraverseState, router]);

  const handlePageHistoryNavigation = useCallback(() => {
    const historyState = [...historyTraverseState.history];
    const currentHistoryIndex = historyTraverseState.currentPageURI;

    const currentHistoryItem = historyState[currentHistoryIndex];

    if (
      location !== undefined &&
      location.pathname !== currentHistoryItem &&
      location.state !== null &&
      location.state.trigger === "user"
    ) {
      dispatch(ADD_TO_HISTORY(location.pathname));
    }
  }, [dispatch, historyTraverseState, location]);

  useMemo(() => {
    handlePageHistoryNavigation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    if (authState.isAuthenticated === false) {
      dispatch(CLEAR_HISTORY());
      router("/sign-in", {
        state: { trigger: "user" },
      });
    }
  }, [authState, dispatch, router]);

  return (
    <div className="flex flex-col !bg-black p-0 m-0 w-screen h-screen overflow-hidden absolute">
      <SidebarProvider className="!bg-black">
        <AuthenticatedNavigationSidebar />
        <SidebarInset>
          <header className="flex flex-row justify-end w-full h-16 shrink-0 items-center gap-0 !bg-black">
            <div className="flex items-center gap-0 px-4 w-auto">
              <SidebarTrigger className="-ml-1 flex flex-row items-center justify-center w-10 h-10 bg-zinc-900 hover:bg-zinc-950 text-zinc-700 hover:text-zinc-800 rounded-full mx-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />

              <Button
                className="flex flex-row items-center justify-center w-8 h-8 bg-zinc-900 hover:bg-zinc-950 text-zinc-700 hover:text-zinc-800 rounded-full mx-1"
                onClick={handleGoBack}
                disabled={
                  historyTraverseState.currentPageURI > 0 ? false : true
                }
              >
                <ChevronLeft />
              </Button>
              <Button
                className="flex flex-row items-center justify-center w-8 h-8 bg-zinc-900 hover:bg-zinc-950 text-zinc-700 hover:text-zinc-800 rounded-full mx-1"
                onClick={handleGoForth}
                disabled={
                  historyTraverseState.currentPageURI <
                  historyTraverseState.history.length - 1
                    ? false
                    : true
                }
              >
                <ChevronRight />
              </Button>
            </div>
            <>
              <Button className="bg-zinc-900 hover:bg-zinc-950 text-zinc-700 hover:text-zinc-800 w-[200px] h-8 rounded-xl p-4">
                <Search /> Search....
              </Button>

              <AuthenticatedNavigationSidebarUserPopup user={user} />
            </>
          </header>
          <div className="flex flex-col gap-4 p-4 pt-0 m-0 !bg-black overflow-hidden h-full">
            <Suspense
              fallback={<GlobalLoader message="Loading page" type="page" />}
            >
              <Outlet />
            </Suspense>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
