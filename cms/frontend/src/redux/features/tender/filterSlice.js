import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredTenders: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_TENDERS(state, action) {
      const { tenders, search } = action.payload;
      const tempTenders = tenders && tenders.filter(
        (tender) =>
          tender.name.toLowerCase().includes(search.toLowerCase()) ||
          tender.category.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredTenders = tempTenders;
    },
  },
});

export const { FILTER_TENDERS } = filterSlice.actions;

export const selectFilteredTenders = (state) => state.filter.filteredTenders;

export default filterSlice.reducer;
