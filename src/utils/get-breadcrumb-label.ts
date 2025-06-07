import { BloggerInfo, Category, Recipe } from '~/types';

export const defineBreadcrumbLabel = (
    path: string,
    categories: Category[] = [],
    subCategories: Category[] = [],
    currentRecipe: Recipe | null,
    currentUser: BloggerInfo | null,
) => {
    switch (path) {
        case 'the-juiciest':
            return 'Самое сочное';

        case 'search':
            return 'Поиск по рецептам';

        case 'new-recipe':
            return 'Новый рецепт';

        case 'blogs':
            return 'Блоги';

        case categories.find((c) => c.category === path)?.category:
            return categories.find((c) => c.category === path)?.title;

        case subCategories.find((c) => c.category === path)?.category:
            return subCategories.find((c) => c.category === path)?.title;

        case currentRecipe?._id:
            return currentRecipe?.title;

        case currentUser?._id:
            return `${currentUser?.firstName} ${currentUser?.lastName} (@${currentUser?.login})`;

        default:
            return '';
    }
};
