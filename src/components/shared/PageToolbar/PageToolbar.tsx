import { Flex, Heading, Text, useDisclosure, useMediaQuery } from '@chakra-ui/react';
import { useState } from 'react';

import { Allergens } from './Allergens';
import { Filters } from './Filters';
import { FiltersSlideOver } from './FiltersSlideOver';

type Props = {
    title: string;
    description?: string;
};

export function PageToolbar({ title, description }: Props) {
    const [isLargerThanMD] = useMediaQuery('(min-width: 769px)');
    const [searchOnFocus, setSearchOnFocus] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Flex
            shadow={
                searchOnFocus
                    ? '0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                    : 'unset'
            }
            transition='box-shadow 0.3s ease-in-out'
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

            <Filters onOpen={onOpen} setSearchOnFocus={setSearchOnFocus} />

            {isLargerThanMD && <Allergens />}
            <FiltersSlideOver isOpen={isOpen} onClose={onClose} />
        </Flex>
    );
}
