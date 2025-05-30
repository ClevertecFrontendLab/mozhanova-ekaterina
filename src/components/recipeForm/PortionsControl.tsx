import { Flex, Text } from '@chakra-ui/react';
import { Control, Controller } from 'react-hook-form';

import { DATA_TEST_IDS } from '~/constants/test-ids';
import { NewRecipe } from '~/types';

import { UiNumberInput } from '../ui/UiNumberInput';

export const PortionsControl = ({
    error,
    control,
}: {
    error: boolean;
    control: Control<NewRecipe>;
}) => (
    <Flex
        data-test-id={DATA_TEST_IDS.RECIPE_PORTIONS}
        w='100%'
        align='center'
        gap={6}
        justify={{ base: 'space-between', sm: 'flex-start' }}
    >
        <Text fontWeight={600}>На сколько человек ваш рецепт?</Text>
        <Controller
            control={control}
            name='portions'
            render={({ field: { onChange, value } }) => (
                <UiNumberInput error={error} onChange={onChange} value={value} />
            )}
        />
    </Flex>
);
