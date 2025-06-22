import { Grid } from '@chakra-ui/react';
import { useEffect } from 'react';

import { BookmarksList } from '~/components/shared/profile/BookmarksList';
import { Hero } from '~/components/shared/profile/Hero';
import { NotesList } from '~/components/shared/profile/NotesList';
import { RecipesList } from '~/components/shared/profile/RecipesList';
import { useLazyGetRecipesByUserIdQuery } from '~/query/recipe-api';
import { useAppSelector } from '~/store/hooks';
import { selectCurrentUser } from '~/store/user-slice';

export const ProfilePage = () => {
    const profile = useAppSelector(selectCurrentUser);
    const [getRecipes, { data: recipes }] = useLazyGetRecipesByUserIdQuery();

    useEffect(() => {
        if (!profile) return;
        getRecipes(profile._id);
    }, [profile]);

    if (!profile || !recipes) return null;
    return (
        <Grid as='main' px={{ base: 4, sm: 5, md: 6 }}>
            <Hero
                firstName={profile.firstName}
                lastName={profile.lastName}
                login={profile.login}
                avatar={profile.photoLink}
            />
            <Grid gap={{ base: 8, md: 10 }}>
                <RecipesList drafts={profile.drafts} recipes={recipes.recipes} />
                <NotesList notes={recipes.notes} />
                <BookmarksList bookmarks={recipes.myBookmarks} />
            </Grid>
        </Grid>
    );
};
