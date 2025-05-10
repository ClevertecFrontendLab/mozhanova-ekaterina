import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormHelperText,
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
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

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

    const schema = yup.object({
        name: yup
            .string()
            .required('Введите имя')
            .matches(/^[А-ЯЁ]/, 'Должно начинаться с кириллицы А-Я')
            .matches(/^[А-ЯЁ][А-ЯЁа-яё-]*$/, 'Только кириллица А-Я, и "-"')
            .max(50, 'Максимальная длина 50 символов'),
        lastName: yup
            .string()
            .required('Введите фамилию')
            .matches(/^[А-ЯЁ]/, 'Должно начинаться с кириллицы А-Я')
            .matches(/^[А-ЯЁ][А-ЯЁа-яё-]*$/, 'Только кириллица А-Я, и "-"')
            .max(50, 'Максимальная длина 50 символов'),
        login: yup
            .string()
            .min(5, 'Не соответствует формату')
            .max(50, 'Максимальная длина 50 символов')
            .matches(/^[A-Za-z!@#$&_+\-.]*$/, 'Не соответствует формату')
            .required('Введите логин'),
        email: yup
            .string()
            .email('Введите корректный e-mail')
            .required('Введите e-mail')
            .max(50, 'Максимальная длина 50 символов'),
        password: yup
            .string()
            .min(8, 'Не соответствует формату')
            .max(50, 'Максимальная длина 50 символов')
            .required('Введите пароль')
            .matches(/^[A-Za-z!@#$&_+\-.]*$/, 'Не соответствует формату'),
        confirmPassword: yup
            .string()
            .required('Повторите пароль')
            .oneOf([yup.ref('password')], 'Пароли должны совпадать'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: {
        name: string;
        lastName: string;
        login: string;
        email: string;
        password: string;
        confirmPassword: string;
    }) => {
        console.log('Форма отправлена:', data);
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                                            {...register('name')}
                                            size='lg'
                                            variant='login'
                                            type='text'
                                            placeholder='Имя'
                                        />
                                        {errors.name && (
                                            <FormErrorMessage mt={1} fontSize='xs' fontWeight={400}>
                                                {errors.name.message}
                                            </FormErrorMessage>
                                        )}
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
                                        {errors.lastName && (
                                            <FormErrorMessage mt={1} fontSize='xs' fontWeight={400}>
                                                {errors.lastName.message}
                                            </FormErrorMessage>
                                        )}
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel>Ваш e-mail</FormLabel>
                                        <InputGroup size='lg'>
                                            <Input
                                                {...register('email')}
                                                variant='login'
                                                type='email'
                                                placeholder='e-mail'
                                            />
                                        </InputGroup>
                                        {errors.email && (
                                            <FormErrorMessage mt={1} fontSize='xs' fontWeight={400}>
                                                {errors.email.message}
                                            </FormErrorMessage>
                                        )}
                                    </FormControl>
                                </VStack>
                            </TabPanel>
                            <TabPanel>
                                <VStack spacing={6}>
                                    <FormControl>
                                        <FormLabel>Логин для входа на сайт</FormLabel>
                                        <InputGroup size='lg'>
                                            <Input
                                                {...register('login')}
                                                variant='login'
                                                type='text'
                                                placeholder='Введите логин'
                                            />
                                        </InputGroup>
                                        <FormHelperText
                                            mt={1}
                                            textAlign='left'
                                            color='text.light'
                                            fontSize='xs'
                                            fontWeight={400}
                                        >
                                            {(errors.login?.type === 'min' ||
                                                errors.login?.type === 'required' ||
                                                errors.login?.type === 'max') &&
                                                'Логин не менее 5 символов, только латиница'}
                                            {errors.login?.type === 'matches' &&
                                                'Логин не менее 5 символов, только латиница и !@#$&_+-'}
                                        </FormHelperText>
                                        {errors.login && (
                                            <FormErrorMessage mt={1} fontSize='xs' fontWeight={400}>
                                                {errors.login.message}
                                            </FormErrorMessage>
                                        )}
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel>Пароль</FormLabel>
                                        <InputGroup size='lg'>
                                            <Input
                                                {...register('password')}
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
                                        <FormHelperText
                                            mt={1}
                                            textAlign='left'
                                            color='text.light'
                                            fontSize='xs'
                                            fontWeight={400}
                                        >
                                            {errors.password &&
                                                'Пароль не менее 8 символов, только латиница и !@#$&_+-'}
                                        </FormHelperText>
                                        {errors.password && (
                                            <FormErrorMessage mt={1} fontSize='xs' fontWeight={400}>
                                                {errors.password.message}
                                            </FormErrorMessage>
                                        )}
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel>Повторите пароль</FormLabel>
                                        <InputGroup size='lg'>
                                            <Input
                                                {...register('confirmPassword')}
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
                                        {errors.confirmPassword && (
                                            <FormErrorMessage mt={1} fontSize='xs' fontWeight={400}>
                                                {errors.confirmPassword.message}
                                            </FormErrorMessage>
                                        )}
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
