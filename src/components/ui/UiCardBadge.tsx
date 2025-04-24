import { Image, Tag, TagLabel, TagLeftIcon } from '@chakra-ui/react';

import { defineCategoryImage, defineCategoryLabel } from '~/helper';

type Props = {
    color: 'secondary.100' | 'primary.100';
    category: string;
};
export function UiCardBadge({ category, color: categoryBgColor }: Props) {
    return (
        <Tag
            w='fit-content'
            size='md'
            variant='cardBadge'
            bg={categoryBgColor}
            pl={{ base: 1, md: 2 }}
            pr={{ base: 1, md: 2 }}
        >
            <TagLeftIcon as={Image} src={defineCategoryImage(category)} alt={category} />
            <TagLabel>{defineCategoryLabel(category)}</TagLabel>
        </Tag>
    );
}
