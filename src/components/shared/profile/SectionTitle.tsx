import { Heading } from '@chakra-ui/react';

export const SectionTitle = ({ children }: { children?: React.ReactNode }) => (
    <Heading fontSize={{ base: '18px', md: '20px' }}>{children}</Heading>
);
