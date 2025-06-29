import { Grid } from '@chakra-ui/react';

import { SectionTitle } from '../profile/SectionTitle';
import { BookmarksChart } from './BookmarksChart';
import { LikesChart } from './LikesChart';
import { SubscribersList } from './SubscribersList';

export const Statistics = () => (
    <Grid gap={4}>
        <SectionTitle>Статистика</SectionTitle>
        <SubscribersList />
        <BookmarksChart />
        <LikesChart />
    </Grid>
);
