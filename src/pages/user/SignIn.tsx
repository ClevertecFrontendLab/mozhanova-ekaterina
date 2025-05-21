import { SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router';

import { UiButton } from '~/components/ui/UiButton';
import { UiInput } from '~/components/ui/UiInput';
import { AppRoutes } from '~/config';
import { useModalContext } from '~/contexts/modal-context';
import { useToast } from '~/hooks/use-toast';
import { useSignInMutation } from '~/query/user-api';
import { ApplicationState } from '~/store/configure-store';
import { TErrorResponse } from '~/types';
import { LoginSchema } from '~/validation';

export const SignIn = () => {
    const { showError } = useToast();
    const navigate = useNavigate();
    const { showSignInError } = useModalContext();
    const isAuth = useSelector((state: ApplicationState) => state.user.isAuthenticated);

    const {
        register,
        handleSubmit,
        setValue,
        setError,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(LoginSchema),
        mode: 'onChange',
    });

    const [signIn] = useSignInMutation();

    const onSubmit = async (userData: { login: string; password: string }) => {
        try {
            const result = await signIn(userData).unwrap();
            if (result) {
                navigate(AppRoutes.HOME);
            }
        } catch (error: unknown) {
            const response = error as TErrorResponse;
            switch (response.status) {
                case 401:
                    setError('login', { message: '' });
                    setError('password', { message: '' });
                    showError(
                        'Неверный логин или пароль',
                        'Попробуйте снова',
                        15000,
                        'bottom-left',
                    );
                    break;
                case 403:
                    setError('login', { message: '' });
                    setError('password', { message: '' });
                    showError(
                        'E-mail не верифицирован',
                        'Проверьте почту и перейдите по ссылке',
                        15000,
                        'bottom-left',
                    );
                    break;
                default:
                    showSignInError(userData);
                    break;
            }
        }
    };

    const handleRecovery = () => {
        navigate(AppRoutes.RECOVERY);
    };

    useEffect(() => {
        if (isAuth) navigate(AppRoutes.HOME);
    }, [isAuth, navigate]);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} data-test-id='sign-in-form'>
                <VStack spacing={6}>
                    <UiInput
                        label='Логин для входа на сайт'
                        placeholder='Введите логин'
                        helperText=''
                        error={errors.login}
                        {...register('login')}
                        setValue={(value: string) => setValue('login', value)}
                        value={watch('login')}
                        data-test-id='login-input'
                    />
                    <UiInput
                        type='password'
                        label='Пароль'
                        placeholder='Пароль для сайта'
                        error={errors.password}
                        {...register('password')}
                        data-test-id='password-input'
                    />
                </VStack>

                <SimpleGrid columns={1} mt='112px' spacing={4}>
                    <UiButton
                        type='submit'
                        variant='solid'
                        text='Войти'
                        size='lg'
                        data-test-id='submit-button'
                    />

                    <Text
                        zIndex={10}
                        onClick={handleRecovery}
                        type='button'
                        as='button'
                        textAlign='center'
                        fontWeight={600}
                        data-test-id='forgot-password'
                    >
                        Забыли логин или пароль?
                    </Text>
                </SimpleGrid>
            </form>
            <Outlet />
        </>
    );
};
