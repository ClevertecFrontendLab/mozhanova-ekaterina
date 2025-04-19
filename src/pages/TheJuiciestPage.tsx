import { Box, Flex, SimpleGrid, useMediaQuery } from '@chakra-ui/react';

import { PageToolbar } from '~/components/shared/PageToolbar';
import { RelevantKitchenBlock } from '~/components/shared/RelevantKitchenBlock';
import { UiButton } from '~/components/ui/UiButton';
import { UiCard } from '~/components/ui/UiCard';
import { data } from '~/mocks/recipes';

export function TheJuiciest() {
    const [isLargerThanMD] = useMediaQuery('(min-width: 768px)');

    return (
        <>
            <PageToolbar title='Самое сочное' />
            <Box
                padding={{
                    base: '0 16px',
                    md: '0 20px',
                    lg: '0 24px',
                }}
            >
                <SimpleGrid
                    rowGap={4}
                    columnGap={6}
                    columns={{
                        base: 1,
                        sm: 2,
                    }}
                >
                    {data.slice(0, 8).map((recipe) => (
                        <UiCard
                            key={recipe.id}
                            data={recipe}
                            categoryBgColor='secondary.100'
                            size={isLargerThanMD ? 'lg' : 'sm'}
                        />
                    ))}
                </SimpleGrid>
                <Flex justifyContent='center' mt='16px' mb='40px'>
                    <UiButton size='md' text='Загрузить еще' variant='primary' />
                </Flex>
                <RelevantKitchenBlock
                    heading='Веганская кухня'
                    description='Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.'
                />
            </Box>
        </>
    );
}
