import {
    FormControl,
    FormErrorMessage,
    HStack,
    PinInput,
    PinInputField,
    Text,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import image from '~/assets/modals/4.png';
import { AppRoutes } from '~/config';
import { useToast } from '~/hooks/use-toast';
import { useVerifyOtpMutation } from '~/query/user-api';
import { TErrorResponse } from '~/types';
import { OtpSchema } from '~/validation';

import { UiModal } from '../ui/UiModal';

export const VerificationCodeModal = ({
    isOpen,
    onClose,
    email,
    next,
}: {
    isOpen: boolean;
    email: string;
    onClose: () => void;
    next: (email: string) => void;
}) => {
    const navigate = useNavigate();
    const { showError } = useToast();
    const [headerText, setHeaderText] = useState('');

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
            if (result) next(email);
        } catch (error) {
            const response = error as TErrorResponse;
            resetField('code');
            switch (response.status) {
                case 403:
                    setError('code', { message: '' });
                    setHeaderText('Неверный код');
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
    }, [isValid]);

    return (
        <UiModal
            image={image}
            isOpen={isOpen}
            onClose={handleClose}
            header={headerText && <Text pb={4}>{headerText}</Text>}
            body={
                <>
                    <p>
                        Мы отправили вам на e-mail <br /> <b>{email} </b> <br />
                        шестизначный код. Введите его ниже.
                    </p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl isInvalid={!!errors.code}>
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
                                                    data-test-id={`verification-code-input-${index + 1}`}
                                                />
                                            ))}
                                        </PinInput>
                                    </HStack>
                                )}
                            />
                            <FormErrorMessage>{errors.code?.message}</FormErrorMessage>
                        </FormControl>
                    </form>
                </>
            }
            footer='Не пришло письмо? Проверьте папку Спам.'
            data-test-id='verification-code-modal'
        />
    );
};
