import { createSlice } from '@reduxjs/toolkit';

import { UserDto } from '~/types';

import { ApplicationState } from './configure-store';

export type UserState = {
    currentUser: UserDto | null;
    accessToken: string | null;
};

export const selectCurrentUser = (state: ApplicationState) => state.user.currentUser || null;
export const accessToken = (state: ApplicationState) => state.user.accessToken || null;

const initialState: UserState = {
    currentUser: null,
    accessToken: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, { payload }) => {
            state.currentUser = payload;
        },
        setCredentials: (state, { payload }: { payload: string | null }) => {
            state.accessToken = payload;
        },
    },
});

export const { setUser, setCredentials } = userSlice.actions;
