import { TWantedPersonMeta } from "./types";

export type TUserSignInResponse = {
  id: number;
  name: string;
  email: string;
  sessionToken: string;
};

export type TDashboardListResponse = TWantedPersonMeta[];
