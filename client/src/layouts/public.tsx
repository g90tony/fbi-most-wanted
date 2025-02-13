import PublicNavigationBar from "@/components/custom/publicNavigationBar";
import { AuthState } from "@/state/slices/authStateSlice";
import { HistoryTraverserState } from "@/state/slices/historyTraverseSlice";
import { TAuthState, THistoryTraverserState } from "@/types/state";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { Outlet, useNavigate } from "react-router";

export default function PublicLayout() {
  const authState: TAuthState = useSelector(AuthState);
  const historyTraverseState: THistoryTraverserState = useSelector(
    HistoryTraverserState
  );
  const router = useNavigate();

  useEffect(() => {
    if (authState.isAuthenticated === true) {
      router(historyTraverseState.history[historyTraverseState.currentPageURI]);
    }
  }, [
    authState,
    historyTraverseState.currentPageURI,
    historyTraverseState.history,
    router,
  ]);

  return (
    <div className="flex flex-col justify-start items center h-screen w-screen overflow-hidden">
      <PublicNavigationBar />
      <div className="flex flex-col justify-start items center h-screen w-screen overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
