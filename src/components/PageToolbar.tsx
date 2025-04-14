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

import { SortIcon } from '~/components/ui/icons/SortIcon';

type Props = {
    title: string;
    description?: string;
};

export function PageToolbar({ title, description }: Props) {
    const [isLargerThanMD] = useMediaQuery('(min-width: 769px)');

    return (
        <Flex
            mt={{
                base: 4,
                lg: 0,
            }}
            mb={{
                base: 8,
                lg: 6,
            }}
            direction='column'
            alignItems='center'
            w='100%'
            p={{
                base: 0,
                lg: '32px 100px',
            }}
        >
            <Heading
                as='h1'
                fontSize={{
                    base: '24px',
                    lg: '48px',
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
                        size='md'
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
