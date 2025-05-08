import { Image, Tag, TagLabel, TagLeftIcon } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import { ApplicationState } from '~/store/configure-store';
import { selectCategoryById } from '~/store/selectors';

type Props = {
    color: 'secondary.100' | 'primary.100';
    categoryId?: string;
};
export const UiCardBadge = ({ categoryId, color: categoryBgColor }: Props) => {
    const category = useSelector((state: ApplicationState) =>
        selectCategoryById(state, categoryId || ''),
    );

    if (!category) return null;
    return (
        <Tag
            w='fit-content'
            size='md'
            variant='cardBadge'
            bg={categoryBgColor}
            pl={{ base: 1, md: 2 }}
            pr={{ base: 1, md: 2 }}
        >
            {category.icon && (
                <TagLeftIcon
                    w='16px'
                    h='16px'
                    as={Image}
                    src={`https://training-api.clevertec.ru${category.icon}`}
                    alt={category.title}
                />
            )}
            <TagLabel>{category.title}</TagLabel>
        </Tag>
    );
};
