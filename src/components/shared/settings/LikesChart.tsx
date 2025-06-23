import { Grid } from '@chakra-ui/react';

import { EmojiHeartEyesSolidIcon } from '~/components/ui/icons/EmojiHeartEyesSolidIcon';
import { UiChart } from '~/components/ui/UiChart';
import { useAppSelector } from '~/store/hooks';
import { selectStatisticsCounts } from '~/store/selectors';
import { selectStatistics } from '~/store/user-slice';
import { getChartData } from '~/utils/get-chart-data';
import { getLikesText } from '~/utils/get-declension';

import { StatisticsTitle } from '../settings/StatisticsTitle';

export const LikesChart = () => {
    const statistics = useAppSelector(selectStatistics);
    const likesCount = useAppSelector(selectStatisticsCounts).likes;

    if (!statistics) return null;
    return (
        <Grid gap={3}>
            <StatisticsTitle icon={<EmojiHeartEyesSolidIcon />}>
                {getLikesText(likesCount)}
            </StatisticsTitle>
            {likesCount ? (
                <UiChart colorScheme='purple' data={getChartData(statistics.likes)} />
            ) : null}
        </Grid>
    );
};
