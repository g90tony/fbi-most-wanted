import { TWantedPersonMeta } from "./types";

export type TUserSignInResponse = {
  id: number;
  name: string;
  email: string;
  sessionToken: string;
  tokenExpiryTime: number;
};

export type TWantedListFilteredResponse = {
  filterType: "category" | "nationality" | "race";
  filterQuery: string;
  filteredListData: TWantedListResponse;
};

export type TWantedListSearchQueryResponse = {
  searchQuery: string;
  searchedListData: TWantedListResponse;
};

export type TWantedListResponse = TWantedPersonMeta[];
