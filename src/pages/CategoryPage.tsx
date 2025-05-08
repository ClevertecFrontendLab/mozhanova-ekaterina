import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate, useParams } from 'react-router';

import { RelevantKitchenBlock } from '~/components/shared/RelevantKitchenBlock';
import { SearchBar } from '~/components/shared/search-bar/SearchBar';
import { ICategory, useGetCategoriesQuery } from '~/query/category-api';
import { useGetRecipesByCategoryQuery } from '~/query/recipe-api';
import { ApplicationState } from '~/store/configure-store';
import { setCategoryFilter, setSubCategoryFilter } from '~/store/recipe-slice';
import { selectCurrentRootCategory, selectFilters } from '~/store/selectors';

export function CategoryPage() {
    const params = useParams();
    const navigate = useNavigate();
    const filters = useSelector(selectFilters);
    const dispatch = useDispatch();

    const { category, subCategory } = params;

    const { currentData: categoryData, isLoading, isError } = useGetCategoriesQuery();

    const currentCategory = useSelector((state: ApplicationState) =>
        selectCurrentRootCategory(state, category as string),
    ) as ICategory;

    const currentSubCategory =
        currentCategory?.subCategories?.find((c) => c.category === subCategory) ?? null;

    const {
        currentData: recipesData,
        isError: recipesIsError,
        isFetching: recipesIsFetching,
    } = useGetRecipesByCategoryQuery(
        {
            categoryId: currentSubCategory?._id || '',
            limit: 8,
            ...(filters.searchString && { searchString: filters.searchString }),
            ...(filters.allergens.length > 0 && { allergens: filters.allergens }),
        },
        {
            skip: !currentSubCategory,
        },
    );

    useEffect(() => {
        if (!currentCategory || !currentSubCategory) return;
        dispatch(setCategoryFilter([currentCategory.title]));
        dispatch(setSubCategoryFilter(currentCategory.subCategories.map((c) => c._id)));
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

    if (isLoading || isError || !currentCategory) return null;

    return (
        <>
            <SearchBar
                data={recipesData?.data}
                title={currentCategory.title}
                description={currentCategory.description}
                isError={recipesIsError}
                isFetching={recipesIsFetching}
            />

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
}
