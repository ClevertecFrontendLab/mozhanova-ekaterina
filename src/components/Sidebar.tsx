import { EditIcon } from '@chakra-ui/icons';
import { Box, Flex } from '@chakra-ui/react';

import { BookmarkHeartIcon } from './ui/icons/BookmarkHeartIcon';
import { EmojiHeartEyesIcon } from './ui/icons/EmojiHeartEyesIcon';
import { PeopleIcon } from './ui/icons/PeopleIcon';

export function Sidebar() {
    return (
        <Flex direction='column' justifyContent='space-between' alignItems='flex-end' h='100%'>
            <Flex w='208px' direction='column' gap='24px' p='16px 0'>
                <Flex
                    justifyContent='center'
                    padding='8px 16px'
                    gap='10px'
                    alignItems='center'
                    fontWeight='600'
                    color='primary.400'
                >
                    <BookmarkHeartIcon />
                    <div>185</div>
                </Flex>
                <Flex
                    justifyContent='center'
                    padding='8px 16px'
                    gap='10px'
                    alignItems='center'
                    fontWeight='600'
                    color='primary.400'
                >
                    <PeopleIcon />
                    <div>589</div>
                </Flex>
                <Flex
                    justifyContent='center'
                    padding='8px 16px'
                    gap='10px'
                    alignItems='center'
                    fontWeight='600'
                    color='primary.400'
                >
                    <EmojiHeartEyesIcon /> <div>587</div>
                </Flex>
            </Flex>
            <Flex w='208px' direction='column' gap='12px' alignItems='center'>
                <Flex
                    justifyContent='center'
                    alignItems='center'
                    borderRadius='50%'
                    width='48px'
                    height='48px'
                    bg='neutral.400'
                    boxShadow='themeAccent'
                >
                    <EditIcon color='#ffffd3' width='22px' height='22px' />
                </Flex>
                <Box cursor='pointer' whiteSpace='nowrap'>
                    Записать рецепт
                </Box>
            </Flex>
        </Flex>
    );
}
