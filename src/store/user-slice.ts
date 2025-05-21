import { createSlice } from '@reduxjs/toolkit';

import { NewUser } from '~/types';

export type UserState = {
    user: NewUser | null;
    isAuthenticated: boolean;
    accessToken: string | null;
};

const initialState: UserState = {
    user: null,
    isAuthenticated: false,
    accessToken: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, { payload }) => {
            state.user = payload;
        },
        setAuthenticated: (state, { payload }: { payload: boolean }) => {
            state.isAuthenticated = payload;
        },
        setCredentials: (state, { payload }: { payload: string | null }) => {
            state.accessToken = payload;
        },
    },
});

export const { setUser, setAuthenticated, setCredentials } = userSlice.actions;

export default userSlice.reducer;
