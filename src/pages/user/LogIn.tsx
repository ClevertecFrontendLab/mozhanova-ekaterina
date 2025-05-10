import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    SimpleGrid,
    Text,
    VStack,
} from '@chakra-ui/react';
import { Link } from 'react-router';

import { UiButton } from '~/components/ui/UiButton';
import { useToast } from '~/hooks/use-toast';

export const LogIn = () => {
    const { showError } = useToast();

    return (
        <div>
            <form
            //  onSubmit={}
            >
                <VStack spacing={6}>
                    <FormControl>
                        <FormLabel>Логин для входа на сайт</FormLabel>
                        <Input variant='login' type='email' placeholder='Введите логин' />
                        <FormErrorMessage></FormErrorMessage>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Пароль</FormLabel>
                        <Input variant='login' type='password' placeholder='Пароль для сайта' />
                        <FormErrorMessage></FormErrorMessage>
                    </FormControl>
                </VStack>

                <SimpleGrid columns={1} mt='112px' spacing={4}>
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
                        text='Войти'
                        size='lg'
                    />

                    <Link to=''>
                        <Text textAlign='center' fontWeight={600}>
                            Забыли логин или пароль?
                        </Text>
                    </Link>
                </SimpleGrid>
            </form>
        </div>
    );
};
