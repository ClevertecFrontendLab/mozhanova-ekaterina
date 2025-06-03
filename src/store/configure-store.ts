import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { authorizedApi } from '~/query/authorized-api';
import { unauthorizedApi } from '~/query/unauthorized-api';

import { appSlice } from './app-slice';
import { categorySlice } from './category-slice';
import { recipesSlice } from './recipe-slice';
import { userSlice } from './user-slice';

const isProduction = false;
const rootReducer = combineReducers({
    [appSlice.name]: appSlice.reducer,
    [recipesSlice.name]: recipesSlice.reducer,
    [categorySlice.name]: categorySlice.reducer,
    [userSlice.name]: userSlice.reducer,

    [authorizedApi.reducerPath]: authorizedApi.reducer,
    [unauthorizedApi.reducerPath]: unauthorizedApi.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authorizedApi.middleware, unauthorizedApi.middleware),

    devTools: !isProduction,
});

export type ApplicationState = ReturnType<typeof rootReducer>;
