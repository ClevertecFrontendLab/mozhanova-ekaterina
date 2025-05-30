import {
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
} from '@chakra-ui/react';

import { DATA_TEST_IDS } from '~/constants/test-ids';

type Props = {
    onChange: (valueAsString: string, valueAsNumber: number) => void;
    value?: number;
    error?: boolean;
    defaultValue?: number;
};

export const UiNumberInput = ({ error, defaultValue, value, onChange }: Props) => (
    <NumberInput
        value={value}
        color='neutral.400'
        focusBorderColor='primary.300'
        borderColor={error ? 'error.400' : 'primary.300'}
        min={1}
        defaultValue={defaultValue}
        onChange={onChange}
    >
        <NumberInputField w='90px' />
        <NumberInputStepper>
            <NumberIncrementStepper data-test-id={DATA_TEST_IDS.INCREMENT_STEPPER} />
            <NumberDecrementStepper data-test-id={DATA_TEST_IDS.DECREMENT_STEPPER} />
        </NumberInputStepper>
    </NumberInput>
);
