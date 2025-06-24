import { Box, Grid } from '@chakra-ui/react';

import { About } from '~/components/shared/profile/About';
import { DeleteAccount } from '~/components/shared/settings/DeleteAccount';
import { Hero } from '~/components/shared/settings/Hero';
import { RecommendationAnnouncement } from '~/components/shared/settings/RecommendationAnnouncement';
import { SettingsForm } from '~/components/shared/settings/SettingsForm';
import { Statistics } from '~/components/shared/settings/Statistics';
import { StatisticsTitle } from '~/components/shared/settings/StatisticsTitle';
import { ThumbUpIcon } from '~/components/ui/icons/ThumbUpIcon';
import { DATA_TEST_IDS } from '~/constants/test-ids';
import { useAppSelector } from '~/store/hooks';
import { selectRecommenderProfile, selectStatisticsCounts } from '~/store/selectors';
import { selectCurrentUser } from '~/store/user-slice';
import { getRecommendationsText } from '~/utils/get-declension';

export const SettingsPage = () => {
    const profile = useAppSelector(selectCurrentUser);
    const recommenderProfile = useAppSelector(selectRecommenderProfile);
    const recommendationsCount = useAppSelector(selectStatisticsCounts).recommendationsCount;

    if (!profile) return null;
    return (
        <Grid p={{ base: 4, lg: 6 }} px={{ md: 5 }} pb={{ lg: 0 }} gap={{ base: 4, md: 10 }}>
            <Grid gap={4}>
                <Hero avatar={profile.photoLink} />
                <SettingsForm profile={profile} />
            </Grid>
            <Statistics />
            {recommenderProfile && (
                <Box data-test-id={DATA_TEST_IDS.SETTINGS_RECOMMENDATION_INFO_BLOCK}>
                    <RecommendationAnnouncement />
                    <StatisticsTitle icon={<ThumbUpIcon />}>
                        {getRecommendationsText(recommendationsCount)}
                    </StatisticsTitle>
                </Box>
            )}
            <About />
            <DeleteAccount />
        </Grid>
    );
};
