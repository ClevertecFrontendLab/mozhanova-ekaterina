import { Flex } from '@chakra-ui/react';

import { BookmarkHeartIcon } from '~/components/ui/icons/BookmarkHeartIcon';
import { EmojiHeartEyesIcon } from '~/components/ui/icons/EmojiHeartEyesIcon';
import { PeopleIcon } from '~/components/ui/icons/PeopleIcon';
import { ThumbUpIcon } from '~/components/ui/icons/ThumbUpIcon';
import { useAppSelector } from '~/store/hooks';
import { selectStatisticsCounts } from '~/store/selectors';

export const ProfileStatistics = ({
    isMenuOpen = true,
    variant = 'default',
}: {
    isMenuOpen?: boolean;
    variant?: 'default' | 'mobile';
}) => {
    const isVisible = variant === 'default' || !isMenuOpen;
    const statistic = useAppSelector(selectStatisticsCounts);

    if (!statistic) return null;
    return (
        <Flex
            display={isVisible ? 'flex' : 'none'}
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
            {statistic.recommendationsCount !== 0 && (
                <ItemBox>
                    <ThumbUpIcon />
                    <div>{statistic.recommendationsCount}</div>
                </ItemBox>
            )}
            {statistic.bookmarks !== 0 && (
                <ItemBox>
                    <BookmarkHeartIcon />
                    <div>{statistic.bookmarks}</div>
                </ItemBox>
            )}

            {statistic.subscribersCount !== 0 && (
                <ItemBox>
                    <PeopleIcon />
                    <div>{statistic.subscribersCount}</div>
                </ItemBox>
            )}

            {statistic.likes !== 0 && (
                <ItemBox>
                    <EmojiHeartEyesIcon /> <div>{statistic.likes}</div>
                </ItemBox>
            )}
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
