import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { categoryApi } from '~/query/category-api';
import { apiSlice } from '~/query/create-api';
import { recipeApi } from '~/query/recipe-api';

import appReducer, { appSlice } from './app-slice';
import { categorySlice } from './category-slice';
import { recipesSlice } from './recipe-slice';

const isProduction = false;
const rootReducer = combineReducers({
    [appSlice.name]: appReducer,
    [recipesSlice.name]: recipesSlice.reducer,
    [categorySlice.name]: categorySlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [recipeApi.reducerPath]: recipeApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            recipeApi.middleware,
            categoryApi.middleware,
            apiSlice.middleware,
        ),

    devTools: !isProduction,
});
