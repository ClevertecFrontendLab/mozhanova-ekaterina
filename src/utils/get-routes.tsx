import { AppRoutes } from '~/constants/routes-config';

export const routeHelpers = {
    getCategoryPath: (category: string) => `/${category}`,
    getSubCategoryPath: (category: string, subCategory: string) => `/${category}/${subCategory}`,
    getRecipePath: (category: string, subCategory: string, id: string) =>
        `/${category}/${subCategory}/${id}`,
    getEditRecipePath: (category: string, subCategory: string, id: string) =>
        `${AppRoutes.EDIT}/${category}/${subCategory}/${id}`,
};
