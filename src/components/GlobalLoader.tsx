import { Box, Flex, Spinner } from '@chakra-ui/react';

import bg from '~/assets/ui/loader_bg.png';
import { useAppSelector } from '~/store/hooks';
import { selectGlobalLoading } from '~/store/selectors';

export const GlobalLoader = () => {
    const isLoading = useAppSelector(selectGlobalLoading);

    if (!isLoading) return null;

    return (
        <Box
            data-test-id='app-loader'
            position='fixed'
            top='0'
            left='0'
            right='0'
            bottom='0'
            display='flex'
            alignItems='center'
            justifyContent='center'
            zIndex={2000}
            bg='rgba(0, 0, 0, 0.16)'
            css={{
                backdropFilter: 'blur(4px)',
            }}
        >
            <Flex
                minW={{
                    base: '134px',
                    sm: '206px',
                }}
                h={{
                    base: '134px',
                    sm: '206px',
                }}
                bgImage={bg}
                bgSize='cover'
                alignItems='center'
                justifyContent='center'
                borderRadius='50%'
            >
                <Spinner
                    size={{
                        base: 'lg',
                        sm: 'xl',
                    }}
                    color='black'
                />
            </Flex>
        </Box>
    );
};
