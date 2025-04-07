import { Box, Card, CardBody, Flex, Heading, Image, Text } from '@chakra-ui/react';

type Props = {
    avatarSrc: string;
    title: string;
    subtitle: string;
    text: string;
};

export function BlogCard({ avatarSrc, title, subtitle, text }: Props) {
    return (
        <Card
            size='md'
            transition='box-shadow 0.3s ease-in-out'
            _hover={{
                shadow: 'themeNeutralGreen',
            }}
        >
            <CardBody p='24px 24px 20px'>
                <Flex gap='12px' pb='16px'>
                    <Image w='48px' h='48px' src={avatarSrc} alt='avatar' />
                    <Box>
                        <Heading as='h3' fontSize='18px' fontWeight='500'>
                            {title}
                        </Heading>
                        <Text color='neutral.300' fontSize='sm'>
                            {subtitle}
                        </Text>
                    </Box>
                </Flex>
                <Text fontSize='sm' noOfLines={3} pt='12px'>
                    {text}
                </Text>
            </CardBody>
        </Card>
    );
}
