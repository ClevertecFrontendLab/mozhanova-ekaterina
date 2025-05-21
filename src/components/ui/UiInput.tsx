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

type Props = {
    label: string;
    placeholder: string;
    error: FieldError | undefined;
    type?: React.HTMLInputTypeAttribute;
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
}: Props) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <FormControl isInvalid={!!error} onBlur={() => setValue && value && setValue(value.trim())}>
            <FormLabel fontWeight={400}>{label}</FormLabel>
            <InputGroup size='lg'>
                <Input
                    size='lg'
                    variant='login'
                    type={showPassword ? 'text' : type}
                    placeholder={placeholder}
                    borderColor={error && 'error.400'}
                    {...props}
                />
                {type === 'password' && (
                    <InputRightElement
                        onMouseDownCapture={() => setShowPassword(true)}
                        onMouseUp={() => setShowPassword(false)}
                        cursor='pointer'
                        bgSize='lg'
                        data-test-id='password-visibility-button'
                    >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </InputRightElement>
                )}
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
