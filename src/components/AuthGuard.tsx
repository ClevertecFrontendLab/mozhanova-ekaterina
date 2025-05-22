import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { NOTIFICATION_MESSAGES } from '~/constants/notification-config';
import { AppRoutes } from '~/constants/routes-config';
import { useToast } from '~/hooks/use-toast';
import { useLazyCheckAuthQuery, useLazyRefreshTokenQuery } from '~/query/user-api';
import { useAppSelector } from '~/store/hooks';

import { GlobalLoader } from './GlobalLoader';

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const accessToken = useAppSelector((state) => state.user.accessToken);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const { showError } = useToast();
    const [checkAuth] = useLazyCheckAuthQuery();
    const [refreshToken] = useLazyRefreshTokenQuery();

    useEffect(() => {
        const checkAuthHandler = async () => {
            if (!accessToken) {
                try {
                    const authResult = await checkAuth();
                    if (authResult.data) {
                        const refreshResult = await refreshToken();
                        if (refreshResult.data) {
                            setIsLoading(false);
                        } else if (refreshResult.error) {
                            showError(NOTIFICATION_MESSAGES.AUTH_ERROR);
                            throw new Error('Token refresh failed');
                        }
                    } else {
                        if (location.pathname !== AppRoutes.HOME) setIsLoading(false);
                        else throw new Error('Auth check failed');
                    }
                } catch {
                    navigate(AppRoutes.SIGN_IN);
                }
            } else {
                setIsLoading(false);
            }
        };

        checkAuthHandler();
    }, []);

    if (isLoading) return <GlobalLoader />;

    return <>{children}</>;
};
