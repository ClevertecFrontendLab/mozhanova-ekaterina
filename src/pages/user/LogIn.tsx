import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    SimpleGrid,
    Text,
    VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import * as yup from 'yup';

import { UiButton } from '~/components/ui/UiButton';
import { useModalContext } from '~/contexts/modal-context';
import { useToast } from '~/hooks/use-toast';
import { useLoginMutation } from '~/query/user-api';
import { TErrorResponse } from '~/types';

//TODO: submit on enter, trim on blur, password visible on keeping, global loader

export const LogIn = () => {
    const { showError } = useToast();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const { showLoginError } = useModalContext();

    const schema = yup.object({
        login: yup
            .string()
            .min(5, 'Логин не менее 5 символов')
            .max(50, 'Максимальная длина 50 символов')
            .required('Введите логин'),
        password: yup
            .string()
            .min(8, 'Пароль не менее 8 символов')
            .max(50, 'Максимальная длина 50 символов')
            .required('Введите пароль'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    const [login] = useLoginMutation();

    const onSubmit = async (userData: { login: string; password: string }) => {
        try {
            const result = await login(userData).unwrap();
            if (result) {
                console.log(result);
                navigate('/');
            }
        } catch (error: unknown) {
            const response = error as TErrorResponse;
            switch (response.status) {
                case 401:
                    showError(
                        'Неверный логин или пароль',
                        'Попробуйте снова',
                        15000,
                        'bottom-left',
                    );
                    break;
                case 403:
                    showError(
                        'E-mail не верифицирован',
                        'Проверьте почту и перейдите по ссылке',
                        15000,
                        'bottom-left',
                    );
                    break;
                default:
                    showLoginError();
                    break;
            }
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <VStack spacing={6}>
                    <FormControl isInvalid={!!errors.login}>
                        <FormLabel>Логин для входа на сайт</FormLabel>
                        <Input
                            {...register('login')}
                            size='lg'
                            variant='login'
                            type='text'
                            placeholder='Введите логин'
                            borderColor={errors.login && 'error.400'}
                        />
                        {errors.login && (
                            <FormErrorMessage mt={1} fontSize='xs' fontWeight={400}>
                                {errors.login.message}
                            </FormErrorMessage>
                        )}
                    </FormControl>

                    <FormControl isInvalid={!!errors.password}>
                        <FormLabel>Пароль</FormLabel>
                        <InputGroup size='lg'>
                            <Input
                                {...register('password')}
                                variant='login'
                                type={showPassword ? 'text' : 'password'}
                                placeholder='Пароль для сайта'
                                borderColor={errors.login && 'error.400'}
                            />
                            <InputRightElement
                                onClick={() => setShowPassword((prev) => !prev)}
                                cursor='pointer'
                                bgSize='lg'
                            >
                                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                            </InputRightElement>
                        </InputGroup>
                        {errors.password && (
                            <FormErrorMessage mt={1} fontSize='xs' fontWeight={400}>
                                {errors.password.message}
                            </FormErrorMessage>
                        )}
                    </FormControl>
                </VStack>

                <SimpleGrid columns={1} mt='112px' spacing={4}>
                    <UiButton
                        isDisabled={!!errors.login || !!errors.password}
                        type='submit'
                        variant='solid'
                        text='Войти'
                        size='lg'
                    />

                    <Link to=''>
                        <Text textAlign='center' fontWeight={600}>
                            Забыли логин или пароль?
                        </Text>
                    </Link>
                </SimpleGrid>
            </form>
        </div>
    );
};
