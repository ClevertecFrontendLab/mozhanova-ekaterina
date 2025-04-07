import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Flex, Heading, Text } from '@chakra-ui/react';
import { Link } from 'react-router';

import { UiButton } from './ui/UiButton';

type Props = {
    title: string;
    description?: string;
    linkTo?: string;
    buttonText?: string;
};

export function SectionHeading({ title, description, linkTo, buttonText }: Props) {
    return (
        <Flex justifyContent='space-between' alignItems='center' gap='24px'>
            <Heading flexBasis='50%' as='h2' fontSize='48px' fontWeight='500'>
                {title}
            </Heading>
            <Flex basis='50%' justifyContent='flex-end' alignItems='center'>
                {description && (
                    <Text fontWeight='500' color='text.secondary'>
                        {description}
                    </Text>
                )}
                {linkTo && buttonText && (
                    <Link to={linkTo}>
                        <UiButton
                            variant='primary'
                            rightIcon={<ArrowForwardIcon />}
                            text={buttonText}
                            size='lg'
                        />
                    </Link>
                )}
            </Flex>
        </Flex>
    );
}
