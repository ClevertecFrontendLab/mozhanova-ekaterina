import { Box, Flex, Heading, Image } from '@chakra-ui/react';

import { UiButton } from './UiButton';

type Props = {
    iconSrc: string;
    title: string;
};

export function UiCardMini({ iconSrc, title }: Props) {
    return (
        <Flex
            transition='box-shadow 0.3s ease-in-out'
            _hover={{
                shadow: 'themeNeutralGreen',
            }}
            borderWidth='1px'
            borderColor='border.light'
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
                textOverflow='ellipsis'
                whiteSpace='nowrap'
                overflowX='hidden'
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
