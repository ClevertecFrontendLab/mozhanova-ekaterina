import { Box, Flex, Spinner } from '@chakra-ui/react';

import bg from '~/assets/ui/loader_bg.png';
import { DATA_TEST_IDS } from '~/constants/test-ids';
import { Z_INDEX_CONFIG } from '~/constants/z-index-config';
import { useAppSelector } from '~/store/hooks';
import { selectGlobalLoading } from '~/store/selectors';

export const GlobalLoader = () => {
    const isLoading = useAppSelector(selectGlobalLoading);

    if (!isLoading) return null;

    return (
        <Box
            data-test-id={DATA_TEST_IDS.APP_LOADER}
            position='fixed'
            top='0'
            left='0'
            right='0'
            bottom='0'
            display='flex'
            alignItems='center'
            justifyContent='center'
            zIndex={Z_INDEX_CONFIG.GLOBAL_LOADER}
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
