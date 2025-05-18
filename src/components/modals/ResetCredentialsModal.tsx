import { Grid, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { AppRoutes } from '~/config';
import { useToast } from '~/hooks/use-toast';
import { useResetPasswordMutation } from '~/query/user-api';
import { RecoverySchema } from '~/validation';

import { UiButton } from '../ui/UiButton';
import { UiInput } from '../ui/UiInput';
import { UiModal } from '../ui/UiModal';

export const ResetCredentialsModal = ({
    email,
    isOpen,
    onClose,
}: {
    email: string;
    isOpen: boolean;
    onClose: () => void;
}) => {
    const { showSuccess, showError } = useToast();

    const navigate = useNavigate();
    const [reset] = useResetPasswordMutation();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        resolver: yupResolver(RecoverySchema),
        mode: 'onChange',
    });

    const handleClose = () => {
        onClose();
        navigate(AppRoutes.SIGN_IN);
    };

    const onSubmit = async (data: { login: string; password: string; passwordConfirm: string }) => {
        if (!isValid) return;
        try {
            const result = await reset({ ...data, email }).unwrap();
            if (result) {
                showSuccess('Восстановление данных успешно', '', 15000, 'bottom-left');
                navigate(AppRoutes.SIGN_IN);
                onClose();
            }
        } catch (_error) {
            showError('Ошибка сервера', 'Попробуйте немного позже', 15000);
        }
    };

    return (
        <UiModal
            isOpen={isOpen}
            onClose={handleClose}
            header={
                <span>
                    Восстановление <br /> аккаунта
                </span>
            }
            body={
                <form onSubmit={handleSubmit(onSubmit)}>
                    <VStack spacing={6}>
                        <UiInput
                            label='Логин для входа на сайт'
                            placeholder='Введите логин'
                            helperText='Логин не менее 5 символов, только латиница'
                            error={errors.login}
                            {...register('login')}
                            data-test-id='login-input'
                        />
                        <UiInput
                            type='password'
                            label='Пароль'
                            placeholder='Пароль для сайта'
                            helperText='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                            error={errors.password}
                            {...register('password')}
                            data-test-id='password-input'
                        />
                        <UiInput
                            type='password'
                            label='Повторите пароль'
                            placeholder='Повторите пароль'
                            error={errors.passwordConfirm}
                            {...register('passwordConfirm')}
                            data-test-id='confirm-password-input'
                        />
                    </VStack>
                    <Grid mt={8}>
                        <UiButton
                            type='submit'
                            variant='solid'
                            text='Зарегистрироваться'
                            size='lg'
                            data-test-id='submit-button'
                        />
                    </Grid>
                </form>
            }
            data-test-id='reset-credentials-modal'
        />
    );
};
