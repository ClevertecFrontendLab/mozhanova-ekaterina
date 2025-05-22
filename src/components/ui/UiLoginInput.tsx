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
    value?: string;
    setValue?: (value: string) => void;
    'data-test-id?'?: string;
};

export const UiLoginInput = ({ error, setValue, value, ...props }: Props) => (
    <FormControl isInvalid={!!error} onBlur={() => setValue && value && setValue(value.trim())}>
        <FormLabel fontWeight={400}>Логин для входа на сайт</FormLabel>
        <InputGroup size='lg'>
            <Input
                size='lg'
                variant='login'
                type='text'
                placeholder='Введите логин'
                borderColor={error && 'error.400'}
                {...props}
            />
        </InputGroup>

        {error && (
            <>
                <FormHelperText
                    mt={1}
                    textAlign='left'
                    color='text.light'
                    fontSize='xs'
                    fontWeight={400}
                >
                    Логин не менее 5 символов, только латиница, цифры и !@#$&_+-
                </FormHelperText>
                <FormErrorMessage mt={1} fontSize='xs' fontWeight={400}>
                    {error.message}
                </FormErrorMessage>
            </>
        )}
    </FormControl>
);
