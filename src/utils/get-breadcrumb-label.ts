import { Category, Recipe } from '~/types';

export const defineBreadcrumbLabel = (
    path: string,
    categories: Category[] = [],
    subCategories: Category[] = [],
    currentRecipe: Recipe | null,
) => {
    switch (path) {
        case 'the-juiciest':
            return 'Самое сочное';

        case 'search':
            return 'Поиск по рецептам';

        case 'new-recipe':
            return 'Новый рецепт';
        case categories.find((c) => c.category === path)?.category:
            return categories.find((c) => c.category === path)?.title;

        case subCategories.find((c) => c.category === path)?.category:
            return subCategories.find((c) => c.category === path)?.title;

        case currentRecipe?._id:
            return currentRecipe?.title;

        default:
            return '';
    }
};
