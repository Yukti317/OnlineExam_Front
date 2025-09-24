import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quelen: 0,
  anslen: 0,
};

const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    setExamResult: (state, action) => {
      state.quelen = action.payload.quelen;
      state.anslen = action.payload.anslen;
    },
    resetExamResult: (state) => {
      state.quelen = 0;
      state.anslen = 0;
    },
  },
});

export const { setExamResult, resetExamResult } = examSlice.actions;
export default examSlice.reducer;