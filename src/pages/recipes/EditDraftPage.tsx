import { Box } from '@chakra-ui/react';

import { Form } from '~/components/shared/recipeForm/Form';
import { useRecipeSubmit } from '~/hooks/use-recipe-submit';
import { useAppSelector } from '~/store/hooks';
import { draftSelector } from '~/store/recipe-slice';

export const EditDraftPage = () => {
    const draft = useAppSelector(draftSelector);
    const { isFormValid, setIsFormValid, handlePublish, handleDraftUpdate } = useRecipeSubmit();

    if (!draft) return null;
    return (
        <Box as='main' px={{ base: 4, sm: 5, md: 6 }} pt={14} pb={{ base: 4, md: 8 }}>
            <Form
                isFormValid={isFormValid}
                setIsFormValid={setIsFormValid}
                onSave={handleDraftUpdate}
                onSubmit={handlePublish}
                data={draft}
            />
        </Box>
    );
};
