import { Box, Flex, Image } from '@chakra-ui/react';

export function ProfileInfo() {
    return (
        <Flex gap='12px'>
            <Image
                width='48px'
                height='48px'
                borderRadius='50%'
                src='/src/assets/Avatar.png'
                alt='avatar'
            />
            <div>
                <Box fontSize='18px' fontWeight='500'>
                    Екатерина Константинопольская
                </Box>
                <Box fontSize='14px' color='neutral.400'>
                    @bake_and_pie
                </Box>
            </div>
        </Flex>
    );
}
