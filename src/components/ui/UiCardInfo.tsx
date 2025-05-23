import { Flex } from '@chakra-ui/react';

import { useBreakpoint } from '~/hooks/use-breakpoint';

import { UiCardBadge } from './UiCardBadge';
import { UiCardStats } from './UiCardStats';

type Props = {
    likes: number;
    bookmarks: number;
    categoryBgColor: 'secondary.100' | 'primary.100';
    categories?: (string | undefined)[];
    alignItems?: string;
};

export const UiCardInfo = ({
    categories = [],
    likes,
    bookmarks,
    categoryBgColor,
    alignItems = 'flex-end',
}: Props) => {
    const [isLargerThanMD] = useBreakpoint('md');

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
                {categories.length > 0 &&
                    (isLargerThanMD
                        ? categories.map(
                              (id) =>
                                  id && (
                                      <UiCardBadge
                                          color={categoryBgColor}
                                          key={id}
                                          categoryId={id}
                                      />
                                  ),
                          )
                        : categories[0] && (
                              <UiCardBadge color={categoryBgColor} categoryId={categories[0]} />
                          ))}
            </Flex>
            {bookmarks || likes ? <UiCardStats bookmarks={bookmarks} likes={likes} /> : null}
        </Flex>
    );
};
