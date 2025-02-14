import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TWantedListRenderTypes, TWantedListState } from "@/types/state";
import {
  TWantedListFilteredResponse,
  TWantedListResponse,
  TWantedListSearchQueryResponse,
} from "@/types/apiResponse";
import { RootState } from "../store";

const initialState: TWantedListState = {
  currentPage: 1,
  wantedList: [],
  filteredWantedList: [],
  categorizedWantedList: [],
  myWantedList: [],
  filters: null,
  searchQuery: "",
};

export const wantedListSlice = createSlice({
  name: "wantedListState",
  initialState,
  reducers: {
    LOAD_LIST_DATA: (
      state: TWantedListState,
      action: PayloadAction<{
        listType: TWantedListRenderTypes;
        list: TWantedListResponse;
      }>
    ) => {
      switch (action.payload.listType) {
        case "categorized":
          state.categorizedWantedList = [...action.payload.list];

          break;
        case "normal":
          state.wantedList = [...action.payload.list];

          break;
        case "personal":
          state.myWantedList = [...action.payload.list];

          break;
        case "filtered":
          state.filteredWantedList = [...action.payload.list];

          break;
      }
    },
    LOAD_NEXT_PAGE: (state: TWantedListState) => {
      state.currentPage = state.currentPage + 1;
    },
    LOAD_NEXT_PAGE_LIST_DATA: (
      state: TWantedListState,
      action: PayloadAction<{
        listType: TWantedListRenderTypes;
        list: TWantedListResponse;
      }>
    ) => {
      switch (action.payload.listType) {
        case "categorized":
          state.categorizedWantedList = [
            ...state.wantedList,
            ...action.payload.list,
          ];

          break;
        case "normal":
          state.wantedList = [...state.wantedList, ...action.payload.list];

          break;
        case "personal":
          state.myWantedList = [...state.myWantedList, ...action.payload.list];

          break;
        case "filtered":
          state.myWantedList = [...state.myWantedList, ...action.payload.list];

          break;
      }
    },
    LOAD_FILTERED_DATA: (
      state: TWantedListState,
      action: PayloadAction<TWantedListFilteredResponse>
    ) => {
      switch (action.payload.filterType) {
        case "category":
          state.filters = {
            category: action.payload.filterQuery,
            nationality: "",
            race: "",
          };

          state.filteredWantedList = action.payload.filteredListData;

          break;
        case "nationality":
          state.filters = {
            category: "",
            nationality: action.payload.filterQuery,
            race: "",
          };

          state.filteredWantedList = action.payload.filteredListData;

          break;
        case "race":
          state.filters = {
            category: "",
            nationality: "",
            race: action.payload.filterQuery,
          };

          state.filteredWantedList = action.payload.filteredListData;

          break;
      }
    },
    LOAD_SEARCH_QUERY_DATA: (
      state: TWantedListState,
      action: PayloadAction<TWantedListSearchQueryResponse>
    ) => {
      state.searchQuery = action.payload.searchQuery;
      state.filteredWantedList = action.payload.searchedListData;
    },
    CLEAR_WANTED_LIST_DATA: (state: TWantedListState) => {
      state.wantedList = [];
      state.myWantedList = [];
      state.categorizedWantedList = [];
      state.currentPage = 1;
    },
    CLEAR_FILTER_QUERY_DATA: (state: TWantedListState) => {
      state.filters = null;

      state.filteredWantedList = [];
      state.currentPage = 1;
    },
    CLEAR_SEARCH_QUERY_DATA: (state: TWantedListState) => {
      state.searchQuery = "";
      state.filteredWantedList = [];
      state.currentPage = 1;
    },
  },
});

export const {
  LOAD_LIST_DATA,
  LOAD_NEXT_PAGE,
  LOAD_NEXT_PAGE_LIST_DATA,
  LOAD_FILTERED_DATA,
  LOAD_SEARCH_QUERY_DATA,
  CLEAR_WANTED_LIST_DATA,
  CLEAR_FILTER_QUERY_DATA,
  CLEAR_SEARCH_QUERY_DATA,
} = wantedListSlice.actions;
export const WantedListState = (state: RootState) => state.wantedListState;
export default wantedListSlice.reducer;
