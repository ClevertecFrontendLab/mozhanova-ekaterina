import { Flex, Text } from '@chakra-ui/react';
import { Control, useController } from 'react-hook-form';

import { DATA_TEST_IDS } from '~/constants/test-ids';
import { NewRecipe } from '~/types';

import { UiNumberInput } from '../ui/UiNumberInput';

export const TimeControl = ({
    error,
    control,
}: {
    error: boolean;
    control: Control<NewRecipe>;
}) => {
    const {
        field: { onChange, value },
    } = useController({ control, name: 'time' });

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
            <Text fontWeight={600}>Сколько времени готовить в минутах?</Text>

            <UiNumberInput
                dataInputId={DATA_TEST_IDS.RECIPE_TIME}
                error={error}
                onChange={handleChange}
                value={value}
                defaultValue={value}
            />
        </Flex>
    );
};
