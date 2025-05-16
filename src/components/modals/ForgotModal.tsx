import { Box, Grid } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import * as yup from 'yup';

import { AppRoutes } from '~/config';
import { useToast } from '~/hooks/use-toast';
import { useForgotPasswordMutation } from '~/query/user-api';
import { TErrorResponse } from '~/types';
import { emailSchema } from '~/validation';

import { UiButton } from '../ui/UiButton';
import { UiInput } from '../ui/UiInput';
import { UiModal } from '../ui/UiModal';

export const ForgotModal = ({
    isOpen,
    onClose,
    next,
}: {
    isOpen: boolean;
    onClose: () => void;
    next: (email: string) => void;
}) => {
    const { showError } = useToast();
    const navigate = useNavigate();
    const handleClose = () => {
        onClose();
        navigate(AppRoutes.SIGN_IN);
    };

    const [forgot] = useForgotPasswordMutation();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        resolver: yupResolver(yup.object({ email: emailSchema.required('Введите e-mail') })),
    });

    const onSubmit = async (data: { email: string }) => {
        try {
            const result = await forgot(data.email).unwrap();
            if (result) next(data.email);
        } catch (error) {
            const response = error as TErrorResponse;
            switch (response.status) {
                case 403:
                    showError(
                        'Такого e-mail нет',
                        'Попробуйте другой e-mail или проверьте правильность его написания',
                        15000,
                    );
                    break;

                default:
                    showError('Ошибка сервера', 'Попробуйте немного позже', 15000);
                    break;
            }
        }
    };

    return (
        <UiModal
            image='/src/assets/modals/3.png'
            isOpen={isOpen}
            onClose={handleClose}
            header='Восстановление входа'
            body={
                <>
                    <p>
                        Для восстановления входа введите ваш e-mail, куда можно отправить уникальный
                        код
                    </p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box mt={4} mb={6}>
                            <UiInput
                                type='email'
                                label='Ваш e-mail'
                                placeholder='e-mail'
                                error={errors?.email}
                                {...register('email')}
                            />
                        </Box>

                        <Grid>
                            <UiButton
                                isDisabled={!isValid}
                                type='submit'
                                variant='solid'
                                text='Получить код'
                                size='lg'
                            />
                        </Grid>
                    </form>
                </>
            }
            footer='Не пришло письмо? Проверьте папку Спам.'
        />
    );
};
