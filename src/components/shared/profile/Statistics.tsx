import { Grid } from '@chakra-ui/react';

import { StatisticDto } from '~/types';

import { SectionTitle } from '../settings/SectionTitle';
import { SubscribersList } from './SubscribersList';

export const Statistics = ({ statistics }: { statistics?: StatisticDto }) => {
    console.log('statistics', statistics);

    return (
        <Grid gap={4}>
            <SectionTitle>Статистика</SectionTitle>
            <SubscribersList />
            {/* <BookmarksChart/> */}
            {/* <LikesChart/> */}
        </Grid>
    );
};
