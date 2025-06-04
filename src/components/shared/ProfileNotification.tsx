import { Flex } from '@chakra-ui/react';

import { BookmarkHeartIcon } from '../ui/icons/BookmarkHeartIcon';
import { EmojiHeartEyesIcon } from '../ui/icons/EmojiHeartEyesIcon';
import { PeopleIcon } from '../ui/icons/PeopleIcon';

export const ProfileNotification = ({
    isMenuOpen = true,
    variant = 'default',
    totalBookmarks,
    totalLikes,
    totalSubscribers,
}: {
    isMenuOpen?: boolean;
    variant?: 'default' | 'mobile';
    totalBookmarks?: number;
    totalLikes?: number;
    totalSubscribers?: number;
}) => {
    const isVisible = variant === 'default' || !isMenuOpen;

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
            {totalBookmarks ? (
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
                    <div>{totalBookmarks}</div>
                </Flex>
            ) : null}

            {totalSubscribers ? (
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
                    <div>{totalSubscribers}</div>
                </Flex>
            ) : null}

            {totalLikes ? (
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
                    <EmojiHeartEyesIcon /> <div>{totalLikes}</div>
                </Flex>
            ) : null}
        </Flex>
    );
};
