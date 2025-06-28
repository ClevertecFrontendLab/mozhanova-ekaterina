import { useState } from 'react';
import { ErrorResponse, useNavigate } from 'react-router';

import { NOTIFICATION_MESSAGES } from '~/constants/notification-config';
import { AppRoutes } from '~/constants/routes-config';
import { useRoutes } from '~/hooks/use-routes';
import { useToast } from '~/hooks/use-toast';
import { useErrors } from '~/query/hooks/use-errors';
import {
    useCreateRecipeDraftMutation,
    useCreateRecipeMutation,
    useUpdateDraftMutation,
    useUpdateRecipeMutation,
} from '~/query/recipe-api';
import { NewRecipe, Recipe, RecipeDraft, RecipeDraftDto } from '~/types';
import { RecipeDraftSchema, RecipePublishSchema } from '~/validation';

export const useRecipeSubmit = () => {
    const [createRecipe] = useCreateRecipeMutation();
    const [saveDraft] = useCreateRecipeDraftMutation();
    const [updateRecipe] = useUpdateRecipeMutation();
    const [updateDraft] = useUpdateDraftMutation();
    const { getRecipePath } = useRoutes();
    const navigate = useNavigate();
    const [isFormValid, setIsFormValid] = useState(true);
    const { showSuccess } = useToast();
    const { createRecipeErrorHandler, createDraftRecipeErrorHandler } = useErrors();

    const handlePublish = async (recipe: Partial<NewRecipe>) => {
        const isValid = await RecipePublishSchema.isValid(recipe);
        setIsFormValid(isValid);
        if (!isValid) return;
        try {
            const data = await RecipePublishSchema.validate(recipe);
            const response = await createRecipe(data).unwrap();
            showSuccess(NOTIFICATION_MESSAGES.CREATE_RECIPE_SUCCESS);
            navigate(getRecipePath(response.categoriesIds, response._id));
        } catch (error) {
            createRecipeErrorHandler(error as ErrorResponse);
        }
    };

    const handleRecipeUpdate = async (recipe: Partial<NewRecipe>) => {
        const isValid = await RecipePublishSchema.isValid(recipe);
        setIsFormValid(isValid);
        if (!isValid) return;
        try {
            const data = await RecipePublishSchema.validate(recipe);
            const response = await updateRecipe(data as Recipe).unwrap();
            showSuccess(NOTIFICATION_MESSAGES.CREATE_RECIPE_SUCCESS);
            navigate(getRecipePath(response.categoriesIds, response._id));
        } catch (error) {
            createRecipeErrorHandler(error as ErrorResponse);
        }
    };

    const handleDraftUpdate = async (recipe: Partial<NewRecipe>) => {
        const isValid = await RecipeDraftSchema.isValid(recipe);
        setIsFormValid(isValid);
        if (!isValid) return;
        try {
            const data = await RecipeDraftSchema.validate(recipe);
            await updateDraft(data as RecipeDraftDto).unwrap();
            showSuccess(NOTIFICATION_MESSAGES.CREATE_RECIPE_DRAFT_SUCCESS);
            navigate(AppRoutes.PROFILE);
        } catch (error) {
            createDraftRecipeErrorHandler(error as ErrorResponse);
        }
    };

    const handleSaveDraft = async (recipe: Partial<NewRecipe>) => {
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

    return {
        handlePublish,
        handleSaveDraft,
        handleRecipeUpdate,
        handleDraftUpdate,
        isFormValid,
        setIsFormValid,
    };
};
