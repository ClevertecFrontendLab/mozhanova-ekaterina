import { AppRoutes, AppStaticRoutes } from '~/constants/routes-config';

export const routeHelpers = {
    getCategoryPath: (category: string) => `/${category}`,
    getSubCategoryPath: (category: string, subCategory: string) => `/${category}/${subCategory}`,
    getRecipePath: (category: string, subCategory: string, id: string) =>
        `/${category}/${subCategory}/${id}`,
    getEditRecipePath: (category: string, subCategory: string, id: string) =>
        `${AppStaticRoutes.EDIT_RECIPE}/${category}/${subCategory}/${id}`,
    getEditDraftPath: (id: string) => `${AppStaticRoutes.EDIT_DRAFT}/${id}`,
    getBlogPath: (id: string) => `${AppRoutes.BLOGS}/${id}`,
};
