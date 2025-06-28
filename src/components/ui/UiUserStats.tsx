import { Flex } from '@chakra-ui/react';

import { PeopleOutlineIcon } from '~/components/ui/icons/PeopleOutlineIcon';
import { DATA_TEST_IDS } from '~/constants/test-ids';

import { BookmarkHeartIcon } from './icons/BookmarkHeartIcon';

type Props = {
    bookmarks: number;
    subscribersCount: number;
};
export const UiUserStats = ({ subscribersCount, bookmarks }: Props) => (
    <Flex gap={2} fontSize='12px' color='primary.400' fontWeight='600'>
        <Flex
            data-test-id={DATA_TEST_IDS.BLOGGER_FOLLOWERS_BOOKMARKS}
            p={1}
            gap={1.5}
            align='center'
        >
            <BookmarkHeartIcon />
            {bookmarks}
        </Flex>
        <Flex data-test-id={DATA_TEST_IDS.BLOGGER_FOLLOWERS_COUNT} p='4px' gap='6px' align='center'>
            <PeopleOutlineIcon />
            {subscribersCount}
        </Flex>
    </Flex>
);
