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
import { useModalContext } from '~/contexts/modal-context';
import { useErrors } from '~/hooks/use-errors';
import { useVerifyCodeMutation } from '~/query/user-api';
import { ErrorResponse, ModalParams } from '~/types';
import { VerificationCodeSchema } from '~/validation';

import { UiModal } from '../ui/UiModal';

export const VerificationCodeModal = ({ params }: { params?: ModalParams<'verificationCode'> }) => {
    const navigate = useNavigate();
    const { isOpen, onClose, showResetCredentials } = useModalContext();
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
        resolver: yupResolver(VerificationCodeSchema),
    });
    const { verificationCodeErrorHandler } = useErrors();
    const onSubmit = async (data: { code: string }) => {
        setHeaderText('');
        try {
            const result = await verifyCode({ email: params!.email, otpToken: data.code }).unwrap();
            if (result) showResetCredentials(params!.email);
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
            maxW={{ base: '316px', md: '396px' }}
            image={image}
            isOpen={isOpen}
            onClose={handleClose}
            header={headerText && <Text pb={4}>{headerText}</Text>}
            body={
                <>
                    <p>
                        Мы отправили вам на e-mail <br /> <b>{params!.email} </b> <br />
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
