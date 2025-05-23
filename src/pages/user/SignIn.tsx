import { SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router';

import { UiButton } from '~/components/ui/UiButton';
import { UiLoginInput } from '~/components/ui/UiLoginInput';
import { UiPasswordInput } from '~/components/ui/UiPasswordInput';
import { AppRoutes } from '~/constants/routes-config';
import { DATA_TEST_IDS } from '~/constants/test-ids';
import { useErrors } from '~/hooks/use-errors';
import { useSignInMutation } from '~/query/user-api';
import { isAuthenticated } from '~/store/selectors';
import { ErrorResponse } from '~/types';
import { LoginSchema } from '~/validation';

export const SignIn = () => {
    const navigate = useNavigate();
    const isAuth = useSelector(isAuthenticated);

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
    const { signInErrorHandler } = useErrors();

    const onSubmit = async (userData: { login: string; password: string }) => {
        try {
            await signIn(userData).unwrap();
            navigate(AppRoutes.HOME);
        } catch (error: unknown) {
            signInErrorHandler(error as ErrorResponse, setError, userData);
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
            <form onSubmit={handleSubmit(onSubmit)} data-test-id={DATA_TEST_IDS.SIGN_IN_FORM}>
                <VStack spacing={6}>
                    <UiLoginInput
                        error={errors.login}
                        {...register('login')}
                        data-test-id={DATA_TEST_IDS.LOGIN_INPUT}
                        setValue={(value: string) => setValue('login', value)}
                        value={watch('login')}
                    />
                    <UiPasswordInput
                        label='Пароль'
                        placeholder='Пароль для сайта'
                        helperText='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                        error={errors.password}
                        {...register('password')}
                        data-test-id={DATA_TEST_IDS.PASSWORD_INPUT}
                    />
                </VStack>

                <SimpleGrid columns={1} mt='112px' spacing={4}>
                    <UiButton
                        type='submit'
                        variant='solid'
                        text='Войти'
                        size='lg'
                        data-test-id={DATA_TEST_IDS.SUBMIT_BUTTON}
                    />

                    <Text
                        onClick={handleRecovery}
                        type='button'
                        as='button'
                        textAlign='center'
                        fontWeight={600}
                        data-test-id={DATA_TEST_IDS.FORGOT_PASSWORD}
                    >
                        Забыли логин или пароль?
                    </Text>
                </SimpleGrid>
            </form>
            <Outlet />
        </>
    );
};
