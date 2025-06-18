import { Box, Grid } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';

import { Hero } from '~/components/shared/blogs/Hero';
import { NotesList } from '~/components/shared/blogs/NotesList';
import { OtherBlogsList } from '~/components/shared/blogs/OtherBlogsList';
import { useErrors } from '~/hooks/use-errors';
import { useLazyGetBloggerByIdQuery } from '~/query/blogs-api';
import { useLazyGetRecipesByUserIdQuery } from '~/query/recipe-api';
import { setBlogger } from '~/store/blogs-slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { selectCurrentUserId } from '~/store/selectors';
import { ErrorResponse } from '~/types';

import { RecipesList } from './RecipesList';

export const BloggerPage = () => {
    const { bloggerId = '' } = useParams();
    const dispatch = useAppDispatch();
    const currentUserId = useAppSelector(selectCurrentUserId);
    const { hash } = useLocation();
    const [notesElement, setNotesElement] = useState<HTMLElement | null>(null);
    const { loadBloggerAndRecipesErrorHandler } = useErrors();

    const notesRef = (node: HTMLDivElement) => {
        if (node !== null) {
            setNotesElement(node);
        }
    };

    const [getBlogger, { data: blogger, error: bloggerError }] = useLazyGetBloggerByIdQuery();
    const [getRecipes, { data: recipes, error: recipesError }] = useLazyGetRecipesByUserIdQuery();

    const handleLoadData = async () => {
        getBlogger({ bloggerId: bloggerId, currentUserId });
        getRecipes(bloggerId);
    };

    useEffect(() => {
        if (bloggerId && currentUserId) handleLoadData();
    }, [bloggerId, currentUserId]);

    useEffect(() => {
        if (bloggerError || recipesError) {
            loadBloggerAndRecipesErrorHandler(
                (bloggerError as ErrorResponse) || (recipesError as ErrorResponse),
            );
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

    if (!blogger || !recipes?.recipes) return null;
    return (
        <Grid
            as='main'
            padding={{
                base: '16px',
                md: '32px 20px 0',
                lg: '32px 24px 0',
            }}
        >
            <Box mb={{ base: 6, md: 10 }}>
                <Hero blogger={blogger} />
            </Box>
            <Grid gap={{ base: 8, md: 10 }}>
                <RecipesList recipes={recipes.recipes} />
                <NotesList ref={notesRef} notes={blogger.bloggerInfo.notes || []} />
                <OtherBlogsList currentUserId={currentUserId} />
            </Grid>
        </Grid>
    );
};
