import { Grid } from '@chakra-ui/react';

import { Hero } from '~/components/shared/profile/Hero';
import { useGetProfileQuery } from '~/query/user-api';

export const ProfilePage = () => {
    const { data: profile } = useGetProfileQuery();

    if (!profile) return null;
    return (
        <Grid as='main' px={{ base: 4, sm: 5, md: 6 }}>
            <Hero
                firstName={profile?.firstName}
                lastName={profile?.lastName}
                login={profile?.login}
            />
            <Grid gap={40}>
                {/* <RecipesList /> */}
                {/* <NotesList /> */}
                {/* <BookmarksList /> */}
            </Grid>
        </Grid>
    );
};
