import { createSlice } from '@reduxjs/toolkit';

import { BloggerInfo } from '~/types';

export type UserState = {
    currentBlogger: BloggerInfo | null;
    currentUser: BloggerInfo | null;
    accessToken: string | null;
};

const initialState: UserState = {
    currentBlogger: null,
    currentUser: null,
    accessToken: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setBlogger: (state, { payload }) => {
            state.currentBlogger = payload;
        },
        setUser: (state, { payload }) => {
            state.currentUser = payload;
        },
        setCredentials: (state, { payload }: { payload: string | null }) => {
            state.accessToken = payload;
        },
    },
});

export const { setBlogger, setUser, setCredentials } = userSlice.actions;
