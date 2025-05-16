import { FormControl, HStack, PinInput, PinInputField } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { AppRoutes } from '~/config';
import { useToast } from '~/hooks/use-toast';
import { useVerifyOtpMutation } from '~/query/user-api';
import { TErrorResponse } from '~/types';
import { OtpSchema } from '~/validation';

import { UiModal } from '../ui/UiModal';

export const OtpModal = ({
    isOpen,
    onClose,
    email,
    next,
}: {
    isOpen: boolean;
    email: string;
    onClose: () => void;
    next: () => void;
}) => {
    const navigate = useNavigate();
    const { showError } = useToast();

    const handleClose = () => {
        onClose();
        navigate(AppRoutes.SIGN_IN);
    };

    const [verifyOtp] = useVerifyOtpMutation();

    const {
        control,
        handleSubmit,
        resetField,
        setError,
        formState: { errors, isValid },
    } = useForm({
        resolver: yupResolver(OtpSchema),
    });

    const onSubmit = async (data: { code: string }) => {
        try {
            const result = await verifyOtp({ email, otpToken: data.code }).unwrap();
            if (result) next();
        } catch (error) {
            const response = error as TErrorResponse;
            switch (response.status) {
                case 403:
                    resetField('code');
                    setError('code', { message: 'Неверный код' });
                    break;

                default:
                    showError('Ошибка сервера', 'Попробуйте немного позже', 15000);
                    break;
            }
        }
    };

    useEffect(() => {
        if (isValid) {
            handleSubmit(onSubmit)();
        }
    }, [isValid, handleSubmit]);

    return (
        <UiModal
            image='/src/assets/modals/4.png'
            isOpen={isOpen}
            onClose={handleClose}
            header='Код отправлен'
            body={
                <>
                    <p>
                        Мы отправили вам на e-mail <b>{email} </b>
                        шестизначный код. Введите его ниже.
                    </p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl>
                            <Controller
                                name='code'
                                control={control}
                                defaultValue=''
                                render={({ field: { onChange, value } }) => (
                                    <HStack justify='center' mt={4}>
                                        <PinInput otp value={value} onChange={onChange}>
                                            {Array.from({ length: 6 }).map((_, index) => (
                                                <PinInputField
                                                    key={index}
                                                    color='primary.700'
                                                    borderColor={errors.code && 'error.400'}
                                                    _focusVisible={{ boxShadow: 'none' }}
                                                    _placeholder={{ color: 'primary.700' }}
                                                />
                                            ))}
                                        </PinInput>
                                    </HStack>
                                )}
                            />
                        </FormControl>
                    </form>
                </>
            }
            footer='Не пришло письмо? Проверьте папку Спам.'
        />
    );
};
