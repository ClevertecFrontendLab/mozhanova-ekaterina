import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ErrorResponse, useNavigate, useParams } from 'react-router';

import { Form } from '~/components/recipeForm/Form';
import { NOTIFICATION_MESSAGES } from '~/constants/notification-config';
import { AppRoutes } from '~/constants/routes-config';
import { useErrors } from '~/hooks/use-errors';
import { useRoutes } from '~/hooks/use-routes';
import { useToast } from '~/hooks/use-toast';
import {
    useCreateRecipeDraftMutation,
    useGetRecipeByIdQuery,
    useUpdateRecipeMutation,
} from '~/query/recipe-api';
import { setCurrentRecipe } from '~/store/recipe-slice';
import { NewRecipe, Recipe, RecipeDraft } from '~/types';
import { RecipeDraftSchema } from '~/validation';

export const EditRecipePage = () => {
    const { id } = useParams();
    const { getRecipePath } = useRoutes();
    const { showError, showSuccess } = useToast();
    const [formData, setFormData] = useState<Recipe | null>(null);
    const { data: recipe, isError } = useGetRecipeByIdQuery(id || '', { skip: !id });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { createRecipeErrorHandler, createDraftRecipeErrorHandler } = useErrors();
    const [isFormValid, setIsFormValid] = useState(true);
    const [updateRecipe] = useUpdateRecipeMutation();
    const [saveDraft] = useCreateRecipeDraftMutation();

    const handleSubmit = async (recipe: NewRecipe) => {
        try {
            const response = await updateRecipe(recipe as Recipe).unwrap();
            showSuccess(NOTIFICATION_MESSAGES.CREATE_RECIPE_SUCCESS);
            navigate(getRecipePath(response.categoriesIds, response._id));
        } catch (error) {
            createRecipeErrorHandler(error as ErrorResponse);
        }
    };
    const handleSaveDraft = async (recipe: RecipeDraft) => {
        const isDraftValid = await RecipeDraftSchema.isValid(recipe);

        setIsFormValid(isDraftValid);
        if (!isDraftValid) return;
        try {
            const data = (await RecipeDraftSchema.validate(recipe)) as RecipeDraft;
            await saveDraft(data).unwrap();
            showSuccess(NOTIFICATION_MESSAGES.CREATE_RECIPE_DRAFT_SUCCESS);
            navigate(AppRoutes.HOME);
        } catch (error) {
            createDraftRecipeErrorHandler(error as ErrorResponse);
        }
    };

    useEffect(() => {
        if (isError) {
            showError(NOTIFICATION_MESSAGES.SERVER_ERROR);
            navigate(-1);
        }
    }, [isError, showError, navigate]);

    useEffect(() => {
        if (recipe) dispatch(setCurrentRecipe(recipe));
        setFormData(recipe as Recipe);
    }, [recipe]);

    if (!formData) return null;

    return (
        <Box as='main' px={{ base: 4, sm: 5, md: 6 }} pt={14} pb={{ base: 4, md: 8 }}>
            <Form
                isDraftValid={isFormValid}
                onSave={handleSaveDraft}
                onSubmit={handleSubmit}
                data={formData}
            />
        </Box>
    );
};
