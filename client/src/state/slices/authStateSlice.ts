import { TAuthAuthenticatedUser, TAuthState } from "@/types/state";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: TAuthState = {
  isAuthenticated: false,
  authenticatedUser: null,
};

export const authStateSlice = createSlice({
  name: "authStateSlice",
  initialState,
  reducers: {
    AUTHENTICATE_USER: (
      state: TAuthState,
      action: PayloadAction<TAuthAuthenticatedUser>
    ) => {
      state.isAuthenticated = true;
      state.authenticatedUser!.id = action.payload.id;
      state.authenticatedUser!.email = action.payload.email;
      state.authenticatedUser!.name = action.payload.name;
      state.authenticatedUser!.token = action.payload.token;
    },
    DEAUTHENTICATE_USER: (state: TAuthState) => {
      state.isAuthenticated = false;
      state.authenticatedUser = null;
    },
  },
});

export const { AUTHENTICATE_USER, DEAUTHENTICATE_USER } =
  authStateSlice.actions;
export const AuthState = (state: RootState) => state.authStateSlice;
export default authStateSlice.reducer;
