import { Flex, Image, Text } from '@chakra-ui/react';

import { defineCategoryImage, defineCategoryLabel } from '~/helper';

type Props = {
    color: 'secondary.100' | 'primary.100';
    category: string;
};
export function UiCardBadge({ category, color: categoryBgColor }: Props) {
    return (
        <Flex
            w='fit-content'
            gap={{
                base: '2px',
                lg: '8px',
            }}
            alignItems='center'
            borderRadius='4px'
            padding={{
                base: '2px 4px',
                lg: '2px 8px',
            }}
            fontSize='14px'
            bg={categoryBgColor}
        >
            <Image w='16px' h='16px' src={defineCategoryImage(category)} alt='icon' />
            <Text fontSize='sm' whiteSpace='nowrap'>
                {defineCategoryLabel(category)}
            </Text>
        </Flex>
    );
}
