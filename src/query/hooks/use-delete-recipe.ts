import { ErrorResponse } from 'react-router';

import { NOTIFICATION_MESSAGES } from '~/constants/notification-config';
import { useToast } from '~/hooks/use-toast';

import { useDeleteRecipeMutation } from '../recipe-api';
import { useErrors } from './use-errors';

export const useDeleteRecipe = () => {
    const { showSuccess } = useToast();
    const { deleteRecipeErrorHandler } = useErrors();
    const [deleteRecipe] = useDeleteRecipeMutation();

    const handleDelete = async (id?: string) => {
        if (!id) return;
        try {
            await deleteRecipe(id).unwrap();
            showSuccess(NOTIFICATION_MESSAGES.DELETE_RECIPE_SUCCESS);
        } catch (error) {
            deleteRecipeErrorHandler(error as ErrorResponse);
        }
    };

    return { handleDelete };
};
