import { createSlice } from '@reduxjs/toolkit';

import { StatisticDto, UserDto } from '~/types';

import { ApplicationState } from './configure-store';

export type UserState = {
    currentUser: UserDto | null;
    accessToken: string | null;
    statistics: StatisticDto | null;
};

export const selectCurrentUser = (state: ApplicationState) => state.user.currentUser || null;
export const accessToken = (state: ApplicationState) => state.user.accessToken || null;
export const selectStatistics = (state: ApplicationState) => state.user.statistics || null;

const initialState: UserState = {
    currentUser: null,
    accessToken: null,
    statistics: null,
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
        setStatistics: (state, { payload }: { payload: StatisticDto | null }) => {
            state.statistics = payload;
        },
    },
});

export const { setUser, setCredentials, setStatistics } = userSlice.actions;
