import {
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { DATA_TEST_IDS } from '~/constants/test-ids';

type Props = {
    onChange: (value: string) => void;
    value?: number | string;
    error?: boolean;
    defaultValue?: number;
    dataInputId?: string;
};

export const UiNumberInput = ({ error, defaultValue, value, onChange, dataInputId }: Props) => {
    const [inputValue, setInputValue] = useState<string>(value !== undefined ? String(value) : '');

    useEffect(() => {
        setInputValue(value !== undefined ? String(value) : '');
    }, [value]);

    const handleChange = (valueString: string) => {
        setInputValue(valueString);
        onChange(valueString);
    };
    return (
        <NumberInput
            value={inputValue}
            color='neutral.400'
            focusBorderColor={error ? 'error.400' : 'primary.300'}
            borderColor={error ? 'error.400' : 'primary.300'}
            min={1}
            defaultValue={defaultValue}
            onChange={handleChange}
        >
            <NumberInputField w='90px' data-test-id={dataInputId} />
            <NumberInputStepper>
                <NumberIncrementStepper data-test-id={DATA_TEST_IDS.INCREMENT_STEPPER} />
                <NumberDecrementStepper data-test-id={DATA_TEST_IDS.DECREMENT_STEPPER} />
            </NumberInputStepper>
        </NumberInput>
    );
};
