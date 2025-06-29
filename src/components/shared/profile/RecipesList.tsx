import { Box, Grid, Heading, Text } from '@chakra-ui/react';

import { UiCardGrid } from '~/components/ui/UiCardGrid';
import { UiShowMoreButton } from '~/components/ui/UiShowMoreButton';
import { DATA_TEST_IDS } from '~/constants/test-ids';
import { useToggleMyRecipes } from '~/hooks/use-toggle-my-recipes';
import { Recipe, RecipeDraftDto } from '~/types';

export const RecipesList = ({
    recipes = [],
    drafts = [],
}: {
    recipes?: Recipe[];
    drafts?: RecipeDraftDto[];
}) => {
    const { draftsToShow, recipesToShow, handleShowMore, showMoreRef } = useToggleMyRecipes(
        recipes,
        drafts,
    );

    return (
        <Grid data-test-id={DATA_TEST_IDS.USER_PROFILE_RECIPES} gap={4}>
            <Heading display='flex' gap={8} fontSize={{ base: '18px', md: '20px' }}>
                <span>
                    Мои рецепты <wbr />
                    <Text as='span' color='text.secondary' fontWeight={400}>
                        ({recipes.length})
                    </Text>
                </span>
                {drafts.length > 0 && (
                    <span>
                        Черновики <wbr />
                        <Text as='span' color='text.secondary' fontWeight={400}>
                            ({drafts.length})
                        </Text>
                    </span>
                )}
            </Heading>
            <Box>
                <UiCardGrid editable isDraft data={draftsToShow} />
                <UiCardGrid editable data={recipesToShow} />
                <UiShowMoreButton
                    text='/загрузить ещё/i'
                    onShowMore={handleShowMore}
                    ref={showMoreRef}
                />
            </Box>
        </Grid>
    );
};
