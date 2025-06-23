import { Grid } from '@chakra-ui/react';

import { BookmarkSolidIcon } from '~/components/ui/icons/BookmarkSolidIcon';
import { UiChart } from '~/components/ui/UiChart';
import { useAppSelector } from '~/store/hooks';
import { selectStatisticsCounts } from '~/store/selectors';
import { selectStatistics } from '~/store/user-slice';
import { getBookmarksText } from '~/utils/get-declension';

import { StatisticsTitle } from './StatisticsTitle';

export const BookmarksChart = () => {
    const statistics = useAppSelector(selectStatistics);
    const bookmarks = useAppSelector(selectStatisticsCounts).bookmarks;

    if (!statistics) return null;
    return (
        <Grid gap={3}>
            <StatisticsTitle icon={<BookmarkSolidIcon />}>
                {getBookmarksText(bookmarks)}
            </StatisticsTitle>
            {bookmarks ? <UiChart data={statistics.bookmarks} /> : null}
        </Grid>
    );
};
