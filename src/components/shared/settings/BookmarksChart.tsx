import { Grid } from '@chakra-ui/react';

import { BookmarkSolidIcon } from '~/components/ui/icons/BookmarkSolidIcon';
import { UiChart } from '~/components/ui/UiChart';
import { useAppSelector } from '~/store/hooks';
import { selectStatisticsCounts } from '~/store/selectors';
import { selectStatistics } from '~/store/user-slice';
import { getChartData } from '~/utils/get-chart-data';
import { getBookmarksText } from '~/utils/get-declension';

import { StatisticsTitle } from '../settings/StatisticsTitle';

export const BookmarksChart = () => {
    const statistics = useAppSelector(selectStatistics);
    const bookmarksCount = useAppSelector(selectStatisticsCounts).bookmarks;

    if (!statistics) return null;

    const sortedBookmarks = [...statistics.bookmarks].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

    return (
        <Grid gap={3}>
            <StatisticsTitle icon={<BookmarkSolidIcon />}>
                {getBookmarksText(bookmarksCount)}
            </StatisticsTitle>
            {bookmarksCount ? <UiChart data={getChartData(sortedBookmarks)} /> : null}
        </Grid>
    );
};
