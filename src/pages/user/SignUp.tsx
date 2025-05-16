import {
    Box,
    FormLabel,
    Progress,
    SimpleGrid,
    TabPanel,
    TabPanels,
    Tabs,
    VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { UiButton } from '~/components/ui/UiButton';
import { UiInput } from '~/components/ui/UiInput';
import { useModalContext } from '~/contexts/modal-context';
import { useToast } from '~/hooks/use-toast';
import { useSignUpMutation } from '~/query/user-api';
import { TErrorResponse, TFormInputs } from '~/types';
import { RegistrationSchema } from '~/validation';

export const SignUp = () => {
    const { showError } = useToast();
    const { showEmailSent } = useModalContext();

    const steps = [
        { description: 'Шаг 1. Личная информация' },
        { description: 'Шаг 2. Логин и пароль' },
    ];
    const [activeStep, setActiveStep] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const allFields: (keyof TFormInputs)[] = useMemo(
        () => ['name', 'lastName', 'login', 'email', 'password', 'passwordConfirm'],
        [],
    );
    const fieldsToValidate: (keyof TFormInputs)[] = useMemo(
        () =>
            activeIndex === 0
                ? ['name', 'lastName', 'email']
                : ['login', 'password', 'passwordConfirm'],
        [activeIndex],
    );

    const progressPercent = (activeStep / allFields.length) * 100;

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors, isValid, dirtyFields },
    } = useForm({
        resolver: yupResolver(RegistrationSchema),
        mode: 'onChange',
    });

    const validFields = allFields.filter((field) => !errors[field] && dirtyFields[field]);
    const isNextDisabled = !fieldsToValidate.every((field) => validFields.includes(field));

    useEffect(() => {
        setActiveStep(validFields.length);
    }, [validFields]);

    const handleNext = async () => {
        setActiveIndex(1);
    };

    const [signIn] = useSignUpMutation();

    const onSubmit = async (userData: TFormInputs) => {
        try {
            const result = await signIn(userData).unwrap();
            if (result) {
                showEmailSent(getValues('email'));
            }
        } catch (error: unknown) {
            const response = error as TErrorResponse;
            response.data
                ? showError(response.data?.message, '', 15000)
                : showError('Ошибка сервера', 'Попробуйте немного позже', 15000);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={6}>
                <Box w='full'>
                    <FormLabel>{steps[activeIndex].description}</FormLabel>
                    <Progress hasStripe h='8px' value={progressPercent} />
                </Box>

                <Tabs index={activeIndex} w='full'>
                    <TabPanels>
                        <TabPanel>
                            <VStack spacing={6}>
                                <UiInput
                                    label='Ваше имя'
                                    placeholder='Имя'
                                    error={errors.name}
                                    {...register('name')}
                                />
                                <UiInput
                                    label='Ваша фамилия'
                                    placeholder='Фамилия'
                                    error={errors.lastName}
                                    {...register('lastName')}
                                />
                                <UiInput
                                    type='email'
                                    label='Ваш e-mail'
                                    placeholder='e-mail'
                                    error={errors.email}
                                    {...register('email')}
                                />
                            </VStack>
                        </TabPanel>
                        <TabPanel>
                            <VStack spacing={6}>
                                <UiInput
                                    label='Логин для входа на сайт'
                                    placeholder='Введите логин'
                                    helperText='Логин не менее 5 символов, только латиница, цифры и !@#$&_+-'
                                    error={errors.login}
                                    {...register('login')}
                                />
                                <UiInput
                                    type='password'
                                    label='Пароль'
                                    placeholder='Пароль для сайта'
                                    helperText='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                                    error={errors.password}
                                    {...register('password')}
                                />
                                <UiInput
                                    type='password'
                                    label='Повторите пароль'
                                    placeholder='Повторите пароль'
                                    error={errors.passwordConfirm}
                                    {...register('passwordConfirm')}
                                />
                            </VStack>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </VStack>

            <SimpleGrid columns={1} mt={12} spacing={4}>
                {activeIndex === 0 ? (
                    <UiButton
                        isDisabled={isNextDisabled}
                        onClick={handleNext}
                        variant='solid'
                        text='Дальше'
                        size='lg'
                    />
                ) : (
                    <UiButton
                        isDisabled={!isValid}
                        type='submit'
                        variant='solid'
                        text='Зарегистрироваться'
                        size='lg'
                    />
                )}
            </SimpleGrid>
        </form>
    );
};
