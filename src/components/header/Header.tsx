import { Flex } from '@chakra-ui/react';

import { DATA_TEST_IDS } from '~/constants/test-ids';
import { useBreakpoint } from '~/hooks/use-breakpoint';

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
    const [isLargerThanMD] = useBreakpoint('md');

    const toggleMenu = () => setMenuOpen(!isMenuOpen);

    return (
        <Flex
            alignItems='center'
            position='fixed'
            top='0'
            left='0'
            zIndex={60}
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
            data-test-id={DATA_TEST_IDS.HEADER}
        >
            <Logo />

            <Breadcrumbs setMenuOpen={setMenuOpen} />
            <ProfileInfo />
            {isLargerThanMD && <LogInButton />}
            <Flex
                display={!isLargerThanMD ? 'flex' : 'none'}
                justify='flex-end'
                align='center'
                flexGrow={1}
            >
                {currentUser ? (
                    <ProfileNotification variant='mobile' isMenuOpen={isMenuOpen} />
                ) : null}
                <Flex gap={6} alignItems='center' justifyContent='center'>
                    <LogInButton />

                    <CloseMenuButton isMenuOpen={isMenuOpen} onClick={toggleMenu} />
                    <HamburgerButton isMenuOpen={isMenuOpen} onClick={toggleMenu} />
                </Flex>
            </Flex>
        </Flex>
    );
};
