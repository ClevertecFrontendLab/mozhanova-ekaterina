import { Grid, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import image from '~/assets/modals/3.png';
import { AppRoutes } from '~/constants/routes-config';
import { DATA_TEST_IDS } from '~/constants/test-ids';
import { useErrorHandlers } from '~/hooks/use-error';
import { useSignInMutation } from '~/query/user-api';
import { AuthUser, ErrorResponse } from '~/types';

import { UiButton } from '../ui/UiButton';
import { UiModal } from '../ui/UiModal';

export const SignInErrorModal = ({
    isOpen,
    onClose,
    userData,
}: {
    isOpen: boolean;
    userData: AuthUser;
    onClose: () => void;
}) => {
    const navigate = useNavigate();
    const [signIn] = useSignInMutation();
    const { loginErrorHandler } = useErrorHandlers();

    const onSubmit = async (userData: { login: string; password: string }) => {
        try {
            const result = await signIn(userData).unwrap();
            if (result) {
                onClose();
                navigate(AppRoutes.HOME);
            }
        } catch (error: unknown) {
            loginErrorHandler(error as ErrorResponse, userData);
        }
    };
    return (
        <UiModal
            image={image}
            isOpen={isOpen}
            onClose={onClose}
            header='Вход не выполнен'
            body={
                <Text color='text.secondary'>
                    <p>Что-то пошло не так. </p>
                    <p>Попробуйте еще раз</p>
                </Text>
            }
            footer={
                <Grid w='100%'>
                    <UiButton
                        onClick={() => onSubmit(userData)}
                        data-test-id={DATA_TEST_IDS.REPEAT_BUTTON}
                        type='submit'
                        variant='solid'
                        text='Повторить'
                        size='lg'
                    />
                </Grid>
            }
            data-test-id={DATA_TEST_IDS.SIGN_IN_ERROR_MODAL}
        />
    );
};
