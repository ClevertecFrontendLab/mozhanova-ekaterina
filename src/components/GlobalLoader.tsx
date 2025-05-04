import { Box, Flex, Spinner } from '@chakra-ui/react';

import { useAppSelector } from '~/store/hooks';
import { selectGlobalLoading } from '~/store/selectors';

export function GlobalLoader() {
    const isLoading = useAppSelector(selectGlobalLoading);

    return isLoading ? (
        <Box
            position='fixed'
            top='0'
            left='0'
            right='0'
            bottom='0'
            display='flex'
            alignItems='center'
            justifyContent='center'
            zIndex={200}
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
                bgImage='/src/assets/ui/loader_bg.png'
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
    ) : null;
}
