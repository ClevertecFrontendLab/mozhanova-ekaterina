import { Box, Flex } from '@chakra-ui/react';
import { Link } from 'react-router';

import { AppRoutes } from '~/constants/routes-config';
import { DATA_TEST_IDS } from '~/constants/test-ids';
import { Z_INDEX_CONFIG } from '~/constants/z-index-config';
import { useBreakpoint } from '~/hooks/use-breakpoint';
import { useAppSelector } from '~/store/hooks';
import { selectCurrentUser } from '~/store/user-slice';

import { ProfileInfo } from '../shared/profile/ProfileInfo';
import { ProfileStatistics } from '../shared/profile/ProfileStatistics';
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
    const user = useAppSelector(selectCurrentUser);

    return (
        <Flex
            alignItems='center'
            position='fixed'
            top='0'
            left='0'
            zIndex={Z_INDEX_CONFIG.HEADER}
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
            {user && (
                <Box display={isLargerThanMD ? 'block' : 'none'}>
                    <Link to={AppRoutes.PROFILE}>
                        <ProfileInfo
                            firstName={user.firstName}
                            lastName={user.lastName}
                            login={user.login}
                            photoLink={user.photoLink}
                        />
                    </Link>
                </Box>
            )}

            {isLargerThanMD && <LogInButton />}
            <Flex
                display={!isLargerThanMD ? 'flex' : 'none'}
                justify='flex-end'
                align='center'
                flexGrow={1}
            >
                <ProfileStatistics variant='mobile' isMenuOpen={isMenuOpen} />
                <Flex gap={6} alignItems='center' justifyContent='center'>
                    <LogInButton />

                    <CloseMenuButton isMenuOpen={isMenuOpen} onClick={toggleMenu} />
                    <HamburgerButton isMenuOpen={isMenuOpen} onClick={toggleMenu} />
                </Flex>
            </Flex>
        </Flex>
    );
};
