import { useNavigate } from 'react-router';

import { useAppDispatch } from '~/store/hooks';
import { setCurrentRecipe } from '~/store/recipe-slice';
import { Recipe } from '~/types';
import { routeHelpers } from '~/utils/get-routes';

export const useEditRecipe = (isDraft?: boolean) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleEdit = (recipe: Partial<Recipe>, category?: string, subCategory?: string) => {
        dispatch(setCurrentRecipe(recipe));
        if (!recipe._id) return;
        if (isDraft) {
            navigate(routeHelpers.getEditDraftPath(recipe._id));
        } else {
            if (!category || !subCategory) return;
            navigate(routeHelpers.getEditRecipePath(category, subCategory, recipe._id));
        }
    };
    return { handleEdit };
};
