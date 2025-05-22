import {
    Box,
    Flex,
    Grid,
    Image,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
} from '@chakra-ui/react';
import { Outlet, useLocation, useNavigate } from 'react-router';

import logo from '~/assets/logo/logo.png';
import bg from '~/assets/user/page_bg.png';
import { AppRoutes } from '~/constants/routes-config';
import { useBreakpoint } from '~/hooks/use-breakpoint';

export const AuthLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLargerThanMD] = useBreakpoint('md');
    const currentIndex = location.pathname.endsWith(AppRoutes.SIGN_UP) ? 1 : 0;

    const handleTabChange = (index: number) => {
        navigate(index === 0 ? AppRoutes.SIGN_IN : AppRoutes.SIGN_UP);
    };

    return (
        <Flex position='relative' w='100vw' h='100vh'>
            <Grid
                flexBasis={{ base: '100%', md: '50%' }}
                bg='linear-gradient(208deg, #eaffc7 0%, #29813f 100%)'
                justifyContent='center'
            >
                <Image alignSelf='center' mx='auto' w={{ base: '158px', md: '271px' }} src={logo} />
                <Tabs
                    index={currentIndex}
                    align={isLargerThanMD ? 'start' : 'center'}
                    w={{
                        base: '328px',
                        sm: '355',
                        md: '451px',
                        lg: '461px',
                    }}
                    variant='line'
                    onChange={handleTabChange}
                >
                    <TabList borderBottomColor='border.light' gap={4} mb={10}>
                        <Tab bg='transparent'>Вход на сайт</Tab>
                        <Tab bg='transparent'>Регистрация</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            {location.pathname === AppRoutes.SIGN_IN && <Outlet />}
                            {location.pathname === AppRoutes.RECOVERY && <Outlet />}
                        </TabPanel>
                        <TabPanel>{location.pathname === AppRoutes.SIGN_UP && <Outlet />}</TabPanel>
                    </TabPanels>
                </Tabs>
            </Grid>
            <Box flexBasis='50%' display={{ base: 'none', md: 'block' }}>
                <Image w='100%' objectFit='cover' h='100%' src={bg} />
            </Box>

            <Flex
                justify='space-between'
                px={5}
                pb={{ base: 4, sm: 5 }}
                bottom={0}
                left={0}
                right={0}
                position='absolute'
                fontSize='xs'
                fontWeight={600}
            >
                <Text p={2.5}>Все права защищены, ученический файл, ©Клевер Технолоджи, 2025</Text>
                <Text p={2.5} display={{ base: 'none', md: 'inline' }}>
                    ̶ Лучший сервис для ваших кулинарных побед{' '}
                </Text>
            </Flex>
        </Flex>
    );
};
