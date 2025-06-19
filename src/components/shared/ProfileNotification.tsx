import { Flex } from '@chakra-ui/react';

import { useAppSelector } from '~/store/hooks';
import { selectStatisticsCounts } from '~/store/selectors';

import { BookmarkHeartIcon } from '../ui/icons/BookmarkHeartIcon';
import { EmojiHeartEyesIcon } from '../ui/icons/EmojiHeartEyesIcon';
import { PeopleIcon } from '../ui/icons/PeopleIcon';

export const ProfileNotification = ({
    isMenuOpen = true,
    variant = 'default',
}: {
    isMenuOpen?: boolean;
    variant?: 'default' | 'mobile';
}) => {
    const isVisible = variant === 'default' || !isMenuOpen;
    const statistic = useAppSelector(selectStatisticsCounts);

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
            {statistic.bookmarks !== 0 && (
                <Flex
                    justifyContent='center'
                    padding={{
                        base: '4px 8px',
                        md: '8px 16px',
                    }}
                    gap={{
                        base: 1.5,
                        lg: 2,
                    }}
                    alignItems='center'
                    fontWeight='600'
                    color='primary.400'
                >
                    <BookmarkHeartIcon />
                    <div>{statistic.bookmarks}</div>
                </Flex>
            )}

            {statistic.subscribersCount !== 0 && (
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
                    <PeopleIcon />
                    <div>{statistic.subscribersCount}</div>
                </Flex>
            )}

            {statistic.likes !== 0 && (
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
                    <EmojiHeartEyesIcon /> <div>{statistic.likes}</div>
                </Flex>
            )}
        </Flex>
    );
};
