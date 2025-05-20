import { Flex } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import { ApplicationState } from '~/store/configure-store';

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
    const token = useSelector((state: ApplicationState) => state.user.accessToken);
    const isVisible = (token && variant === 'default') || (token && !isMenuOpen);

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
                <div>185</div>
            </Flex>
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
                <div>589</div>
            </Flex>
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
                <EmojiHeartEyesIcon /> <div>587</div>
            </Flex>
        </Flex>
    );
};
