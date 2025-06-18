import { Box } from '@chakra-ui/react';

import { UiCardGrid } from '~/components/ui/UiCardGrid';
import { UiShowMoreButton } from '~/components/ui/UiShowMoreButton';
import { DATA_TEST_IDS } from '~/constants/test-ids';
import { useToggleRecipes } from '~/hooks/use-toggle-recipes';
import { Recipe } from '~/types';

export const RecipesList = ({ recipes }: { recipes: Recipe[] }) => {
    const { recipesToShow, handleShowMore, showMoreRef } = useToggleRecipes(recipes);
    return (
        <Box>
            <UiCardGrid dataTest={DATA_TEST_IDS.RECIPE_CARD_LIST} data={recipesToShow} />
            <UiShowMoreButton onShowMore={handleShowMore} ref={showMoreRef} />
        </Box>
    );
};
