import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { useCheckAuthQuery } from '~/query/user-api';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { setAuthenticated } from '~/store/user-slice';

import { GlobalLoader } from './GlobalLoader';

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
    const { data, isError, isFetching } = useCheckAuthQuery();

    useEffect(() => {
        if (data) {
            dispatch(setAuthenticated(true));
        }
        if (isError) {
            dispatch(setAuthenticated(false));
            if (location.pathname === '/') navigate('/login');
        }
    }, [data, isError, dispatch, navigate]);

    if (isFetching || (!isAuthenticated && location.pathname === '/')) return <GlobalLoader />;

    return <>{children}</>;
};
