import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { Box, Flex, Image, useMediaQuery } from '@chakra-ui/react';
import { Link } from 'react-router';

import { ProfileInfo } from '../shared/ProfileInfo';
import { ProfileNotification } from '../shared/ProfileNotification';
import { Breadcrumbs } from './Breadcrumbs';

export function Header({
    setMobileMenuOpen,
    isMenuOpen,
}: {
    setMobileMenuOpen: (value: boolean) => void;
    isMenuOpen: boolean;
}) {
    const [isLargerThanMD] = useMediaQuery('(min-width: 769px)');
    const [isLargerThanSM] = useMediaQuery('(min-width: 361px)');

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
                base: 4,
                sm: 5,
                md: 14,
            }}
            pl={{
                base: 4,
                sm: 5,
                md: 4,
            }}
            bg={isMenuOpen && !isLargerThanMD ? 'background.base' : 'background.header'}
            data-test-id='header'
        >
            <Box width='256px'>
                <Link to='/'>
                    <Image
                        w={{
                            base: '32px',
                            sm: '135px',
                        }}
                        h='32px'
                        src={
                            isLargerThanSM
                                ? '/src/assets/logo/logo.png'
                                : '/src/assets/logo/mobile_logo.png'
                        }
                        alt='logo'
                    />
                </Link>
            </Box>
            {isLargerThanMD ? (
                <>
                    <Breadcrumbs />
                    <ProfileInfo />
                </>
            ) : (
                <Flex justify='flex-end' align='center' flexGrow={1}>
                    {!isMenuOpen && <ProfileNotification />}
                    <Flex w={6} h={6} alignItems='center' justifyContent='center'>
                        {isMenuOpen ? (
                            <CloseIcon
                                onClick={() => {
                                    setMobileMenuOpen(false);
                                }}
                            />
                        ) : (
                            <HamburgerIcon
                                w={6}
                                h={6}
                                onClick={() => {
                                    setMobileMenuOpen(true);
                                }}
                            />
                        )}
                    </Flex>
                </Flex>
            )}
        </Flex>
    );
}
