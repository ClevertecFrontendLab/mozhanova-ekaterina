import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Image } from '@chakra-ui/react';
import { Link } from 'react-router';

export function Header() {
    return (
        <Flex
            alignItems='center'
            position='fixed'
            top='0'
            left='0'
            zIndex='100'
            width='100%'
            height='80px'
            padding='0 56px 0 16px'
            bg='background.header'
            data-test-id='header'
        >
            <Box width='256px'>
                <Image width='135px' src='/public/logo.svg' alt='logo' />
            </Box>
            <Flex justify='space-between' alignItems='center' grow='1'>
                <Breadcrumb spacing='8px' separator={<ChevronRightIcon color='gray.500' />}>
                    <BreadcrumbItem>
                        <BreadcrumbLink as={Link} to='/'>
                            Главная
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                        <BreadcrumbLink as={Link} to='/vegan-cuisine'>
                            Веганская кухня
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink as={Link} to='/the-juiciest'>
                            Вторые блюда
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <Flex gap='12px'>
                    <Image
                        width='48px'
                        height='48px'
                        borderRadius='50%'
                        src='/public/avatar.png'
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
            </Flex>
        </Flex>
    );
}
