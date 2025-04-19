import { SearchIcon } from '@chakra-ui/icons';
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
    useMediaQuery,
} from '@chakra-ui/react';
import { useState } from 'react';

import { SortIcon } from '~/components/ui/icons/SortIcon';

type Props = {
    title: string;
    description?: string;
};

export function PageToolbar({ title, description }: Props) {
    const [isLargerThanMD] = useMediaQuery('(min-width: 769px)');
    const [searchOnFocus, setSearchOnFocus] = useState(false);

    return (
        <Flex
            shadow={
                searchOnFocus
                    ? '0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                    : 'unset'
            }
            transition='shadow 0.3s ease-in-out'
            borderRadius={{ base: '0 0 8px 8px', lg: '24px' }}
            mb={{
                base: 4,
                lg: 6,
            }}
            direction='column'
            alignItems='center'
            maxW={{
                sm: '480px',
                md: '578px',
                lg: '898px',
            }}
            mx='auto'
            p={{
                base: 4,
                md: '32px 0',
            }}
        >
            <Heading
                as='h1'
                fontSize={{
                    base: '24px',
                    md: '48px',
                }}
                fontWeight='700'
            >
                {title}
            </Heading>
            {description && (
                <Text
                    fontSize={{
                        base: 'sm',
                        lg: 'md',
                    }}
                    textAlign='center'
                    color='neutral.200'
                    mt={{
                        base: 4,
                        lg: 3,
                    }}
                    maxW='696px'
                >
                    {description}
                </Text>
            )}
            <Flex
                gap={3}
                mt={{
                    base: 4,
                    md: 8,
                }}
            >
                <IconButton
                    aria-label='Сортировка'
                    size={isLargerThanMD ? 'lg' : 'sm'}
                    borderColor='border.dark'
                    variant='outline'
                    icon={<SortIcon />}
                />
                <Box
                    position='relative'
                    w={{
                        base: '284px',
                        sm: '404px',
                        md: '458px',
                    }}
                >
                    <Input
                        onFocus={() => setSearchOnFocus(true)}
                        onBlur={() => setSearchOnFocus(false)}
                        focusBorderColor='primary.300'
                        size={{
                            base: 'sm',
                            md: 'lg',
                        }}
                        borderRadius={{
                            base: '4px',
                            md: '6px',
                        }}
                        placeholder='Название или ингредиент...'
                        color='primary.700'
                        borderColor='border.dark'
                        _placeholder={{ color: 'inherit' }}
                    />
                    <Flex
                        alignItems='center'
                        justifyContent='center'
                        position='absolute'
                        right={{ base: '9px', md: '16px' }}
                        top='0'
                        bottom='0'
                    >
                        <SearchIcon
                            w={{
                                base: '14px',
                                md: '18px',
                            }}
                            h={{
                                base: '14px',
                                md: '18px',
                            }}
                        />
                    </Flex>
                </Box>
            </Flex>

            {isLargerThanMD && (
                <Flex alignItems='center' gap={4} mt='18px' justifyContent='space-between'>
                    <Flex pl='8px' gap='12px' alignItems='center'>
                        <FormLabel fontWeight='500' m='0' htmlFor='allergens' whiteSpace='nowrap'>
                            Исключить мои аллергены
                        </FormLabel>
                        <Switch id='allergens' />
                    </Flex>

                    <Select
                        focusBorderColor='primary.300'
                        w='234px'
                        color='text.secondary'
                        placeholder='Выберите из списка...'
                    >
                        <option value='option1'>Option 1</option>
                        <option value='option2'>Option 2</option>
                        <option value='option3'>Option 3</option>
                    </Select>
                </Flex>
            )}
        </Flex>
    );
}
