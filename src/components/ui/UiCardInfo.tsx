import { Flex } from '@chakra-ui/react';

import { useBreakpoint } from '~/hooks/use-breakpoint';

import { UiCardBadge } from './UiCardBadge';
import { UiCardStats } from './UiCardStats';

type Props = {
    categoryBgColor: 'secondary.100' | 'primary.100';
    likes: number;
    bookmarks: number;
    categories: (string | undefined)[];
    alignItems: string;
};

export const UiCardInfo = ({
    categories = [],
    likes = 0,
    bookmarks = 0,
    categoryBgColor = 'secondary.100',
    alignItems = 'flex-end',
}: Partial<Props>) => {
    const [isLargerThanMD] = useBreakpoint('md');

    return (
        <Flex w='100%' justifyContent='space-between' alignItems={alignItems}>
            <Flex
                maxW='144px'
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
            <UiCardStats bookmarks={bookmarks} likes={likes} />
        </Flex>
    );
};
