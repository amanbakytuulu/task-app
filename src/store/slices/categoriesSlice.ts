import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Category } from "../../models/entities";
import { $api } from "../../shared/api";

// Начальное состояние
interface CategoriesState {
  categories: Category[];
  loading: boolean;
  error?: string;
}

const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: undefined,
};

export const fetchCategories = createAsyncThunk<Category[]>(
  "categories/fetchCategories",
  async () => {
    const response = await $api.get(`/categories`, {});

    return response.data;
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchCategories.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.categories = payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

export default categoriesSlice.reducer;
