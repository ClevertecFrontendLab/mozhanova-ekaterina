import { Heading } from '@chakra-ui/react';

export const StatisticsTitle = ({
    icon,
    children,
}: {
    icon: React.ReactElement;
    children?: React.ReactNode;
}) => (
    <Heading
        display='flex'
        gap={1.5}
        alignItems='center'
        color='primary.400'
        fontSize='12px'
        fontWeight={600}
    >
        {icon}
        {children}
    </Heading>
);
