import { Grid, Heading, Text } from '@chakra-ui/react';

import { UiCardGrid } from '~/components/ui/UiCardGrid';
import { UiShowMoreButton } from '~/components/ui/UiShowMoreButton';
import { useToggleRecipes } from '~/hooks/use-toggle-recipes';
import { Recipe } from '~/types';

export const BookmarksList = ({ bookmarks = [] }: { bookmarks?: Recipe[] }) => {
    const { handleShowMore, recipesToShow, showMoreRef, hasMore } = useToggleRecipes(bookmarks);

    return (
        <Grid gap={4}>
            <Heading display='flex' gap={8} fontSize={{ base: '18px', md: '20px' }}>
                <span>
                    Мои закладки <wbr />
                    <Text as='span' color='text.secondary' fontWeight={400}>
                        ({bookmarks.length})
                    </Text>
                </span>
            </Heading>
            <UiCardGrid isBookmark data={recipesToShow} />
            {hasMore && <UiShowMoreButton onShowMore={handleShowMore} ref={showMoreRef} />}
        </Grid>
    );
};
