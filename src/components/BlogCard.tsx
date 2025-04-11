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
            size={{
                base: 'md',
                md: 'lg',
            }}
            transition='box-shadow 0.3s ease-in-out'
            _hover={{
                shadow: 'themeNeutralGreen',
            }}
        >
            <CardBody pt={6}>
                <Flex
                    gap={{
                        base: 2,
                        md: 3,
                    }}
                    pb={{
                        base: 2,
                        md: 4,
                    }}
                >
                    <Image w='48px' h='48px' src={avatarSrc} alt='avatar' />
                    <Box>
                        <Heading
                            as='h3'
                            fontSize={{
                                base: 'md',
                                md: 'lg',
                            }}
                            fontWeight='500'
                            noOfLines={1}
                        >
                            {title}
                        </Heading>
                        <Text
                            color='text.secondary'
                            fontSize={{
                                base: 'xs',
                                md: 'sm',
                            }}
                        >
                            {subtitle}
                        </Text>
                    </Box>
                </Flex>
                <Text
                    fontSize='sm'
                    noOfLines={3}
                    pt={{
                        base: 2,
                        md: 3,
                    }}
                >
                    {text}
                </Text>
            </CardBody>
        </Card>
    );
}
