import { Grid, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { NOTIFICATION_MESSAGES } from '~/constants/notification-config';
import { useModalContext } from '~/contexts/modal-context';
import { useErrors } from '~/hooks/use-errors';
import { useToast } from '~/hooks/use-toast';
import { useUpdatePasswordMutation } from '~/query/user-api';
import { ErrorResponse, UpdatePassword } from '~/types';
import { UpdatePasswordSchema } from '~/validation';

import { UiButton } from '../ui/UiButton';
import { UiModal } from '../ui/UiModal';
import { UiPasswordInput } from '../ui/UiPasswordInput';

export const UpdatePasswordModal = () => {
    const { isOpen, onClose } = useModalContext();
    const [updatePassword] = useUpdatePasswordMutation();
    const { showSuccess } = useToast();
    const { updatePasswordErrorHandler } = useErrors();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isValid },
    } = useForm({
        resolver: yupResolver(UpdatePasswordSchema),
        mode: 'onChange',
    });

    const onSubmit = async (data: UpdatePassword) => {
        if (!isValid) return;
        try {
            await updatePassword(data).unwrap();
            showSuccess(NOTIFICATION_MESSAGES.UPDATE_PASSWORD_SUCCESS);
            onClose();
        } catch (error) {
            updatePasswordErrorHandler(error as ErrorResponse, () =>
                setError('password', { message: '' }),
            );
        }
    };

    return (
        <UiModal
            maxW={{ base: '316px', md: '396px' }}
            header='Сменить пароль'
            isOpen={isOpen}
            onClose={onClose}
            body={
                <form onSubmit={handleSubmit(onSubmit)}>
                    <VStack spacing={6}>
                        <UiPasswordInput
                            error={errors.password}
                            {...register('password')}
                            label='Введите старый пароль'
                            placeholder='Старый пароль'
                        />
                        <UiPasswordInput
                            error={errors.newPassword}
                            {...register('newPassword')}
                            label='Введите новый пароль'
                            placeholder='Новый пароль'
                        />
                        <UiPasswordInput
                            error={errors.passwordConfirm}
                            {...register('passwordConfirm')}
                            label='Повторите пароль'
                            placeholder='Пароль'
                        />
                    </VStack>
                    <Grid mt={8}>
                        <UiButton type='submit' size='lg' text='Сохранить пароль' variant='solid' />
                    </Grid>
                </form>
            }
        />
    );
};
