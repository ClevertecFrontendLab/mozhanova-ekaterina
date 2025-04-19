import { Flex, useMediaQuery } from '@chakra-ui/react';

import { UiCardBadge } from './UiCardBadge';
import { UiCardStats } from './UiCardStats';

type Props = {
    category: string[];
    likes: number;
    bookmarks: number;
    categoryBgColor: 'secondary.100' | 'primary.100';
    alignItems?: string;
};

export function UiCardInfo({
    category,
    likes,
    bookmarks,
    categoryBgColor,
    alignItems = 'flex-end',
}: Props) {
    const [isLargerThanMD] = useMediaQuery('(min-width: 769px)');

    return (
        <Flex w='100%' justifyContent='space-between' alignItems={alignItems}>
            <Flex
                direction='column'
                gap={3}
                position={{
                    base: 'absolute',
                    md: 'static',
                }}
                top='8px'
                left='8px'
            >
                {isLargerThanMD ? (
                    category.map((item) => (
                        <UiCardBadge color={categoryBgColor} key={item} category={item} />
                    ))
                ) : (
                    <UiCardBadge color={categoryBgColor} category={category[0]} />
                )}
            </Flex>
            {bookmarks || likes ? <UiCardStats bookmarks={bookmarks} likes={likes} /> : null}
        </Flex>
    );
}
