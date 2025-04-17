import { Flex } from '@chakra-ui/react';

import { BookmarkHeartIcon } from '../ui/icons/BookmarkHeartIcon';
import { EmojiHeartEyesIcon } from '../ui/icons/EmojiHeartEyesIcon';
import { PeopleIcon } from '../ui/icons/PeopleIcon';

export function ProfileNotification() {
    return (
        <Flex
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
}
