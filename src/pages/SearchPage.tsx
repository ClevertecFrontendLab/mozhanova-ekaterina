import { Box, Flex } from '@chakra-ui/react';
import { memo } from 'react';
import { useSelector } from 'react-redux';

import { PageToolbar } from '~/components/shared/PageToolbar/PageToolbar';
import { UiButton } from '~/components/ui/UiButton';
import UiCardGrid from '~/components/ui/UiCardGrid';
import { selectFilteredRecipes } from '~/store/selectors';

function SearchPage() {
    const filteredRecipes = useSelector(selectFilteredRecipes);

    return (
        <>
            <PageToolbar title='Приятного аппетита!' />
            <Box
                padding={{
                    base: '0 16px',
                    md: '0 20px',
                    lg: '0 24px',
                }}
            >
                <Box mb={10}>
                    {filteredRecipes.length > 0 ? (
                        <>
                            <UiCardGrid data={filteredRecipes} />
                            <Flex justifyContent='center' mt='16px' mb='40px'>
                                <UiButton size='md' text='Загрузить еще' variant='primary' />
                            </Flex>
                        </>
                    ) : (
                        <Box p={4}>Ничего не нашлось</Box>
                    )}
                </Box>
            </Box>
        </>
    );
}

export default memo(SearchPage);
