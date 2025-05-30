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
import { useNavigate } from 'react-router';

import { UiButton } from '~/components/ui/UiButton';
import { UiInput } from '~/components/ui/UiInput';
import { UiLoginInput } from '~/components/ui/UiLoginInput';
import { UiPasswordInput } from '~/components/ui/UiPasswordInput';
import { AppRoutes } from '~/constants/routes-config';
import { DATA_TEST_IDS } from '~/constants/test-ids';
import { useModalContext } from '~/contexts/modal-context';
import { useErrors } from '~/hooks/use-errors';
import { useSignUpMutation } from '~/query/user-api';
import { ErrorResponse, FormInputs, NewUser } from '~/types';
import { RegistrationSchema } from '~/validation';

export const SignUp = () => {
    const { showSignUpSuccess } = useModalContext();
    const navigate = useNavigate();

    const steps = [
        { description: 'Шаг 1. Личная информация' },
        { description: 'Шаг 2. Логин и пароль' },
    ];
    const [activeStep, setActiveStep] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const allFields: (keyof Omit<FormInputs, 'code'>)[] = useMemo(
        () => ['name', 'lastName', 'login', 'email', 'password', 'passwordConfirm'],
        [],
    );
    const fieldsToValidate: (keyof Omit<FormInputs, 'code'>)[] = useMemo(
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
        watch,
        setValue,
        trigger,
        formState: { errors, isValid, dirtyFields },
    } = useForm({
        resolver: yupResolver(RegistrationSchema),
        mode: 'onChange',
    });

    const validFields = allFields.filter((field) => !errors[field] && dirtyFields[field]);

    useEffect(() => {
        setActiveStep(validFields.length);
    }, [validFields]);

    const handleNext = async () => {
        if (fieldsToValidate.every((field) => validFields.includes(field))) {
            setActiveIndex(1);
        } else {
            await trigger(fieldsToValidate);
        }
    };

    const [signIn] = useSignUpMutation();
    const { signUpErrorHandler } = useErrors();

    const onSubmit = async (userData: NewUser) => {
        if (!isValid) return;
        try {
            await signIn(userData).unwrap();
            showSignUpSuccess(getValues('email'));
            navigate(AppRoutes.SIGN_IN);
        } catch (error: unknown) {
            signUpErrorHandler(error as ErrorResponse);
        }
    };

    return (
        <form data-test-id={DATA_TEST_IDS.SIGN_UP_FORM} onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={6}>
                <Box w='full'>
                    <FormLabel>{steps[activeIndex].description}</FormLabel>
                    <Progress
                        data-test-id={DATA_TEST_IDS.SIGN_UP_PROGRESS}
                        hasStripe
                        h='8px'
                        value={progressPercent}
                    />
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
                                    data-test-id={DATA_TEST_IDS.FIRST_NAME_INPUT}
                                    setValue={(value: string) => setValue('name', value)}
                                    value={watch('name')}
                                />
                                <UiInput
                                    label='Ваша фамилия'
                                    placeholder='Фамилия'
                                    error={errors.lastName}
                                    {...register('lastName')}
                                    data-test-id={DATA_TEST_IDS.LAST_NAME_INPUT}
                                    setValue={(value: string) => setValue('lastName', value)}
                                    value={watch('lastName')}
                                />
                                <UiInput
                                    type='email'
                                    label='Ваш e-mail'
                                    placeholder='e-mail'
                                    error={errors.email}
                                    {...register('email')}
                                    data-test-id={DATA_TEST_IDS.EMAIL_INPUT}
                                    setValue={(value: string) => setValue('email', value)}
                                    value={watch('email')}
                                />
                            </VStack>
                        </TabPanel>
                        <TabPanel>
                            <VStack spacing={6}>
                                <UiLoginInput
                                    error={errors.login}
                                    {...register('login')}
                                    data-test-id={DATA_TEST_IDS.LOGIN_INPUT}
                                    setValue={(value: string) => setValue('login', value)}
                                    value={watch('login')}
                                />
                                <UiPasswordInput
                                    label='Пароль'
                                    placeholder='Пароль для сайта'
                                    helperText='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                                    error={errors.password}
                                    {...register('password')}
                                    data-test-id={DATA_TEST_IDS.PASSWORD_INPUT}
                                />
                                <UiPasswordInput
                                    label='Повторите пароль'
                                    placeholder='Повторите пароль'
                                    error={errors.passwordConfirm}
                                    {...register('passwordConfirm')}
                                    data-test-id={DATA_TEST_IDS.CONFIRM_PASSWORD_INPUT}
                                />
                            </VStack>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </VStack>

            <SimpleGrid columns={1} mt={12} spacing={4}>
                {activeIndex === 0 ? (
                    <UiButton
                        onClick={handleNext}
                        variant='solid'
                        text='Дальше'
                        size='lg'
                        data-test-id={DATA_TEST_IDS.SUBMIT_BUTTON}
                    />
                ) : (
                    <UiButton
                        type='submit'
                        variant='solid'
                        text='Зарегистрироваться'
                        size='lg'
                        data-test-id={DATA_TEST_IDS.SUBMIT_BUTTON}
                    />
                )}
            </SimpleGrid>
        </form>
    );
};
