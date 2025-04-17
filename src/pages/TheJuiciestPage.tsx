import { Flex, SimpleGrid, useMediaQuery } from '@chakra-ui/react';

import { PageToolbar } from '~/components/PageToolbar';
import { RelevantKitchenBlock } from '~/components/RelevantKitchenBlock';
import { UiButton } from '~/components/ui/UiButton';
import { UiCard } from '~/components/ui/UiCard';
import { data } from '~/mocks/recipes';

export function TheJuiciest() {
    const [isLargerThanMD] = useMediaQuery('(min-width: 768px)');

    return (
        <div>
            <PageToolbar title='Самое сочное' />
            <SimpleGrid
                rowGap={4}
                columnGap={6}
                columns={{
                    base: 1,
                    sm: 2,
                }}
            >
                {data.map((recipe) => (
                    <UiCard
                        key={recipe.id}
                        data={recipe}
                        direction='row'
                        infoPosition='top'
                        controls
                        categoryBgColor='secondary.100'
                        size={isLargerThanMD ? 'lg' : 'sm'}
                    />
                ))}
            </SimpleGrid>
            <Flex justifyContent='center' mt='16px' mb='40px'>
                <UiButton size='md' text='Загрузить еще' variant='primary' />
            </Flex>
            <RelevantKitchenBlock
                data={data_relevant_vegan}
                heading='Веганская кухня'
                description='Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.'
            />
        </div>
    );
}
