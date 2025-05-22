import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FieldError } from 'react-hook-form';

import { DATA_TEST_IDS } from '~/constants/test-ids';

type Props = {
    label: string;
    placeholder: string;
    error: FieldError | undefined;
    helperText?: string;
    value?: string;
    setValue?: (value: string) => void;
    'data-test-id?'?: string;
};

export const UiPasswordInput = ({
    label,
    error,
    placeholder,
    helperText,
    setValue,
    value,
    ...props
}: Props) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <FormControl isInvalid={!!error} onBlur={() => setValue && value && setValue(value.trim())}>
            <FormLabel fontWeight={400}>{label}</FormLabel>
            <InputGroup size='lg'>
                <Input
                    size='lg'
                    variant='login'
                    type={showPassword ? 'text' : 'password'}
                    placeholder={placeholder}
                    borderColor={error && 'error.400'}
                    {...props}
                />
                <InputRightElement
                    onMouseDownCapture={() => setShowPassword(true)}
                    onMouseUp={() => setShowPassword(false)}
                    cursor='pointer'
                    bgSize='lg'
                    data-test-id={DATA_TEST_IDS.PASSWORD_VISIBILITY_BUTTON}
                >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </InputRightElement>
            </InputGroup>

            {helperText && error && (
                <FormHelperText
                    mt={1}
                    textAlign='left'
                    color='text.light'
                    fontSize='xs'
                    fontWeight={400}
                >
                    {helperText}
                </FormHelperText>
            )}
            {error && (
                <FormErrorMessage mt={1} fontSize='xs' fontWeight={400}>
                    {error.message}
                </FormErrorMessage>
            )}
        </FormControl>
    );
};
