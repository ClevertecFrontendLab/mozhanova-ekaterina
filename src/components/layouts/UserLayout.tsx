import {
    Box,
    Flex,
    Image,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    useMediaQuery,
    VStack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import { LogIn } from '../../pages/user/LogIn';
import { SignIn } from '../../pages/user/SignIn';

export const UserLayout = () => {
    const navigate = useNavigate();
    const [isLargerThanMD] = useMediaQuery('(min-width: 769px)');

    const handleTabChange = (index: number) => {
        navigate(index === 0 ? '/login' : '/signin');
    };

    return (
        <Flex position='relative' w='100vw' h='100vh'>
            <VStack
                flexBasis={{ base: '100%', md: '50%' }}
                bg='linear-gradient(208deg, #eaffc7 0%, #29813f 100%)'
                align='center'
                pt={{ base: '72px', sm: '140px', md: '170px' }}
            >
                <Image
                    mb={{ base: 10, sm: 14, md: 20 }}
                    w={{ base: '158px', md: '271px' }}
                    src='/src/assets/logo/logo.png'
                />
                <Tabs
                    index={location.pathname === '/login' ? 0 : 1}
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
                            <LogIn />
                        </TabPanel>
                        <TabPanel>
                            <SignIn />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </VStack>
            <Box flexBasis='50%' display={{ base: 'none', md: 'block' }}>
                <Image w='100%' objectFit='cover' h='100%' src='/src/assets/user/page_bg.png' />
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
