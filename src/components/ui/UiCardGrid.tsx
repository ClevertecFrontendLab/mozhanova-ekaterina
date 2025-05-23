import { SimpleGrid } from '@chakra-ui/react';
import { memo } from 'react';

import { useBreakpoint } from '~/hooks/use-breakpoint';
import { Recipe } from '~/types';

import { UiCard } from '../ui/UiCard';

export const UiCardGrid = memo(({ data }: { data: Recipe[] | undefined }) => {
    const [isLargerThanMD] = useBreakpoint('md');

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
});
