// src/pages/NotFoundPage.tsx
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router';

export function NotFoundPage() {
    return (
        <Box textAlign='center'>
            <Flex
                justifyContent='center'
                mb={8}
                mt={{
                    base: '186px',
                    sm: '280px',
                    md: '300px',
                }}
            >
                <Image
                    src='/src/assets/ui/404.png'
                    w={{ base: '108px', md: '206px' }}
                    h={{ base: '108px', md: '206px' }}
                />
            </Flex>
            <Text as='h1' mb={4} fontWeight={700} fontSize='lg'>
                Упс! Такой страницы нет
            </Text>
            <Text color='text.secondary'>
                Можете поискать другой рецепт{' '}
                <Text textDecoration='underline'>
                    <Link data-test-id='error-page-go-home' to='/'>
                        здесь.
                    </Link>
                </Text>
            </Text>
        </Box>
    );
}
