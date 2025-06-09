import { createSlice } from '@reduxjs/toolkit';

import { Category } from '~/types';

import { ApplicationState } from './configure-store';

export type CategoryState = {
    categories: Category[];
    currentCategory: string | null;
};

export const selectAllCategories = (state: ApplicationState) => state.category.categories || [];

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
