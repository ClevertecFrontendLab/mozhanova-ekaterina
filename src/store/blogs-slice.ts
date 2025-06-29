import { createSlice } from '@reduxjs/toolkit';

import { BloggerInfo } from '~/types';

import { ApplicationState } from './configure-store';

export type BlogsState = {
    currentBlogger: BloggerInfo | null;
};

export const selectCurrentBlogger = (state: ApplicationState) => state.blogs.currentBlogger || null;

const initialState: BlogsState = {
    currentBlogger: null,
};

export const blogsSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        setBlogger: (state, { payload }) => {
            state.currentBlogger = payload;
        },
    },
});

export const { setBlogger } = blogsSlice.actions;
