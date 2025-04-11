import { Flex } from '@chakra-ui/react';

import { PageTabs } from '~/components/PageTabs';
import { PageToolbar } from '~/components/PageToolbar';
import { RelevantKitchenBlock } from '~/components/RelevantKitchenBlock';
import { UiButton } from '~/components/ui/UiButton';
import { data_relevant_desert } from '~/constants';

export function VeganCuisine() {
    return (
        <div>
            <PageToolbar
                title='Веганская кухня'
                description='Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.'
            />

            <PageTabs
                tabs={[
                    'Закуски',
                    'Первые блюда',
                    'Вторые блюда',
                    'Гарниры',
                    'Десерты',
                    'Выпечка',
                    'Сыроедческие блюда',
                    'Напитки',
                ]}
            />
            <Flex justifyContent='center' mt='16px' mb='40px'>
                <UiButton size='md' text='Загрузить еще' variant='primary' />
            </Flex>
            <RelevantKitchenBlock
                data={data_relevant_desert}
                heading='Десерты, выпечка'
                description='Без них невозможно представить себе ни современную, ни традиционную  кулинарию. Пироги и печенья, блины, пончики, вареники и, конечно, хлеб - рецепты изделий из теста многообразны и невероятно популярны.'
            />
        </div>
    );
}
