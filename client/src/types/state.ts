import { TWantedListResponse } from "./apiResponse";

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

export type THistoryTraverserState = {
  currentPageURI: number;
  history: string[];
  canGoBack: boolean;
  canGoForth: boolean;
};

export type TWantedListRenderTypes =
  | "normal"
  | "filtered"
  | "categorized"
  | "personal";

export type TWantedListState = {
  currentPage: number;
  listType: TWantedListRenderTypes;
  wantedList: TWantedListResponse;
  categorizedWantedList: TWantedListResponse;
  filteredWantedList: TWantedListResponse;
  myWantedList: TWantedListResponse;
  filters: {
    category: string;
    nationality: string;
    race: string;
  } | null;
  searchQuery: string | null;
};
