import { Flex } from '@chakra-ui/react';

import { BookmarkHeartIcon } from './icons/BookmarkHeartIcon';
import { EmojiHeartEyesIcon } from './icons/EmojiHeartEyesIcon';

type Props = {
    bookmarks?: number;
    likes?: number;
    size?: keyof typeof sizes;
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

export const UiCardStats = ({ bookmarks, likes, size = 'sm' }: Props) => (
    <Flex
        h='fit-content'
        fontSize={sizes[size].fontSize}
        gap='8px'
        color='primary.400'
        fontWeight='600'
    >
        {bookmarks ? (
            <Flex p='4px' gap='6px' align='center'>
                <BookmarkHeartIcon size={sizes[size].iconSize} />
                {bookmarks}
            </Flex>
        ) : null}
        {likes ? (
            <Flex p='4px' gap='6px' align='center'>
                <EmojiHeartEyesIcon size={sizes[size].iconSize} />
                {likes}
            </Flex>
        ) : null}
    </Flex>
);
