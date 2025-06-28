import { Box, Heading } from '@chakra-ui/react';

export const StatisticsTitle = ({
    icon,
    children,
}: {
    icon: React.ReactElement;
    children?: React.ReactNode;
}) => (
    <Heading
        as='p'
        display='flex'
        gap={1.5}
        alignItems='center'
        color='primary.400'
        fontSize='12px'
        fontWeight={600}
    >
        <Box as='span' color='neutral.400'>
            {icon}
        </Box>
        {children}
    </Heading>
);
