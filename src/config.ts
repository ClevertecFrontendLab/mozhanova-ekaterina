export const API_BASE_URL = 'https://marathon-api.clevertec.ru';
export const API_IMAGE_URL = 'https://training-api.clevertec.ru';

export const AppRoutes = {
    HOME: '/',
    SEARCH: '/search',
    CATEGORY: '/:category',
    CATEGORY_WILDCARD: '/:category/*',
    SUB_CATEGORY: ':subCategory',
    RECIPE: '/:category/:subCategory/:id',
    THE_JUICIEST: '/the-juiciest',
    NOT_FOUND: '/not-found',
    LOG_IN: '/login',
    SIGN_IN: '/signin',
    VERIFICATION: '/verification',
    RECOVERY: '/login/recovery',
} as const;
