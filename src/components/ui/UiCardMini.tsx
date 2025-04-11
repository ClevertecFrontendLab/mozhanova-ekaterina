import { Flex, Heading, Image } from '@chakra-ui/react';

import { UiButton } from './UiButton';

type Props = {
    iconSrc: string;
    title: string;
};

export function UiCardMini({ iconSrc, title }: Props) {
    return (
        <Flex
            borderWidth='1px'
            borderColor='neutral.200'
            borderRadius='8px'
            p={{
                base: '10px 12px',
                xl: '12px 24px',
            }}
            alignItems='center'
            gap={{
                base: 2,
                md: 3,
            }}
        >
            <Image src={iconSrc} alt='category icon' />
            <Heading
                fontSize={{
                    base: 'md',
                    md: 'xl',
                }}
                fontWeight='500'
                noOfLines={1}
                flexGrow={1}
            >
                {title}
            </Heading>
            <Box flexBasis='70px'>
                <UiButton fontSize='12px' text='Готовить' variant='accentOutline' />
            </Box>
        </Flex>
    );
}
