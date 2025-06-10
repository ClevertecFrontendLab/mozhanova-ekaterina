import { Box } from '@chakra-ui/react';
import { useState } from 'react';
import { ErrorResponse, useNavigate } from 'react-router';

import { Form } from '~/components/recipeForm/Form';
import { NOTIFICATION_MESSAGES } from '~/constants/notification-config';
import { AppRoutes } from '~/constants/routes-config';
import { useErrors } from '~/hooks/use-errors';
import { useRoutes } from '~/hooks/use-routes';
import { useToast } from '~/hooks/use-toast';
import { useCreateRecipeDraftMutation, useCreateRecipeMutation } from '~/query/recipe-api';
import { NewRecipe, RecipeDraft } from '~/types';
import { RecipeDraftSchema } from '~/validation';

export const CreateRecipePage = () => {
    const { createRecipeErrorHandler, createDraftRecipeErrorHandler } = useErrors();
    const { showSuccess } = useToast();
    const navigate = useNavigate();
    const { getRecipePath } = useRoutes();
    const [createRecipe] = useCreateRecipeMutation();
    const [saveDraft] = useCreateRecipeDraftMutation();
    const [isDraftValid, setIsDraftValid] = useState(true);

    const handleSubmit = async (data: NewRecipe) => {
        try {
            const response = await createRecipe(data).unwrap();
            showSuccess(NOTIFICATION_MESSAGES.CREATE_RECIPE_SUCCESS);
            navigate(getRecipePath(response.categoriesIds, response._id));
        } catch (error) {
            createRecipeErrorHandler(error as ErrorResponse);
        }
    };

    const handleSaveDraft = async (recipe: RecipeDraft) => {
        const isValid = await RecipeDraftSchema.isValid(recipe);

        setIsDraftValid(isValid);
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

    return (
        <Box as='main' px={{ base: 4, sm: 5, md: 6 }} pt={14} pb={{ base: 4, md: 8 }}>
            <Form isDraftValid={isDraftValid} onSubmit={handleSubmit} onSave={handleSaveDraft} />
        </Box>
    );
};
