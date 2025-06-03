import { createSlice } from '@reduxjs/toolkit';

import { BloggerInfo } from '~/types';

export type UserState = {
    user: BloggerInfo | null;
    accessToken: string | null;
};

const initialState: UserState = {
    user: null,
    accessToken: localStorage.getItem('accessToken') || null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, { payload }) => {
            state.user = payload;
        },
        setCredentials: (state, { payload }: { payload: string | null }) => {
            state.accessToken = payload;
        },
    },
});

export const { setUser, setCredentials } = userSlice.actions;
