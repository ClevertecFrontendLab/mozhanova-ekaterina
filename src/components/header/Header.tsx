import { Flex, useMediaQuery } from '@chakra-ui/react';

import { ProfileInfo } from '../shared/ProfileInfo';
import { ProfileNotification } from '../shared/ProfileNotification';
import { Breadcrumbs } from './Breadcrumbs';
import { CloseMenuButton } from './CloseMenuButton';
import { HamburgerButton } from './HamburgerButton';
import { LogInButton } from './LogInButton';
import { Logo } from './Logo';

export const Header = ({
    setMenuOpen,
    isMenuOpen,
}: {
    setMenuOpen: (value: boolean) => void;
    isMenuOpen: boolean;
}) => {
    const [isLargerThanMD] = useMediaQuery('(min-width: 1001px)');

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    return (
        <Flex
            alignItems='center'
            position='fixed'
            top='0'
            left='0'
            zIndex={2002}
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
            <Logo />

            <Breadcrumbs setMenuOpen={setMenuOpen} />
            <ProfileInfo />

            <Flex
                display={!isLargerThanMD ? 'flex' : 'none'}
                justify='flex-end'
                align='center'
                flexGrow={1}
            >
                <ProfileNotification variant='mobile' isMenuOpen={isMenuOpen} />
                <Flex gap={6} alignItems='center' justifyContent='center'>
                    <LogInButton />
                    <CloseMenuButton isMenuOpen={isMenuOpen} onClick={toggleMenu} />
                    <HamburgerButton isMenuOpen={isMenuOpen} onClick={toggleMenu} />
                </Flex>
            </Flex>
        </Flex>
    );
};
