import { AuthState, DEAUTHENTICATE_USER } from "@/state/slices/authStateSlice";
import { TAuthState } from "@/types/state";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export default function useSessionTimeout() {
  const authState: TAuthState = useSelector(AuthState);
  const dispatch = useDispatch();
  const [timeLeft, setTimeLeft] = useState<number>(6000000);

  setInterval(() => {
    if (authState.isAuthenticated !== false) {
      const exactlyNow: number = new Date().getTime();
      setTimeLeft(authState.authenticatedUser!.tokenExpiryTime - exactlyNow);
      console.log("i'm still running...");
    } else {
      dispatch(DEAUTHENTICATE_USER());
    }
  }, 300000);

  useEffect(() => {
    if (authState.isAuthenticated === false) {
      dispatch(DEAUTHENTICATE_USER());
    } else if (timeLeft <= 1000) {
      toast.error(
        "Your session has expired. Please re-login to renew you session."
      );
      dispatch(DEAUTHENTICATE_USER());
    } else if (timeLeft < 300000) {
      toast.error(
        "Your session will expire in less than 5 minutes. Please re-login to renew you session."
      );
    }
  }, [
    authState.authenticatedUser,
    authState.isAuthenticated,
    dispatch,
    timeLeft,
  ]);

  return timeLeft;
}
