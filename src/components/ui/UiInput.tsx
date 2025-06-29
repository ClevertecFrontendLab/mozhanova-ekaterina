import {
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input,
    InputGroup,
} from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';

type Props = {
    error: FieldError | undefined;
    placeholder: string;
    type: React.HTMLInputTypeAttribute;
    label: string;
    helperText: string;
    value: string;
    isDisabled: boolean;
    showHelperText: boolean;
    setValue: (value: string) => void;
    'data-test-id?': string;
};

export const UiInput = ({
    label,
    error,
    placeholder,
    helperText,
    type = 'text',
    setValue,
    value,
    isDisabled = false,
    showHelperText = false,
    ...props
}: Partial<Props>) => (
    <FormControl isInvalid={!!error} onBlur={() => setValue && value && setValue(value.trim())}>
        <FormLabel fontWeight={400}>{label}</FormLabel>
        <InputGroup size='lg'>
            <Input
                isDisabled={isDisabled}
                size='lg'
                variant='accent'
                type={type}
                placeholder={placeholder}
                borderColor={error && 'error.400'}
                value={value}
                {...props}
            />
        </InputGroup>

        {(error || showHelperText) && (
            <>
                <FormHelperText
                    mt={1}
                    textAlign='left'
                    color='text.light'
                    fontSize='xs'
                    fontWeight={400}
                >
                    {helperText}
                </FormHelperText>
                {error && (
                    <FormErrorMessage mt={1} fontSize='xs' fontWeight={400}>
                        {error.message}
                    </FormErrorMessage>
                )}
            </>
        )}
    </FormControl>
);
