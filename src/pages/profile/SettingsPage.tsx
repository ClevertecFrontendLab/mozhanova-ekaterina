import { Grid } from '@chakra-ui/react';

import { Hero } from '~/components/shared/settings/Hero';
import { SettingsForm } from '~/components/shared/settings/SettingsForm';
import { useGetProfileQuery } from '~/query/user-api';

export const SettingsPage = () => {
    const { data: profile } = useGetProfileQuery();
    // const { data: statistics } = useGetStatisticsQuery();

    if (!profile) return null;
    return (
        <Grid p={{ base: 4, lg: 6 }} px={{ md: 5 }} pb={{ lg: 0 }} gap={{ base: 4 }}>
            <Hero firstName={profile?.firstName} lastName={profile?.lastName} />
            <SettingsForm profile={profile} />
            {/* <Statistics/> */}
        </Grid>
    );
};
