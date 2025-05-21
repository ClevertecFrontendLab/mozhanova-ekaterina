import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Recipe } from '~/types';

export type RecipesState = {
    current: Recipe | null;
    filters: {
        categoryName: string[];
        subcategoryIds: string[];
        allergens: string[];
        meat: string[];
        garnish: string[];
        authors: string[];
        searchString: string;
    };
    pagination: {
        currentPage: number;
        limit: number;
        totalPages?: number;
    };
};

const initialState: RecipesState = {
    current: null,
    filters: {
        categoryName: [],
        subcategoryIds: [],
        allergens: [],
        meat: [],
        garnish: [],
        authors: [],
        searchString: '',
    },
    pagination: {
        currentPage: 1,
        limit: 8,
    },
};

export const recipesSlice = createSlice({
    name: 'recipe',
    initialState,
    reducers: {
        setSearchString: (state, action: PayloadAction<string>) => {
            state.filters.searchString = action.payload;
        },
        setSubCategoryFilter: (state, action: PayloadAction<string[]>) => {
            state.filters.subcategoryIds = action.payload;
        },
        setCategoryFilter: (state, action: PayloadAction<string[]>) => {
            state.filters.categoryName = action.payload;
        },
        setAllergensFilter: (state, action: PayloadAction<string[]>) => {
            state.filters.allergens = action.payload;
        },
        setMeatFilter: (state, action: PayloadAction<string[]>) => {
            state.filters.meat = action.payload;
        },
        setGarnishFilter: (state, action: PayloadAction<string[]>) => {
            state.filters.garnish = action.payload;
        },
        setAuthorsFilter: (state, action: PayloadAction<string[]>) => {
            state.filters.authors = action.payload;
        },
        cleanFilters: (state) => {
            state.filters = initialState.filters;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.pagination.currentPage = action.payload;
        },
        setPaginationMeta: (state, action: PayloadAction<{ totalPages: number }>) => {
            state.pagination.totalPages = action.payload.totalPages;
        },
        setCurrent: (state, action: PayloadAction<Recipe>) => {
            state.current = action.payload;
        },
    },
});

export const {
    setCategoryFilter,
    setSubCategoryFilter,
    setSearchString,
    setAllergensFilter,
    setMeatFilter,
    setGarnishFilter,
    setAuthorsFilter,
    cleanFilters,
    setCurrentPage,
    setPaginationMeta,
    setCurrent,
} = recipesSlice.actions;
export default recipesSlice.reducer;
