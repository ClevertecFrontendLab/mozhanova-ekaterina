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
            p='16px 24px'
            justifyContent='space-between'
            alignItems='center'
        >
            <Flex gap='12px' alignItems='center'>
                <Image src={iconSrc} alt='category icon' />
                <Heading fontSize='xl' fontWeight='500'>
                    {title}
                </Heading>
            </Flex>
            <UiButton text='Готовить' variant='accentOutline' />
        </Flex>
    );
}
