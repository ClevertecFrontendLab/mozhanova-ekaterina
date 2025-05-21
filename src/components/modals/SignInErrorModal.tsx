import { Grid } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import image from '~/assets/modals/3.png';
import { AppRoutes } from '~/config';
import { useToast } from '~/hooks/use-toast';
import { useSignInMutation } from '~/query/user-api';
import { TErrorResponse } from '~/types';

import { UiButton } from '../ui/UiButton';
import { UiModal } from '../ui/UiModal';

export const SignInErrorModal = ({
    isOpen,
    onClose,
    userData,
    next,
}: {
    isOpen: boolean;
    userData: { login: string; password: string };
    onClose: () => void;
    next: (userData: { login: string; password: string }) => void;
}) => {
    const navigate = useNavigate();
    const { showError } = useToast();
    const [signIn] = useSignInMutation();

    const onSubmit = async (userData: { login: string; password: string }) => {
        try {
            const result = await signIn(userData).unwrap();
            if (result) {
                onClose();
                navigate(AppRoutes.HOME);
            }
        } catch (error: unknown) {
            const response = error as TErrorResponse;
            switch (response.status) {
                case 401:
                    showError(
                        'Неверный логин или пароль',
                        'Попробуйте снова',
                        15000,
                        'bottom-left',
                    );
                    break;
                case 403:
                    showError(
                        'E-mail не верифицирован',
                        'Проверьте почту и перейдите по ссылке',
                        15000,
                        'bottom-left',
                    );
                    break;
                default:
                    next(userData);
                    break;
            }
        }
    };
    return (
        <UiModal
            image={image}
            isOpen={isOpen}
            onClose={onClose}
            header='Вход не выполнен'
            body='Что-то пошло не так. Попробуйте еще раз'
            footer={
                <Grid w='100%'>
                    <UiButton
                        onClick={() => onSubmit(userData)}
                        data-test-id='repeat-button'
                        type='submit'
                        variant='solid'
                        text='Повторить'
                        size='lg'
                    />
                </Grid>
            }
            data-test-id='sign-in-error-modal'
        />
    );
};
