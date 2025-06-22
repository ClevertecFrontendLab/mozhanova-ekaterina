import { Grid } from '@chakra-ui/react';

import { Statistics } from '~/components/shared/profile/Statistics';
import { Hero } from '~/components/shared/settings/Hero';
import { SettingsForm } from '~/components/shared/settings/SettingsForm';
import { useAppSelector } from '~/store/hooks';
import { selectCurrentUser, selectStatistics } from '~/store/user-slice';

export const SettingsPage = () => {
    const profile = useAppSelector(selectCurrentUser);
    const statistics = useAppSelector(selectStatistics);

    if (!profile || !statistics) return null;
    return (
        <Grid p={{ base: 4, lg: 6 }} px={{ md: 5 }} pb={{ lg: 0 }} gap={{ base: 4, md: 10 }}>
            <Grid gap={4}>
                <Hero avatar={profile.photoLink} />
                <SettingsForm profile={profile} />
            </Grid>
            <Statistics statistics={statistics} />
        </Grid>
    );
};
