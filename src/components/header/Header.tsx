import { Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { DATA_TEST_IDS } from '~/constants/test-ids';
import { Z_INDEX_CONFIG } from '~/constants/z-index-config';
import { useBreakpoint } from '~/hooks/use-breakpoint';
import { useGetProfileQuery, useGetStatisticsQuery } from '~/query/user-api';
import { setStatistics, setUser } from '~/store/user-slice';

import { ProfileInfo } from '../shared/ProfileInfo';
import { ProfileStatistics } from '../shared/ProfileStatistics';
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
    const dispatch = useDispatch();
    const { data: profile } = useGetProfileQuery();
    const { data: statistics } = useGetStatisticsQuery();

    useEffect(() => {
        if (!profile || !statistics) return;
        dispatch(setUser(profile));
        dispatch(setStatistics(statistics));
    }, [profile, statistics]);

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
            {profile && (
                <ProfileInfo
                    firstName={profile.firstName}
                    lastName={profile.lastName}
                    login={profile.login}
                    photoLink={profile.photoLink}
                />
            )}

            {isLargerThanMD && <LogInButton />}
            <Flex
                display={!isLargerThanMD ? 'flex' : 'none'}
                justify='flex-end'
                align='center'
                flexGrow={1}
            >
                {statistics && <ProfileStatistics variant='mobile' isMenuOpen={isMenuOpen} />}
                <Flex gap={6} alignItems='center' justifyContent='center'>
                    <LogInButton />

                    <CloseMenuButton isMenuOpen={isMenuOpen} onClick={toggleMenu} />
                    <HamburgerButton isMenuOpen={isMenuOpen} onClick={toggleMenu} />
                </Flex>
            </Flex>
        </Flex>
    );
};
