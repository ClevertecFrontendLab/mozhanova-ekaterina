import { ErrorResponse } from '~/types';

import { useSaveRemoveFromBookmarksMutation } from '../recipe-api';
import { useErrors } from './use-errors';

export const useSaveRecipe = () => {
    const [toggleSave] = useSaveRemoveFromBookmarksMutation();
    const { saveLikeRecipeErrorHandler } = useErrors();

    const handleSave = async (id?: string) => {
        if (!id) return;
        try {
            await toggleSave(id).unwrap();
        } catch (error) {
            saveLikeRecipeErrorHandler(error as ErrorResponse);
        }
    };

    return { handleSave };
};
