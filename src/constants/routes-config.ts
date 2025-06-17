export const AppBaseRoutes = {
    HOME: '/',
    SEARCH: '/search',
    THE_JUICIEST: '/the-juiciest',
    NOT_FOUND: '/not-found',
    SIGN_IN: '/signin',
    SIGN_UP: '/signup',
    VERIFICATION: '/verification',
    RECOVERY: '/signin/recovery',
    CREATE_RECIPE: '/new-recipe',
    EDIT_RECIPE: '/edit-recipe',
    EDIT_DRAFT: '/edit-draft',
    BLOGS: '/blogs',
    PROFILE: '/profile',
} as const;

export const RouteParams = {
    CATEGORY: 'category',
    SUB_CATEGORY: 'subCategory',
    RECIPE_ID: 'recipeId',
    BLOGGER_ID: 'bloggerId',
} as const;

export const AppDynamicRoutes = {
    CATEGORY: `/:${RouteParams.CATEGORY}`,
    CATEGORY_WILDCARD: `/:${RouteParams.CATEGORY}/*`,
    SUB_CATEGORY: `:${RouteParams.SUB_CATEGORY}`,
    RECIPE: `/:${RouteParams.CATEGORY}/:${RouteParams.SUB_CATEGORY}/:${RouteParams.RECIPE_ID}`,
    EDIT_RECIPE: `/edit-recipe/:${RouteParams.CATEGORY}/:${RouteParams.SUB_CATEGORY}/:${RouteParams.RECIPE_ID}`,
    EDIT_DRAFT: `/edit-draft/:${RouteParams.RECIPE_ID}`,
    BLOGS_USER: `/blogs/:${RouteParams.BLOGGER_ID}`,
} as const;

export const AppRoutes = {
    ...AppBaseRoutes,
    ...AppDynamicRoutes,
} as const;
