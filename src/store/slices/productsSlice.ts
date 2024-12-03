import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { CommonListArgs, CommonListRes, Product } from "../../models/entities";
import { $api } from "../../shared/api";
import { RootState } from "..";

// Начальное состояние
interface ProductsState {
  products: Product[];
  totalCount: number;
  loading: boolean;
  error?: string;
  filters: {
    title: string;
    category: string | null;
  };
}

const initialState: ProductsState = {
  products: [],
  totalCount: 0,
  loading: false,
  error: undefined,
  filters: {
    title: "",
    category: null,
  },
};

export const fetchProducts = createAsyncThunk<
  CommonListRes<Product[]>,
  CommonListArgs
>(
  "products/fetchProducts",
  async ({ _start, _limit, _onlyFavorite }, { getState }) => {
    const { products } = getState() as RootState;
    const { filters } = products;

    const search = new URLSearchParams({
      _start: _start.toString(),
      _limit: _limit.toString(),
    });

    if (filters.title) search.append("title_like", filters.title);
    if (filters.category) search.append("category", filters.category);
    if (_onlyFavorite) search.append("favorite", "true");

    const response = await $api.get(`/products?${search.toString()}`);

    return {
      data: response.data,
      totalCount: response.headers["x-total-count"] || 0,
    };
  }
);

export const toggleFavoriteProduct = createAsyncThunk<
  Product,
  { id: number; fav: boolean }
>("products/toggleFavoriteProduct ", async ({ id, fav }) => {
  const response = await $api.patch(`/products/${id}`, { favorite: !fav });

  return response.data;
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setTitleFilter(state, action: PayloadAction<string>) {
      state.filters.title = action.payload;
    },
    setCategoryFilter(state, action: PayloadAction<string | null>) {
      state.filters.category = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchProducts.fulfilled, (state, { meta, payload }) => {
        const skip = meta.arg._start || 0;

        state.loading = false;
        state.totalCount = payload.totalCount;
        state.products = !skip
          ? payload.data
          : [...state.products, ...payload.data];
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      });

    builder
      .addCase(toggleFavoriteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleFavoriteProduct.fulfilled, (state, action) => {
        state.loading = false;
        // Обновление продукта в массиве
        const index = state.products.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(toggleFavoriteProduct.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setTitleFilter, setCategoryFilter } = productsSlice.actions;
export default productsSlice.reducer;
