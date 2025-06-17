import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

import { Form } from '~/components/shared/recipeForm/Form';
import { NOTIFICATION_MESSAGES } from '~/constants/notification-config';
import { useRecipeSubmit } from '~/hooks/use-recipe-submit';
import { useToast } from '~/hooks/use-toast';
import { useGetRecipeByIdQuery } from '~/query/recipe-api';
import { setCurrentRecipe } from '~/store/recipe-slice';

export const EditRecipePage = () => {
    const { recipeId: id } = useParams();
    const { showError } = useToast();
    const { data: recipe, isError } = useGetRecipeByIdQuery(id || '', { skip: !id });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { handleSaveDraft, handleRecipeUpdate, setIsFormValid, isFormValid } = useRecipeSubmit();

    useEffect(() => {
        if (isError) {
            showError(NOTIFICATION_MESSAGES.SERVER_ERROR);
            navigate(-1);
        }
    }, [isError, showError, navigate]);

    useEffect(() => {
        if (recipe) dispatch(setCurrentRecipe(recipe));
    }, [recipe]);

    if (!recipe) return null;

    return (
        <Box as='main' px={{ base: 4, sm: 5, md: 6 }} pt={14} pb={{ base: 4, md: 8 }}>
            <Form
                setIsFormValid={setIsFormValid}
                isFormValid={isFormValid}
                onSave={handleSaveDraft}
                onSubmit={handleRecipeUpdate}
                data={recipe}
            />
        </Box>
    );
};
