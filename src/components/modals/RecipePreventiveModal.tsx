import { EditIcon } from '@chakra-ui/icons';
import { Grid } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import image from '~/assets/modals/3.png';
import { NOTIFICATION_MESSAGES } from '~/constants/notification-config';
import { AppRoutes } from '~/constants/routes-config';
import { DATA_TEST_IDS } from '~/constants/test-ids';
import { useModalContext } from '~/contexts/modal-context';
import { useErrors } from '~/hooks/use-errors';
import { useToast } from '~/hooks/use-toast';
import { useCreateRecipeDraftMutation } from '~/query/recipe-api';
import { ErrorResponse, ModalParams, RecipeDraft } from '~/types';
import { RecipeDraftSchema } from '~/validation';

import { UiButton } from '../ui/UiButton';
import { UiModal } from '../ui/UiModal';

export const RecipePreventiveModal = ({ params }: { params?: ModalParams<'recipePreventive'> }) => {
    const { isOpen, onClose } = useModalContext();
    const [saveDraft] = useCreateRecipeDraftMutation();
    const { createDraftRecipeErrorHandler } = useErrors();
    const { showSuccess } = useToast();
    const navigate = useNavigate();

    const handleSave = async () => {
        const isValid = await RecipeDraftSchema.isValid(params?.draft);
        if (!isValid) return;
        try {
            const data = (await RecipeDraftSchema.validate(params?.draft)) as RecipeDraft;
            await saveDraft(data).unwrap();
            showSuccess(NOTIFICATION_MESSAGES.CREATE_RECIPE_DRAFT_SUCCESS);
            onClose();
            navigate(params?.link || AppRoutes.HOME);
        } catch (error) {
            createDraftRecipeErrorHandler(error as ErrorResponse);
            onClose();
        }
    };
    const handleReset = () => {
        navigate(params?.link || AppRoutes.HOME);
        onClose();
    };
    return (
        <UiModal
            maxW={{ base: '316px', md: '396px' }}
            isOpen={isOpen}
            onClose={onClose}
            image={image}
            header='Выйти без сохранения?'
            body={
                <>
                    <p>Чтобы сохранить, нажмите кнопку</p>
                    <p>сохранить черновик</p>
                </>
            }
            footer={
                <Grid w='100%' gap={4}>
                    <UiButton
                        onClick={handleSave}
                        size='lg'
                        variant='solid'
                        text='Сохранить черновик'
                        leftIcon={<EditIcon />}
                    />
                    <UiButton
                        onClick={handleReset}
                        size='lg'
                        variant='ghost'
                        text='Выйти без сохранения'
                    />
                </Grid>
            }
            data-test-id={DATA_TEST_IDS.RECIPE_PREVENTIVE_MODAL}
        />
    );
};
