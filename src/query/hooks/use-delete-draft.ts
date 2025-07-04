import { NOTIFICATION_MESSAGES } from '~/constants/notification-config';
import { useToast } from '~/hooks/use-toast';
import { ErrorResponse } from '~/types';

import { useDeleteDraftMutation } from '../recipe-api';
import { useErrors } from './use-errors';

export const useDeleteDraft = () => {
    const [deleteDraft] = useDeleteDraftMutation();
    const { deleteRecipeErrorHandler } = useErrors();
    const { showSuccess } = useToast();

    const handleDelete = async (id?: string) => {
        if (!id) return;
        try {
            await deleteDraft(id).unwrap();
            showSuccess(NOTIFICATION_MESSAGES.DELETE_DRAFT_SUCCESS);
        } catch (error) {
            deleteRecipeErrorHandler(error as ErrorResponse);
        }
    };

    return { handleDelete };
};
