import { SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router';

import { UiButton } from '~/components/ui/UiButton';
import { UiInput } from '~/components/ui/UiInput';
import { useModalContext } from '~/contexts/modal-context';
import { useToast } from '~/hooks/use-toast';
import { useLoginMutation } from '~/query/user-api';
import { ApplicationState } from '~/store/configure-store';
import { TErrorResponse } from '~/types';
import { LoginSchema } from '~/validation';

//TODO:  trim on blur

export const LogIn = () => {
    const { showError } = useToast();
    const navigate = useNavigate();
    const { showLoginError } = useModalContext();
    const isAuth = useSelector((state: ApplicationState) => state.user.isAuthenticated);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(LoginSchema),
        mode: 'onChange',
    });

    const [login] = useLoginMutation();

    const onSubmit = async (userData: { login: string; password: string }) => {
        try {
            const result = await login(userData).unwrap();
            if (result) {
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

    const handleRecovery = () => {
        navigate('/login/recovery');
    };

    useEffect(() => {
        if (isAuth) navigate('/');
    }, [isAuth, navigate]);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <VStack spacing={6}>
                    <UiInput
                        label='Логин для входа на сайт'
                        placeholder='Введите логин'
                        helperText=''
                        error={errors.login}
                        {...register('login')}
                    />
                    <UiInput
                        type='password'
                        label='Пароль'
                        placeholder='Пароль для сайта'
                        error={errors.password}
                        {...register('password')}
                    />
                </VStack>

                <SimpleGrid columns={1} mt='112px' spacing={4}>
                    <UiButton
                        isDisabled={!!errors.login || !!errors.password}
                        type='submit'
                        variant='solid'
                        text='Войти'
                        size='lg'
                    />

                    <Text
                        onClick={handleRecovery}
                        type='button'
                        as='button'
                        textAlign='center'
                        fontWeight={600}
                    >
                        Забыли логин или пароль?
                    </Text>
                </SimpleGrid>
            </form>
            <Outlet />
        </>
    );
};
