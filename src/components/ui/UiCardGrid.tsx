import { SimpleGrid, useMediaQuery } from '@chakra-ui/react';
import { memo } from 'react';

import { TRecipe } from '~/query/recipe-api';

import { UiCard } from '../ui/UiCard';

function UiCardGrid({ data }: { data: TRecipe[] | undefined }) {
    const [isLargerThanMD] = useMediaQuery('(min-width: 769px)');

    if (!data) return null;

    return (
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
            {data.map((recipe, i) => (
                <UiCard
                    data-test-id={`food-card-${i}`}
                    key={recipe._id}
                    data={recipe}
                    index={i}
                    categoryBgColor='secondary.100'
                    size={isLargerThanMD ? 'lg' : 'sm'}
                />
            ))}
        </SimpleGrid>
    );
}

export default memo(UiCardGrid);
