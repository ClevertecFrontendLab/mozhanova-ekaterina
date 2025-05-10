import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Progress,
    SimpleGrid,
    TabPanel,
    TabPanels,
    Tabs,
    VStack,
} from '@chakra-ui/react';
import { useState } from 'react';

import { UiButton } from '~/components/ui/UiButton';
import { useToast } from '~/hooks/use-toast';

export const SignIn = () => {
    const { showError } = useToast();
    const steps = [
        { description: 'Шаг 1. Личная информация' },
        { description: 'Шаг 2. Логин и пароль' },
    ];
    const [
        activeStep,
        // setActiveStep
    ] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const max = steps.length * 3;
    const progressPercent = (activeStep / max) * 100;

    return (
        <div>
            <form
            //  onSubmit={}
            >
                <VStack spacing={6}>
                    <Box w='full'>
                        <FormLabel>{steps[0].description}</FormLabel>
                        <Progress hasStripe h='8px' value={progressPercent} />
                    </Box>

                    <Tabs index={activeIndex} w='full'>
                        <TabPanels>
                            <TabPanel>
                                <VStack spacing={6}>
                                    <FormControl>
                                        <FormLabel>Ваше имя</FormLabel>
                                        <Input
                                            size='lg'
                                            variant='login'
                                            type='text'
                                            placeholder='Имя'
                                        />
                                        <FormErrorMessage></FormErrorMessage>
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel>Ваша фамилия</FormLabel>
                                        <InputGroup size='lg'>
                                            <Input
                                                variant='login'
                                                type='text'
                                                placeholder='Фамилия'
                                            />
                                        </InputGroup>
                                        <FormErrorMessage></FormErrorMessage>
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel>Ваш e-mail</FormLabel>
                                        <InputGroup size='lg'>
                                            <Input
                                                variant='login'
                                                type='email'
                                                placeholder='e-mail'
                                            />
                                        </InputGroup>
                                        <FormErrorMessage></FormErrorMessage>
                                    </FormControl>
                                </VStack>
                            </TabPanel>
                            <TabPanel>
                                <VStack spacing={6}>
                                    <FormControl>
                                        <FormLabel>Логин для входа на сайт</FormLabel>
                                        <InputGroup size='lg'>
                                            <Input
                                                variant='login'
                                                type='text'
                                                placeholder='Введите логин'
                                            />
                                        </InputGroup>
                                        <FormErrorMessage></FormErrorMessage>
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel>Пароль</FormLabel>
                                        <InputGroup size='lg'>
                                            <Input
                                                variant='login'
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder='Пароль для сайта'
                                            />
                                            <InputRightElement
                                                onClick={() => setShowPassword((prev) => !prev)}
                                                cursor='pointer'
                                                bgSize='lg'
                                            >
                                                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                            </InputRightElement>
                                        </InputGroup>
                                        <FormErrorMessage></FormErrorMessage>
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel>Повторите пароль</FormLabel>
                                        <InputGroup size='lg'>
                                            <Input
                                                variant='login'
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder='Пароль для сайта'
                                            />
                                            <InputRightElement
                                                onClick={() => setShowPassword((prev) => !prev)}
                                                cursor='pointer'
                                                bgSize='lg'
                                            >
                                                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                            </InputRightElement>
                                        </InputGroup>
                                        <FormErrorMessage></FormErrorMessage>
                                    </FormControl>
                                </VStack>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </VStack>

                <SimpleGrid columns={1} mt='112px' spacing={4}>
                    {activeIndex === 0 ? (
                        <UiButton
                            onClick={() => setActiveIndex(1)}
                            variant='solid'
                            text='Дальше'
                            size='lg'
                        />
                    ) : (
                        <UiButton
                            onClick={() =>
                                showError(
                                    'Неверный логин или пароль',
                                    'Попробуйте снова.',
                                    15000,
                                    'bottom-left',
                                )
                            }
                            variant='solid'
                            text='Зарегистрироваться'
                            size='lg'
                        />
                    )}
                    <Button onClick={() => setActiveIndex(0)}>назад</Button>
                </SimpleGrid>
            </form>
        </div>
    );
};
