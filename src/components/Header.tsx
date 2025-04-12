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
import { Link, useLocation } from 'react-router';

import { categories } from '~/constants';

import { ProfileInfo } from './ProfileInfo';
import { ProfileNotification } from './ProfileNotification';

export function Header() {
    const [isLargerThanMD] = useMediaQuery('(min-width: 768px)');
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

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
                        <BreadcrumbItem isCurrentPage={pathnames.length === 0}>
                            <BreadcrumbLink as={Link} to='/'>
                                Главная
                            </BreadcrumbLink>
                        </BreadcrumbItem>

                        {pathnames.length > 0 &&
                            pathnames.map((path, i) => {
                                const routeTo = pathnames.slice(0, i + 1).join('/');
                                const label =
                                    categories.find((category) => category.id === path)?.label ||
                                    categories
                                        .find((category) =>
                                            category.subCategories?.find(
                                                (subCategory) => subCategory.id === path,
                                            ),
                                        )
                                        ?.subCategories?.find(
                                            (subCategory) => subCategory.id === path,
                                        )?.label ||
                                    (path === 'the-juiciest' && 'Самое сочное') ||
                                    '';
                                return (
                                    <BreadcrumbItem isCurrentPage={i === pathnames.length - 1}>
                                        <BreadcrumbLink as={Link} to={routeTo}>
                                            {label}
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                );
                            })}
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
