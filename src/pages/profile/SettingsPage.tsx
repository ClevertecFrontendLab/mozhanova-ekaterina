import { Grid } from '@chakra-ui/react';

import { About } from '~/components/shared/profile/About';
import { DeleteAccount } from '~/components/shared/settings/DeleteAccount';
import { Hero } from '~/components/shared/settings/Hero';
import { SettingsForm } from '~/components/shared/settings/SettingsForm';
import { Statistics } from '~/components/shared/settings/Statistics';
import { useAppSelector } from '~/store/hooks';
import { selectCurrentUser } from '~/store/user-slice';

export const SettingsPage = () => {
    const profile = useAppSelector(selectCurrentUser);

    if (!profile) return null;
    return (
        <Grid p={{ base: 4, lg: 6 }} px={{ md: 5 }} pb={{ lg: 0 }} gap={{ base: 4, md: 10 }}>
            <Grid gap={4}>
                <Hero avatar={profile.photoLink} />
                <SettingsForm profile={profile} />
            </Grid>
            <Statistics />
            <About />
            <DeleteAccount />
        </Grid>
    );
};
