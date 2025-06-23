import { Grid, SimpleGrid } from '@chakra-ui/react';

import { PeopleIcon } from '~/components/ui/icons/PeopleIcon';
import { useAppSelector } from '~/store/hooks';
import { selectSubscribers } from '~/store/selectors';
import { getSubscribersText } from '~/utils/get-declension';

import { ProfileCard } from '../profile/ProfileCard';
import { StatisticsTitle } from './StatisticsTitle';

export const SubscribersList = () => {
    const subscribers = useAppSelector(selectSubscribers);

    return (
        <Grid gap={3}>
            <StatisticsTitle icon={<PeopleIcon />}>
                {getSubscribersText(subscribers.length)}
            </StatisticsTitle>
            {subscribers.length > 0 && (
                <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={3}>
                    {subscribers.map((subscriber) => (
                        <ProfileCard key={subscriber.id} {...subscriber} />
                    ))}
                </SimpleGrid>
            )}
        </Grid>
    );
};
