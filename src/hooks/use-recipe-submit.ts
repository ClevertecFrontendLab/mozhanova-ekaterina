import { useState } from 'react';
import { ErrorResponse, useNavigate } from 'react-router';

import { NOTIFICATION_MESSAGES } from '~/constants/notification-config';
import { AppRoutes } from '~/constants/routes-config';
import { useErrors } from '~/hooks/use-errors';
import { useRoutes } from '~/hooks/use-routes';
import { useToast } from '~/hooks/use-toast';
import {
    useCreateRecipeDraftMutation,
    useCreateRecipeMutation,
    useUpdateRecipeMutation,
} from '~/query/recipe-api';
import { NewRecipe, Recipe, RecipeDraft } from '~/types';
import { RecipeDraftSchema, RecipePublishSchema } from '~/validation';

export const useRecipeSubmit = () => {
    const [createRecipe] = useCreateRecipeMutation();
    const [saveDraft] = useCreateRecipeDraftMutation();
    const [updateRecipe] = useUpdateRecipeMutation();
    const { getRecipePath } = useRoutes();
    const navigate = useNavigate();
    const [isFormValid, setIsFormValid] = useState(true);
    const { showSuccess } = useToast();
    const { createRecipeErrorHandler, createDraftRecipeErrorHandler } = useErrors();

    const handleSubmit = async (recipe: NewRecipe) => {
        const isValid = await RecipePublishSchema.isValid(recipe);
        setIsFormValid(isValid);
        if (!isValid) return;
        try {
            const response = await createRecipe(recipe).unwrap();
            showSuccess(NOTIFICATION_MESSAGES.CREATE_RECIPE_SUCCESS);
            navigate(getRecipePath(response.categoriesIds, response._id));
        } catch (error) {
            createRecipeErrorHandler(error as ErrorResponse);
        }
    };

    const handleRecipeUpdate = async (recipe: NewRecipe) => {
        const isValid = await RecipePublishSchema.isValid(recipe);
        setIsFormValid(isValid);
        if (!isValid) return;
        try {
            const response = await updateRecipe(recipe as Recipe).unwrap();
            showSuccess(NOTIFICATION_MESSAGES.CREATE_RECIPE_SUCCESS);
            navigate(getRecipePath(response.categoriesIds, response._id));
        } catch (error) {
            createRecipeErrorHandler(error as ErrorResponse);
        }
    };

    const handleSaveDraft = async (recipe: RecipeDraft) => {
        const isValid = await RecipeDraftSchema.isValid(recipe);

        setIsFormValid(isValid);
        if (!isValid) return;
        try {
            const data = (await RecipeDraftSchema.validate(recipe)) as RecipeDraft;
            await saveDraft(data).unwrap();
            showSuccess(NOTIFICATION_MESSAGES.CREATE_RECIPE_DRAFT_SUCCESS);
            navigate(AppRoutes.HOME);
        } catch (error) {
            createDraftRecipeErrorHandler(error as ErrorResponse);
        }
    };

    return { handleSubmit, handleSaveDraft, handleRecipeUpdate, isFormValid, setIsFormValid };
};
