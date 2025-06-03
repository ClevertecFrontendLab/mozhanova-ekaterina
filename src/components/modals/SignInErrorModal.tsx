import { Grid, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import image from '~/assets/modals/3.png';
import { AppRoutes } from '~/constants/routes-config';
import { DATA_TEST_IDS } from '~/constants/test-ids';
import { useModalContext } from '~/contexts/modal-context';
import { useErrors } from '~/hooks/use-errors';
import { useSignInMutation } from '~/query/auth-api';
import { AuthUser, ErrorResponse, ModalParams } from '~/types';

import { UiButton } from '../ui/UiButton';
import { UiModal } from '../ui/UiModal';

export const SignInErrorModal = ({ params }: { params?: ModalParams<'signInError'> }) => {
    const navigate = useNavigate();
    const [signIn] = useSignInMutation();
    const { signInErrorModalHandler } = useErrors();
    const { isOpen, onClose } = useModalContext();

    const onSubmit = async (userData: AuthUser) => {
        try {
            const result = await signIn(userData).unwrap();
            if (result) {
                onClose();
                navigate(AppRoutes.HOME);
            }
        } catch (error: unknown) {
            signInErrorModalHandler(error as ErrorResponse, userData);
        }
    };
    return (
        <UiModal
            maxW={{ base: '316px', md: '396px' }}
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
                        onClick={() => onSubmit(params!.userData)}
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
