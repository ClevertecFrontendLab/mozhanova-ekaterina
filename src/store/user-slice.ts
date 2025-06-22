import { createSlice } from '@reduxjs/toolkit';

import { ProfileDto, StatisticDto, UserDto } from '~/types';

import { ApplicationState } from './configure-store';

export type UserState = {
    currentUser: ProfileDto | null;
    accessToken: string | null;
    statistics: StatisticDto | null;
    allUsers: UserDto[];
};

export const selectCurrentUser = (state: ApplicationState) => state.user.currentUser || null;
export const accessToken = (state: ApplicationState) => state.user.accessToken || null;
export const selectStatistics = (state: ApplicationState) => state.user.statistics || null;
export const selectAllUsers = (state: ApplicationState) => state.user.allUsers || [];

const initialState: UserState = {
    currentUser: null,
    accessToken: null,
    statistics: null,
    allUsers: [],
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
        setAllUsers: (state, { payload }: { payload: UserDto[] }) => {
            state.allUsers = payload;
        },
    },
});

export const { setUser, setCredentials, setStatistics, setAllUsers } = userSlice.actions;
