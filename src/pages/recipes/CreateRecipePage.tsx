import { Box } from '@chakra-ui/react';

import { Form } from '~/components/shared/recipeForm/Form';
import { useRecipeSubmit } from '~/hooks/use-recipe-submit';

export const CreateRecipePage = () => {
    const { setIsFormValid, isFormValid, handleSubmit, handleSaveDraft } = useRecipeSubmit();

    return (
        <Box as='main' px={{ base: 4, sm: 5, md: 6 }} pt={14} pb={{ base: 4, md: 8 }}>
            <Form
                setIsFormValid={setIsFormValid}
                isFormValid={isFormValid}
                onSubmit={handleSubmit}
                onSave={handleSaveDraft}
            />
        </Box>
    );
};
