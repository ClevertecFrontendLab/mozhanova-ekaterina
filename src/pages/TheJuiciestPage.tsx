import { Box, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { RelevantKitchenBlock } from '~/components/shared/RelevantKitchenBlock';
import { SearchBar } from '~/components/shared/search-bar/SearchBar';
import { UiButton } from '~/components/ui/UiButton';
import UiCardGrid from '~/components/ui/UiCardGrid';
import { TRecipe, useGetPopularRecipesQuery } from '~/query/recipe-api';
import { ApplicationState } from '~/store/configure-store';

export function TheJuiciestPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [allRecipes, setAllRecipes] = useState<TRecipe[]>([]);
    const filters = useSelector((state: ApplicationState) => state.recipe.filters);
    const { data, isLoading, isError } = useGetPopularRecipesQuery(
        {
            limit: 8,
            page: currentPage,
            ...(filters.allergens.length > 0 && { allergens: filters.allergens }),
        },
        {
            refetchOnMountOrArgChange: true,
        },
    );
    const hasMore = data?.meta ? currentPage < data.meta.totalPages : false;

    useEffect(() => {
        if (data?.data) {
            if (currentPage === 1) {
                // Первая страница - полная замена данных
                setAllRecipes(data.data);
            } else {
                // Последующие страницы - добавление данных
                setAllRecipes((prev) => [...prev, ...data.data]);
            }
        }
    }, [data?.data, currentPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [filters]);

    const loadMore = () => {
        if (hasMore) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    if (isError || isLoading) return null;

    return (
        <>
            <SearchBar title='Самое сочное' />
            <Box
                padding={{
                    base: '0 16px',
                    md: '0 20px',
                    lg: '0 24px',
                }}
            >
                <UiCardGrid data={allRecipes} />
                {hasMore && (
                    <Flex justifyContent='center' mt={4} mb={10}>
                        <UiButton
                            onClick={loadMore}
                            size='md'
                            text='Загрузить еще'
                            variant='primary'
                        />
                    </Flex>
                )}
                <RelevantKitchenBlock />
            </Box>
        </>
    );
}
