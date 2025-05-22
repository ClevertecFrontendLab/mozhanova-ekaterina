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
import { AppRoutes } from '~/constants/routes-config';
import { DATA_TEST_IDS } from '~/constants/test-ids';
import { useErrorHandlers } from '~/hooks/use-error';
import { useVerifyCodeMutation } from '~/query/user-api';
import { ErrorResponse } from '~/types';
import { verificationCodeSchema } from '~/validation';

import { UiModal } from '../ui/UiModal';

export const VerificationCodeModal = ({
    isOpen,
    onClose,
    email,
    nextModal,
}: {
    isOpen: boolean;
    email: string;
    onClose: () => void;
    nextModal: (email: string) => void;
}) => {
    const navigate = useNavigate();
    const [headerText, setHeaderText] = useState('');

    const handleClose = () => {
        onClose();
        navigate(AppRoutes.SIGN_IN);
    };

    const [verifyCode] = useVerifyCodeMutation();

    const {
        control,
        handleSubmit,
        resetField,
        setError,
        formState: { errors, isValid },
    } = useForm({
        resolver: yupResolver(verificationCodeSchema),
    });
    const { verificationCodeErrorHandler } = useErrorHandlers();
    const onSubmit = async (data: { code: string }) => {
        try {
            const result = await verifyCode({ email, otpToken: data.code }).unwrap();
            if (result) nextModal(email);
        } catch (error) {
            resetField('code');
            verificationCodeErrorHandler(error as ErrorResponse, setError, setHeaderText);
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
            data-test-id={DATA_TEST_IDS.VERIFICATION_CODE_MODAL}
        />
    );
};
