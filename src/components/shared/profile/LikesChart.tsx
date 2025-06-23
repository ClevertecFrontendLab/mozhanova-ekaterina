import { Grid } from '@chakra-ui/react';

import { EmojiHeartEyesSolidIcon } from '~/components/ui/icons/EmojiHeartEyesSolidIcon';
import { UiChart } from '~/components/ui/UiChart';
import { useAppSelector } from '~/store/hooks';
import { selectStatisticsCounts } from '~/store/selectors';
import { selectStatistics } from '~/store/user-slice';
import { getLikesText } from '~/utils/get-declension';

import { StatisticsTitle } from './StatisticsTitle';

export const LikesChart = () => {
    const statistics = useAppSelector(selectStatistics);
    const likes = useAppSelector(selectStatisticsCounts).likes;

    if (!statistics) return null;
    return (
        <Grid gap={3}>
            <StatisticsTitle icon={<EmojiHeartEyesSolidIcon />}>
                {getLikesText(likes)}
            </StatisticsTitle>
            {likes ? <UiChart colorScheme='purple' data={statistics.likes} /> : null}
        </Grid>
    );
};
