import { createSlice } from '@reduxjs/toolkit';

import { TNewUser } from '~/types';

export type UserState = {
    user: TNewUser | null;
    isAuthenticated: boolean;
};

const initialState: UserState = {
    user: null,
    isAuthenticated: false,
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
    },
});

export const { setUser, setAuthenticated } = userSlice.actions;

export default userSlice.reducer;
