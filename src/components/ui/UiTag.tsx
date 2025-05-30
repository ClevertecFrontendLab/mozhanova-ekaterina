import { Tag, TagCloseButton, TagLabel } from '@chakra-ui/react';

type Props = {
    selected: string[];
    label: string;
    setSelected: (value: string[]) => void;
    bg?: 'primary.50' | 'background.base';
    isClosable?: boolean;
};

export const UiTag = ({
    setSelected,
    selected,
    isClosable = true,
    label,
    bg = 'background.base',
    ...props
}: Props) => (
    <Tag
        css={{
            pointerEvents: 'auto',
            '& > *': {
                pointerEvents: 'auto',
            },
        }}
        size='md'
        variant='outline'
        bg={bg}
        {...props}
    >
        <TagLabel>{label}</TagLabel>
        {isClosable && (
            <TagCloseButton onClick={() => setSelected([...selected.filter((i) => i !== label)])} />
        )}
    </Tag>
);
