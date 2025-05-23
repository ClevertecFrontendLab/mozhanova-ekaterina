import { Grid, Text, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { NOTIFICATION_MESSAGES } from '~/constants/notification-config';
import { AppRoutes } from '~/constants/routes-config';
import { DATA_TEST_IDS } from '~/constants/test-ids';
import { useModalContext } from '~/contexts/modal-context';
import { useErrors } from '~/hooks/use-errors';
import { useToast } from '~/hooks/use-toast';
import { useResetPasswordMutation } from '~/query/user-api';
import { RecoverySchema } from '~/validation';

import { UiButton } from '../ui/UiButton';
import { UiLoginInput } from '../ui/UiLoginInput';
import { UiModal } from '../ui/UiModal';
import { UiPasswordInput } from '../ui/UiPasswordInput';

export const ResetCredentialsModal = () => {
    const { showSuccess } = useToast();
    const { resetCredentialsErrorHandler } = useErrors();
    const navigate = useNavigate();
    const [resetPassword] = useResetPasswordMutation();
    const { isOpen, onClose, modalState: email } = useModalContext();

    const {
        register,
        handleSubmit,
        watch,
        setValue,
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
            const result = await resetPassword({ ...data, email }).unwrap();
            if (result) {
                showSuccess(NOTIFICATION_MESSAGES.RESET_CREDENTIALS_SUCCESS);
                navigate(AppRoutes.SIGN_IN);
                onClose();
            }
        } catch {
            resetCredentialsErrorHandler();
        }
    };

    return (
        <UiModal
            isOpen={isOpen}
            onClose={handleClose}
            header={
                <Text mb={2}>
                    <p>Восстановление</p>
                    <p>аккаунта</p>
                </Text>
            }
            body={
                <form onSubmit={handleSubmit(onSubmit)}>
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
                        <UiPasswordInput
                            label='Повторите пароль'
                            placeholder='Повторите пароль'
                            error={errors.passwordConfirm}
                            {...register('passwordConfirm')}
                            data-test-id={DATA_TEST_IDS.CONFIRM_PASSWORD_INPUT}
                        />
                    </VStack>
                    <Grid mt={8}>
                        <UiButton
                            type='submit'
                            variant='solid'
                            text='Зарегистрироваться'
                            size='lg'
                            data-test-id={DATA_TEST_IDS.SUBMIT_BUTTON}
                        />
                    </Grid>
                </form>
            }
            data-test-id={DATA_TEST_IDS.RESET_CREDENTIALS_MODAL}
        />
    );
};
