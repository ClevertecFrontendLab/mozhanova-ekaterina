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
    placeholder: string;
    error: FieldError | undefined;
    type?: React.HTMLInputTypeAttribute;
    label?: string;
    helperText?: string;
    value?: string;
    setValue?: (value: string) => void;
    'data-test-id?'?: string;
};

export const UiInput = ({
    label,
    error,
    placeholder,
    helperText,
    type = 'text',
    setValue,
    value,
    ...props
}: Props) => (
    <FormControl isInvalid={!!error} onBlur={() => setValue && value && setValue(value.trim())}>
        <FormLabel fontWeight={400}>{label}</FormLabel>
        <InputGroup size='lg'>
            <Input
                size='lg'
                variant='login'
                type={type}
                placeholder={placeholder}
                borderColor={error && 'error.400'}
                {...props}
            />
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
