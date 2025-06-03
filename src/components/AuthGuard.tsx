import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { AppRoutes } from '~/constants/routes-config';
import { useLazyRefreshTokenQuery } from '~/query/user-api';
import { useAppSelector } from '~/store/hooks';
import { accessToken } from '~/store/selectors';

import { GlobalLoader } from './GlobalLoader';

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const token = useAppSelector(accessToken);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const [refreshToken] = useLazyRefreshTokenQuery();

    useEffect(() => {
        const checkAuth = async () => {
            if (token) {
                setIsLoading(false);
                return;
            }
            try {
                await refreshToken()
                    .unwrap()
                    .then(() => setIsLoading(false));
            } catch {
                console.log('Auth check failed');
                if (location.pathname !== AppRoutes.HOME) setIsLoading(false);
                else {
                    navigate(AppRoutes.SIGN_IN);
                }
            }
        };
        checkAuth();
    }, []);

    if (isLoading) return <GlobalLoader />;

    return <>{children}</>;
};
