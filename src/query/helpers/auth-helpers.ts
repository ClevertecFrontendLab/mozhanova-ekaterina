import { Dispatch } from '@reduxjs/toolkit';

import { setCredentials } from '~/store/user-slice';
import { QueryFulfilled } from '~/types';

export const handleAuthHeaders = async (queryFulfilled: QueryFulfilled, dispatch: Dispatch) => {
    try {
        const { meta } = await queryFulfilled;
        const accessToken = meta?.response?.headers?.get('Authentication-Access');
        dispatch(accessToken ? setCredentials(accessToken) : setCredentials(null));
    } catch {
        dispatch(setCredentials(null));
    }
};
