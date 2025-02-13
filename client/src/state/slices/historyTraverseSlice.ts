import { THistoryTraverserState } from "@/types/state";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: THistoryTraverserState = {
  currentPageURI: 0,
  history: ["/"],
  canGoBack: false,
  canGoForth: false,
};

export const historyTraverseSlice = createSlice({
  name: "historyTraverseSlice",
  initialState,
  reducers: {
    ADD_TO_HISTORY: (
      state: THistoryTraverserState,
      action: PayloadAction<string>
    ) => {
      if (action.payload !== state.history[state.currentPageURI]) {
        state.currentPageURI = [...state.history, action.payload].length - 1;
        state.history = [...state.history, action.payload];

        if (state.currentPageURI < 1) {
          state.canGoBack = false;
        } else {
          state.canGoBack = true;
        }
      }
    },
    GO_BACK_ON_HISTORY: (state: THistoryTraverserState) => {
      if (state.currentPageURI !== 0) {
        const currentIndex = state.currentPageURI - 1;
        state.currentPageURI = currentIndex;
        state.canGoForth = true;
      } else {
        state.canGoBack = false;
      }

      if (state.currentPageURI < 1) {
        state.canGoBack = false;
      } else {
        state.canGoBack = true;
      }
    },
    GO_FORTH_INTO_HISTORY: (state: THistoryTraverserState) => {
      if (state.currentPageURI !== state.history.length - 1) {
        const currentIndex = state.currentPageURI - 1;
        state.currentPageURI = currentIndex;
        state.canGoBack = true;
      }

      if (state.currentPageURI > state.history.length - 1) {
        state.canGoForth = false;
      } else {
        state.canGoForth = true;
      }
    },
    CLEAR_HISTORY: (state: THistoryTraverserState) => {
      state.history = ["/"];
      state.currentPageURI = 0;
      state.canGoBack = false;
      state.canGoForth = false;
    },
  },
});

export const {
  ADD_TO_HISTORY,
  GO_BACK_ON_HISTORY,
  GO_FORTH_INTO_HISTORY,
  CLEAR_HISTORY,
} = historyTraverseSlice.actions;
export const HistoryTraverserState = (state: RootState) =>
  state.historyTraverseSlice;
export default historyTraverseSlice.reducer;
