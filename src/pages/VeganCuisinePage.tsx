import { Box } from '@chakra-ui/react';

import { PageTabs } from '~/components/PageTabs';
import { PageToolbar } from '~/components/PageToolbar';

export function VeganCuisine() {
    return (
        <Box>
            <Box pb='24px'>
                <PageToolbar
                    title='Приятного аппетита!'
                    description='Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.'
                />
            </Box>

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
        </Box>
    );
}
