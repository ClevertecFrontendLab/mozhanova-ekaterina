import { jwtDecode } from 'jwt-decode';

import { JwtPayload } from '~/types';

export const decodeToken = (token: string | null): string | null => {
    if (!token) return null;

    try {
        const decoded = jwtDecode<JwtPayload>(token);
        return decoded.userId || null;
    } catch (error) {
        console.error('Ошибка декодирования токена:', error);
        return null;
    }
};
