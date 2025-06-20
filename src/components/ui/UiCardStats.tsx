import { Flex } from '@chakra-ui/react';

import { DATA_TEST_IDS } from '~/constants/test-ids';

import { BookmarkHeartIcon } from './icons/BookmarkHeartIcon';
import { EmojiHeartEyesIcon } from './icons/EmojiHeartEyesIcon';
import { PeopleOutlineIcon } from './icons/PeopleOutlineIcon';

type Props = {
    bookmarks: number;
    likes: number;
    subscribersCount: number;
    size: keyof typeof sizes;
};

const sizes = {
    sm: {
        fontSize: '12px',
        iconSize: '12px',
    },
    md: {
        fontSize: '14px',
        iconSize: '14px',
    },
};

export const UiCardStats = ({
    bookmarks = 0,
    likes = 0,
    subscribersCount = 0,
    size = 'sm',
}: Partial<Props>) => (
    <Flex
        h='fit-content'
        fontSize={sizes[size].fontSize}
        gap='8px'
        color='primary.400'
        fontWeight='600'
    >
        {bookmarks !== 0 && (
            <Flex
                data-test-id={DATA_TEST_IDS.BLOGGER_FOLLOWERS_BOOKMARKS}
                p='4px'
                gap='6px'
                align='center'
            >
                <BookmarkHeartIcon size={sizes[size].iconSize} />
                {bookmarks}
            </Flex>
        )}
        {likes !== 0 && (
            <Flex p='4px' gap='6px' align='center'>
                <EmojiHeartEyesIcon size={sizes[size].iconSize} />
                {likes}
            </Flex>
        )}
        {subscribersCount !== 0 && (
            <Flex
                data-test-id={DATA_TEST_IDS.BLOGGER_FOLLOWERS_COUNT}
                p='4px'
                gap='6px'
                align='center'
            >
                <PeopleOutlineIcon />
                {subscribersCount}
            </Flex>
        )}
    </Flex>
);
