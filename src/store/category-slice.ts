import { createSlice } from '@reduxjs/toolkit';

import { TCategory } from '~/types';

export interface CategoryState {
    categories: TCategory[];
    currentCategory: string | null;
}

const initialState: CategoryState = {
    categories: [],
    currentCategory: null,
};

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
        setCurrentCategory: (state, action) => {
            state.currentCategory = action.payload;
        },
    },
});

export const { setCategories, setCurrentCategory } = categorySlice.actions;

export default categorySlice.reducer;
