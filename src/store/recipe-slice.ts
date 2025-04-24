import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { data } from '~/mocks/recipes';
import { TRecipe } from '~/types';

export interface RecipesState {
    data: TRecipe[];
    filters: {
        category: string[];
        subcategory: string[];
        ingredients: string[];
        allergens: string[];
        meat: string[];
        garnish: string[];
        authors: string[];
        searchQuery: string;
    };
}

const initialState: RecipesState = {
    data: data,
    filters: {
        category: [],
        subcategory: [],
        ingredients: [],
        allergens: [],
        meat: [],
        garnish: [],
        authors: [],
        searchQuery: '',
    },
};

export const recipesSlice = createSlice({
    name: 'recipe',
    initialState,
    reducers: {
        setCategoryFilter: (state, action: PayloadAction<string[]>) => {
            state.filters.category = action.payload;
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.filters.searchQuery = action.payload;
        },
        setSubCategoryFilter: (state, action: PayloadAction<string[]>) => {
            state.filters.subcategory = action.payload;
        },
        setIngredientsFilter: (state, action: PayloadAction<string[]>) => {
            state.filters.ingredients = action.payload;
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
    },
});

export const {
    setCategoryFilter,
    setSubCategoryFilter,
    setIngredientsFilter,
    setSearchQuery,
    setAllergensFilter,
    setMeatFilter,
    setGarnishFilter,
    setAuthorsFilter,
    cleanFilters,
} = recipesSlice.actions;
export default recipesSlice.reducer;
