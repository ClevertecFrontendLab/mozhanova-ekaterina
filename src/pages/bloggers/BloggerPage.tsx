import { Flex, Grid } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router';

import { Hero } from '~/components/shared/blogs/Hero';
import { NotesList } from '~/components/shared/blogs/NotesList';
import { OtherBlogsList } from '~/components/shared/blogs/OtherBlogsList';
import { UiButton } from '~/components/ui/UiButton';
import { UiCardGrid } from '~/components/ui/UiCardGrid';
import { DATA_TEST_IDS } from '~/constants/test-ids';
import { useErrors } from '~/hooks/use-errors';
import { useLazyGetBloggerByIdQuery } from '~/query/blogs-api';
import { useLazyGetRecipesByUserIdQuery } from '~/query/recipe-api';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { selectCurrentUserId } from '~/store/selectors';
import { setBlogger } from '~/store/user-slice';
import { ErrorResponse, Recipe } from '~/types';

export const BloggerPage = () => {
    const { bloggerId } = useParams();
    const dispatch = useAppDispatch();
    const currentUserId = useAppSelector(selectCurrentUserId);
    const hash = useLocation().hash;
    const [notesElement, setNotesElement] = useState<HTMLElement | null>(null);
    const { loadBloggerAndRecipesErrorHandler } = useErrors();
    const showMoreRef = useRef<HTMLButtonElement>(null);
    const [recipesToShow, setRecipesToShow] = useState<Recipe[]>([]);

    const notesRef = (node: HTMLDivElement) => {
        if (node !== null) {
            setNotesElement(node);
        }
    };

    const [getBlogger, { data: blogger, error: bloggerError }] = useLazyGetBloggerByIdQuery();
    const [getRecipes, { data: recipes, error: recipesError }] = useLazyGetRecipesByUserIdQuery();

    const handleLoadData = async () => {
        getBlogger({ bloggerId, currentUserId });
        getRecipes({ bloggerId });
    };

    useEffect(() => {
        handleLoadData();
    }, [bloggerId, currentUserId]);

    useEffect(() => {
        if (recipes) {
            setRecipesToShow(recipes.recipes.slice(0, 8));
        }
    }, [recipes]);

    const handleShowMore = () => {
        if (recipes) setRecipesToShow(recipes.recipes);
        showMoreRef.current!.style.display = 'none';
    };

    useEffect(() => {
        if (bloggerError || recipesError) {
            loadBloggerAndRecipesErrorHandler([
                bloggerError as ErrorResponse,
                recipesError as ErrorResponse,
            ]);
        }
    }, [bloggerError, recipesError]);

    useEffect(() => {
        if (blogger) {
            dispatch(setBlogger(blogger.bloggerInfo));
        }
    }, [blogger, dispatch]);

    useEffect(() => {
        setTimeout(() => {
            if (hash === '#notes' && notesElement) {
                notesElement.scrollIntoView();
            }
        }, 100);
    }, [notesElement]);

    if (!blogger || !recipes) return null;
    return (
        <Grid
            as='main'
            gap={{ base: 8, md: 10 }}
            padding={{
                base: '16px',
                md: '32px 20px 0',
                lg: '32px 24px 0',
            }}
        >
            <>
                <Hero blogger={blogger} />
                <UiCardGrid dataTest={DATA_TEST_IDS.RECIPE_CARD_LIST} data={recipesToShow} />
                <Flex
                    justifyContent='center'
                    mt={4}
                    mb={10}
                    display={recipesToShow.length < recipes.recipes.length ? 'flex' : 'none'}
                >
                    <UiButton
                        // data-test-id={DATA_TEST_IDS.LOAD_MORE_BUTTON}
                        onClick={handleShowMore}
                        ref={showMoreRef}
                        size='md'
                        text='Загрузить еще'
                        variant='primary'
                    />
                </Flex>
            </>
            <NotesList ref={notesRef} notes={blogger.bloggerInfo.notes || []} />
            <OtherBlogsList currentUserId={currentUserId} />
        </Grid>
    );
};
