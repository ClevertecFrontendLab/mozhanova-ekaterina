import { useAppSelector } from '~/store/hooks';
import { selectCategories } from '~/store/selectors';

export const useRoutes = () => {
    const categories = useAppSelector(selectCategories);

    return {
        getRecipePath: (categoriesIds: string[], id: string) => {
            const category = categories.find((category) =>
                category.subCategories.find((subCategory) => subCategory._id === categoriesIds[0]),
            );
            const subCategory = category?.subCategories[0].category;
            return `/${category?.category}/${subCategory}/${id}`;
        },
    };
};
