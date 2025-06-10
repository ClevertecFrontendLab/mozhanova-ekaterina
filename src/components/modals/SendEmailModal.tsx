import { Box, Grid } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import * as yup from 'yup';

import image from '~/assets/modals/3.png';
import { AppRoutes } from '~/constants/routes-config';
import { DATA_TEST_IDS } from '~/constants/test-ids';
import { useModalContext } from '~/contexts/modal-context';
import { useErrors } from '~/hooks/use-errors';
import { useForgotPasswordMutation } from '~/query/auth-api';
import { ErrorResponse } from '~/types';
import { emailSchema } from '~/validation';

import { UiButton } from '../ui/UiButton';
import { UiInput } from '../ui/UiInput';
import { UiModal } from '../ui/UiModal';

export const SendEmailModal = () => {
    const { sendEmailErrorHandler } = useErrors();
    const { isOpen, onClose, showVerificationCode } = useModalContext();
    const navigate = useNavigate();
    const handleClose = () => {
        onClose();
        navigate(AppRoutes.SIGN_IN);
    };

    const [forgotPassword] = useForgotPasswordMutation();

    const {
        register,
        handleSubmit,
        reset,
        setError,
        watch,
        setValue,
        formState: { errors, isValid },
    } = useForm({
        resolver: yupResolver(yup.object({ email: emailSchema })),
        mode: 'onChange',
    });

    const onSubmit = async (data: { email: string }) => {
        if (!isValid) return;
        try {
            const result = await forgotPassword(data.email).unwrap();
            if (result) showVerificationCode(data.email);
        } catch (error) {
            sendEmailErrorHandler(error as ErrorResponse, setError, reset);
        }
    };

    return (
        <UiModal
            maxW={{ base: '316px', md: '396px' }}
            image={image}
            isOpen={isOpen}
            onClose={handleClose}
            body={
                <>
                    <p>Для восстановления входа введите</p>
                    <p> ваш e-mail, куда можно отправить </p>
                    <p>уникальный код</p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box mt={4} mb={6}>
                            <UiInput
                                value={watch('email')}
                                setValue={(value: string) => setValue('email', value)}
                                type='email'
                                label='Ваш e-mail'
                                placeholder='e-mail'
                                error={errors?.email}
                                {...register('email')}
                                data-test-id={DATA_TEST_IDS.EMAIL_INPUT}
                            />
                        </Box>

                        <Grid>
                            <UiButton
                                type='submit'
                                variant='solid'
                                text='Получить код'
                                size='lg'
                                data-test-id={DATA_TEST_IDS.SUBMIT_BUTTON}
                            />
                        </Grid>
                    </form>
                </>
            }
            footer='Не пришло письмо? Проверьте папку Спам.'
            data-test-id={DATA_TEST_IDS.SEND_EMAIL_MODAL}
        />
    );
};
