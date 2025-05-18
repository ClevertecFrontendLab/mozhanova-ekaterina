import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { AppRoutes } from '~/config';
import { useToast } from '~/hooks/use-toast';
import { useLazyCheckAuthQuery, useLazyRefreshTokenQuery } from '~/query/user-api';
import { useAppSelector } from '~/store/hooks';

import { GlobalLoader } from './GlobalLoader';

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const accessToken = useAppSelector((state) => state.user.accessToken);
    const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const { showError } = useToast();
    const [checkAuth] = useLazyCheckAuthQuery();
    const [refresh] = useLazyRefreshTokenQuery();

    useEffect(() => {
        const checkAuthHandler = async () => {
            if (!accessToken && !isAuthenticated) {
                try {
                    const { data, error } = await checkAuth();
                    if (data) {
                        const refreshResult = await refresh();
                        if (refreshResult.data) {
                            setIsLoading(false);
                        } else if (refreshResult.error) {
                            showError('Авторизация не прошла', '', 15000, 'bottom-left');
                            throw new Error('Token refresh failed');
                        }
                    } else if (error) {
                        throw new Error('Auth check failed');
                    }
                } catch (_error) {
                    navigate(AppRoutes.SIGN_IN);
                }
            } else {
                setIsLoading(false);
            }
        };
        if (location.pathname === AppRoutes.HOME) checkAuthHandler();
        else setIsLoading(false);
    }, []);

    if (isLoading) return <GlobalLoader />;

    return <>{children}</>;
};
