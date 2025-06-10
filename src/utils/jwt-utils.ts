import { jwtDecode } from 'jwt-decode';

import { JwtPayload } from '~/types';

export const decodeToken = (token: string | null): string | null => {
    if (!token) return null;

    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.userId;
};
