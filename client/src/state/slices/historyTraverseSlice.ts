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
        const newHistory = [...state.history];
        let currentIndex = state.currentPageURI;

        if (currentIndex === newHistory.length - 1) {
          newHistory.push(action.payload);
          currentIndex = newHistory.length - 1;
        } else {
          newHistory.splice(currentIndex + 1, state.history.length - 1);
          newHistory.push(action.payload);
          currentIndex = newHistory.length - 1;
        }

        state.history = [...newHistory];
        state.currentPageURI = currentIndex;
      }
    },
    GO_BACK_ON_HISTORY: (state: THistoryTraverserState) => {
      let currentIndex = state.currentPageURI;
      if (state.currentPageURI > 0) {
        currentIndex = currentIndex - 1;
        state.currentPageURI = currentIndex;
      }
    },
    GO_FORTH_INTO_HISTORY: (state: THistoryTraverserState) => {
      let currentIndex = state.currentPageURI;
      if (state.currentPageURI < state.history.length - 1) {
        currentIndex = currentIndex + 1;
        state.currentPageURI = currentIndex;
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
