import { TCategory, TRecipe, TSubCategory } from '~/types';

export const defineBreadcrumbLabel = (
    path: string,
    categories: TCategory[],
    subCategories: TSubCategory[],
    currentRecipe: TRecipe | null,
) => {
    switch (path) {
        case 'the-juiciest':
            return 'Самое сочное';

        case 'search':
            return 'Поиск по рецептам';

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
