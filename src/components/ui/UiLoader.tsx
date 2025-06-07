import { Flex, Spinner } from '@chakra-ui/react';

import loader from '~/assets/ui/loader_bg.png';

export const UiLoader = ({ testId }: { testId?: string }) => (
    <Flex
        data-test-id={testId}
        w='134px'
        h='134px'
        bgImage={loader}
        bgSize='cover'
        alignItems='center'
        justifyContent='center'
        borderRadius='50%'
        position='absolute'
        left={0}
        bottom={0}
        top={0}
        right={0}
        mx='auto'
        my='auto'
    >
        <Spinner size='lg' color='black' />
    </Flex>
);
