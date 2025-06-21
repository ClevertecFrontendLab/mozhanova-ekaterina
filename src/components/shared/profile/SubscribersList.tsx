import { Grid } from '@chakra-ui/react';

import { PeopleIcon } from '~/components/ui/icons/PeopleIcon';

import { StatisticsTitle } from './StatisticsTitle';

export const SubscribersList = () => {
    console.log();

    return (
        <Grid gap={3}>
            <StatisticsTitle icon={<PeopleIcon />}>12 подписчиков</StatisticsTitle>
        </Grid>
    );
};
