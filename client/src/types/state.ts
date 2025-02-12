export type TAuthAuthenticatedUser = {
  id: number;
  name: string;
  email: string;
  token: string;
  tokenExpiryTime: number;
};
export type TAuthState = {
  isAuthenticated: boolean;
  authenticatedUser: TAuthAuthenticatedUser | null;
};
