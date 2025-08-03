import { Box, Flex } from '@chakra-ui/react';

import { BookmarkHeartIcon } from '~/components/ui/icons/BookmarkHeartIcon';
import { EmojiHeartEyesIcon } from '~/components/ui/icons/EmojiHeartEyesIcon';
import { PeopleIcon } from '~/components/ui/icons/PeopleIcon';
import { ThumbUpIcon } from '~/components/ui/icons/ThumbUpIcon';
import { DATA_TEST_IDS } from '~/constants/test-ids';
import { useAppSelector } from '~/store/hooks';
import { selectRecommenderProfile, selectStatisticsCounts } from '~/store/selectors';

export const ProfileStatistics = () => {
    const statistic = useAppSelector(selectStatisticsCounts);
    const isRecommenderProfile = useAppSelector(selectRecommenderProfile);

    if (Object.values(statistic).every((value) => value === 0)) return null;
    return (
        <Flex
            data-test-id={DATA_TEST_IDS.USER_STATS_BLOCK}
            direction={{
                base: 'row',
                md: 'column',
            }}
            gap={{
                base: 0,
                md: 6,
            }}
            fontSize={{
                base: '12px',
                md: '16px',
            }}
        >
            {isRecommenderProfile && (
                <ItemBox>
                    <Box color='neutral.400'>
                        <ThumbUpIcon />
                    </Box>
                    <div>{statistic.recommendationsCount}</div>
                </ItemBox>
            )}
            <ItemBox>
                <BookmarkHeartIcon />
                <div>{statistic.bookmarks}</div>
            </ItemBox>

            <ItemBox>
                <PeopleIcon />
                <div>{statistic.subscribersCount}</div>
            </ItemBox>

            <ItemBox>
                <EmojiHeartEyesIcon /> <div>{statistic.likes}</div>
            </ItemBox>
        </Flex>
    );
};

function ItemBox({ children }: { children: React.ReactNode }) {
    return (
        <Flex
            justifyContent='center'
            padding={{
                base: '4px 8px',
                md: '8px 16px',
            }}
            gap='10px'
            alignItems='center'
            fontWeight='600'
            color='primary.400'
        >
            {children}
        </Flex>
    );
}
