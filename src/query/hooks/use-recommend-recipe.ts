import { NOTIFICATION_MESSAGES } from '~/constants/notification-config';
import { useToast } from '~/hooks/use-toast';

import { useRecommendRecipeMutation } from '../recipe-api';

export const useRecommendRecipe = () => {
    const [recommendRecipe] = useRecommendRecipeMutation();
    const { showError } = useToast();

    const handleRecommendRecipe = async (id?: string) => {
        if (!id) return;
        try {
            await recommendRecipe(id).unwrap();
        } catch {
            showError(NOTIFICATION_MESSAGES.SERVER_ERROR);
        }
    };

    return { handleRecommendRecipe };
};
