import { Grid, Link } from '@chakra-ui/react';

import image from '~/assets/modals/3.png';
import { useModalContext } from '~/contexts/modal-context';
import { ModalParams } from '~/types';

import { UiButton } from '../ui/UiButton';
import { UiModal } from '../ui/UiModal';

export const DeleteProfileModal = ({ onDelete }: ModalParams<'deleteProfile'>) => {
    const { isOpen, onClose } = useModalContext();

    return (
        <UiModal
            image={image}
            maxW={{ base: '316px', md: '396px' }}
            isOpen={isOpen}
            onClose={onClose}
            header={
                <>
                    <p>Действительно хотите удалить свой аккаунт?</p>
                </>
            }
            body={
                <Grid gap={4} color='text.secondary'>
                    <p>
                        Если вы удалите аккаунт, вы больше не сможете всеми функциями сервиса,
                        которые вы использовали.
                    </p>
                    <p>Мы удалим все ваши опубликованные рецепты и записи в блоге.</p>
                </Grid>
            }
            footer={
                <Grid w='100%' gap={8}>
                    <UiButton
                        onClick={onDelete}
                        size='lg'
                        variant='solid'
                        text='Удалить мой аккаунт'
                    />
                    <p>
                        Остались вопросы?
                        <Link textDecoration='underline' href='#'>
                            <wbr /> с поддержкой
                        </Link>
                    </p>
                </Grid>
            }
        />
    );
};
