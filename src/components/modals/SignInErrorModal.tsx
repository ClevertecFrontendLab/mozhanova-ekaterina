import { Grid } from '@chakra-ui/react';

import { UiButton } from '../ui/UiButton';
import { UiModal } from '../ui/UiModal';

export const SignInErrorModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
    <UiModal
        image='/src/assets/modals/3.png'
        isOpen={isOpen}
        onClose={onClose}
        header='Вход не выполнен'
        body='Что-то пошло не так. Попробуйте еще раз'
        footer={
            <Grid w='100%'>
                <UiButton
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
