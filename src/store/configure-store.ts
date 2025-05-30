import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { categoryApi } from '~/query/category-api';
import { fileUploadApi } from '~/query/file-upload-api';
import { recipeApi } from '~/query/recipe-api';
import { userApi } from '~/query/user-api';

import appReducer, { appSlice } from './app-slice';
import { categorySlice } from './category-slice';
import { recipesSlice } from './recipe-slice';
import { userSlice } from './user-slice';

const isProduction = false;
const rootReducer = combineReducers({
    [appSlice.name]: appReducer,
    [recipesSlice.name]: recipesSlice.reducer,
    [categorySlice.name]: categorySlice.reducer,
    [recipeApi.reducerPath]: recipeApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [userSlice.name]: userSlice.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [fileUploadApi.reducerPath]: fileUploadApi.reducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            recipeApi.middleware,
            categoryApi.middleware,
            userApi.middleware,
            fileUploadApi.middleware,
        ),

    devTools: !isProduction,
});
