import { createSlice } from '@reduxjs/toolkit';

import { NewUser } from '~/types';

export type UserState = {
    user: NewUser | null;
    accessToken: string | null;
};

const initialState: UserState = {
    user: null,
    accessToken: null,
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

export default userSlice.reducer;
