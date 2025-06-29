import { useLikeUnlikeRecipeMutation } from '~/query/recipe-api';
import { ErrorResponse } from '~/types';

import { useErrors } from './use-errors';

export const useLikeRecipe = () => {
    const [likeRecipe] = useLikeUnlikeRecipeMutation();
    const { saveLikeRecipeErrorHandler } = useErrors();

    const handleLike = async (id?: string) => {
        if (!id) return;
        try {
            await likeRecipe(id).unwrap();
        } catch (error) {
            saveLikeRecipeErrorHandler(error as ErrorResponse);
        }
    };

    return { handleLike };
};
