import { Flex, Text } from '@chakra-ui/react';
import { Control, useController } from 'react-hook-form';

import { DATA_TEST_IDS } from '~/constants/test-ids';
import { NewRecipe } from '~/types';

import { UiNumberInput } from '../ui/UiNumberInput';

export const PortionsControl = ({
    error,
    control,
}: {
    error: boolean;
    control: Control<NewRecipe>;
}) => {
    const {
        field: { onChange, value },
    } = useController({ control, name: 'portions' });

    const handleChange = (valueString: string) => {
        const num = Number(valueString);
        if (valueString.trim() === '' || num === 0) {
            onChange(undefined);
        } else {
            onChange(num);
        }
    };

    return (
        <Flex w='100%' align='center' gap={6} justify={{ base: 'space-between', sm: 'flex-start' }}>
            <Text fontWeight={600}>На сколько человек ваш рецепт?</Text>

            <UiNumberInput
                dataInputId={DATA_TEST_IDS.RECIPE_PORTIONS}
                error={error}
                onChange={handleChange}
                value={value}
            />
        </Flex>
    );
};
