import { Search2Icon } from '@chakra-ui/icons';
import {
    Box,
    Flex,
    FormLabel,
    Heading,
    IconButton,
    Input,
    Select,
    Switch,
    Text,
} from '@chakra-ui/react';

import { SortIcon } from '~/components/ui/icons/SortIcon';

type Props = {
    title: string;
    description?: string;
};

export function PageToolbar({ title, description }: Props) {
    return (
        <Flex
            direction='column'
            alignItems='center'
            maxW='898px'
            margin='0 auto'
            padding='32px 100px'
        >
            <Heading as='h1' fontSize='48px' fontWeight='700'>
                {title}
            </Heading>
            {description && (
                <Text textAlign='center' color='neutral.200' mt='12px'>
                    {description}
                </Text>
            )}
            <Flex gap='12px' mt='32px'>
                <IconButton
                    aria-label='Сортировка'
                    size='lg'
                    borderColor='border.dark'
                    variant='outline'
                    icon={<SortIcon />}
                ></IconButton>
                <Box position='relative'>
                    <Input
                        size='lg'
                        placeholder='Название или ингредиент...'
                        fontSize='18px'
                        color='primary.700'
                        width='458px'
                        borderWidth='1px'
                        borderColor='border.dark'
                        _placeholder={{ color: 'inherit' }}
                    />
                    <Flex
                        alignItems='center'
                        justifyContent='center'
                        position='absolute'
                        right='0'
                        top='0'
                        bottom='0'
                        width='48px'
                        height='48px'
                    >
                        <Search2Icon />
                    </Flex>
                </Box>
            </Flex>

            <Flex alignItems='center' gap='16px' mt='18px' justifyContent='space-between'>
                <Flex pl='8px' gap='12px' alignItems='center'>
                    <FormLabel fontWeight='500' margin='0' htmlFor='allergens'>
                        Исключить мои аллергены
                    </FormLabel>
                    <Switch id='allergens' />
                </Flex>

                <Select
                    width='234px'
                    height='40px'
                    color='text.secondary'
                    placeholder='Выберите из списка...'
                >
                    <option value='option1'>Option 1</option>
                    <option value='option2'>Option 2</option>
                    <option value='option3'>Option 3</option>
                </Select>
            </Flex>
        </Flex>
    );
}
