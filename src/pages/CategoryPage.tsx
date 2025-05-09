import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate, useParams } from 'react-router';

import { RelevantKitchenBlock } from '~/components/shared/RelevantKitchenBlock';
import { SearchBar } from '~/components/shared/search-bar/SearchBar';
import { useGetCategoriesQuery } from '~/query/category-api';
import { ApplicationState } from '~/store/configure-store';
import { setCategoryFilter, setSubCategoryFilter } from '~/store/recipe-slice';
import { selectCurrentRootCategory } from '~/store/selectors';
import { TCategory } from '~/types';

export const CategoryPage = () => {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { category, subCategory } = params;

    const { currentData: categoryData, isLoading, isError } = useGetCategoriesQuery();

    const currentCategory = useSelector((state: ApplicationState) =>
        selectCurrentRootCategory(state, category as string),
    ) as TCategory;

    const currentSubCategory =
        currentCategory?.subCategories?.find((category) => category.category === subCategory) ??
        null;

    useEffect(() => {
        if (!currentCategory || !currentSubCategory) return;
        dispatch(setCategoryFilter([currentCategory.title]));
        dispatch(
            setSubCategoryFilter(currentCategory.subCategories.map((category) => category._id)),
        );
    }, [currentCategory, currentSubCategory, dispatch]);

    useEffect(() => {
        if (isLoading) return;

        const shouldRedirect =
            !categoryData ||
            isError ||
            !currentCategory ||
            (currentCategory.subCategories.length > 0 && subCategory && !currentSubCategory);

        if (shouldRedirect) {
            navigate('/not-found', { replace: true });
        }

        if (currentCategory && !subCategory)
            navigate(`/${currentCategory.category}/${currentCategory.subCategories[0].category}`);
    }, [
        navigate,
        categoryData,
        isLoading,
        isError,
        currentCategory,
        currentSubCategory,
        subCategory,
    ]);

    return (
        <>
            {currentCategory && (
                <SearchBar
                    title={currentCategory.title}
                    description={currentCategory.description}
                />
            )}

            <Box
                padding={{
                    base: '0 16px',
                    md: '0 20px',
                    lg: '0 24px',
                }}
            >
                <Outlet />
                <RelevantKitchenBlock />
            </Box>
        </>
    );
};
