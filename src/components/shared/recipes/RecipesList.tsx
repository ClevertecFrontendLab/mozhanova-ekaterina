import { Box } from '@chakra-ui/react';

import { usePagination } from '~/hooks/use-pagination';
import { Recipe } from '~/types';

import { UiCardGrid } from '../../ui/UiCardGrid';
import { UiShowMoreButton } from '../../ui/UiShowMoreButton';

export const RecipesList = ({ recipes }: { recipes?: Recipe[] }) => {
    const { loadMore, hasMore, recipesToShow } = usePagination(recipes);

    return (
        <Box>
            <UiCardGrid data={recipesToShow.length ? recipesToShow : recipes} />
            {hasMore && <UiShowMoreButton onShowMore={loadMore} />}
        </Box>
    );
};
