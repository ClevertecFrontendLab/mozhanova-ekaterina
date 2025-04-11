import { ChevronRightIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Flex,
    Image,
    useMediaQuery,
} from '@chakra-ui/react';
import { Link } from 'react-router';

import { ProfileInfo } from './ProfileInfo';
import { ProfileNotification } from './ProfileNotification';

export function Header() {
    const [isLargerThanMD] = useMediaQuery('(min-width: 768px)');

    return (
        <Flex
            alignItems='center'
            position='fixed'
            top='0'
            left='0'
            zIndex='100'
            w='100%'
            h={{
                base: '64px',
                md: '80px',
            }}
            pr={{
                base: 5,
                md: 14,
            }}
            pl={{
                base: 5,
                md: 4,
            }}
            bg='background.header'
            data-test-id='header'
        >
            <Box width='256px'>
                <Image
                    w={{
                        base: '32px',
                        md: '135px',
                    }}
                    h='32px'
                    src={
                        isLargerThanMD
                            ? '/src/assets/logo/logo.png'
                            : '/src/assets/logo/mobile_logo.png'
                    }
                    alt='logo'
                />
            </Box>
            {isLargerThanMD ? (
                <>
                    <Breadcrumb
                        flexGrow={1}
                        spacing='8px'
                        separator={<ChevronRightIcon color='gray.500' />}
                    >
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

                    <ProfileInfo />
                </>
            ) : (
                <Flex justify='flex-end' align='center' flexGrow={1}>
                    <ProfileNotification />
                    <HamburgerIcon w={6} h={6} />
                </Flex>
            )}
        </Flex>
    );
}
