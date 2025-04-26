import { Box, Flex, SimpleGrid, useMediaQuery } from '@chakra-ui/react';
import { memo } from 'react';

import { TRecipe } from '~/types';

import { UiCard } from '../ui/UiCard';
import { UiButton } from './UiButton';

function UiCardGrid({ data }: { data: TRecipe[] }) {
    const [isLargerThanMD] = useMediaQuery('(min-width: 769px)');
    return (
        <Box>
            <SimpleGrid
                rowGap={4}
                columnGap={6}
                pt={6}
                columns={{
                    base: 1,
                    sm: 2,
                    md: 1,
                    lg: 2,
                }}
            >
                {data.slice(0, 8).map((recipe, i) => (
                    <UiCard
                        data-test-id={`food-card-${i}`}
                        key={recipe.id}
                        data={recipe}
                        index={i}
                        categoryBgColor='secondary.100'
                        size={isLargerThanMD ? 'lg' : 'sm'}
                    />
                ))}
            </SimpleGrid>
            <Flex justifyContent='center' mt={4} mb={10}>
                <UiButton size='md' text='Загрузить еще' variant='primary' />
            </Flex>
        </Box>
    );
}

export default memo(UiCardGrid);
