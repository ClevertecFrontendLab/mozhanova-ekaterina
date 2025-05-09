import { Box, Flex } from '@chakra-ui/react';
import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { SearchBar } from '~/components/shared/search-bar/SearchBar';
import { UiButton } from '~/components/ui/UiButton';
import { UiCardGrid } from '~/components/ui/UiCardGrid';
import { useToast } from '~/hooks/use-toast';
import { ApplicationState } from '~/store/configure-store';
import { useRecipesSearch } from '~/store/hooks';
import { setCurrentPage } from '~/store/recipe-slice';
import { selectFilters } from '~/store/selectors';
import { TRecipe } from '~/types';

export const SearchPage = memo(() => {
    const [allRecipes, setAllRecipes] = useState<TRecipe[]>([]);
    const pagination = useSelector((state: ApplicationState) => state.recipe.pagination);
    const filters = useSelector(selectFilters);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { showError } = useToast();

    const { isError, data } = useRecipesSearch();

    const hasMore = pagination.totalPages ? pagination.currentPage < pagination.totalPages : false;

    useEffect(() => {
        if (data) {
            if (pagination.currentPage === 1) {
                setAllRecipes(data);
            } else {
                setAllRecipes((prev) => [...prev, ...data]);
            }
        }
    }, [data, pagination.currentPage]);

    useEffect(() => {}, [navigate, data]);

    useEffect(() => {
        dispatch(setCurrentPage(1));
    }, [filters, dispatch]);

    useEffect(() => {
        if (isError) {
            navigate(-1);
            showError('Ошибка сервера', 'Попробуйте поискать снова попозже');
        }
    }, [isError, showError, navigate, dispatch]);

    const loadMore = () => {
        if (hasMore) {
            dispatch(setCurrentPage(pagination.currentPage + 1));
        }
    };
    return (
        <>
            <SearchBar title='Приятного аппетита!' />

            <Box
                padding={{
                    base: '0 16px',
                    md: '0 20px',
                    lg: '0 24px',
                }}
            >
                <Box mb={10}>
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
                </Box>
            </Box>
        </>
    );
});
