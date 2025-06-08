import { Flex, ResponsiveValue } from '@chakra-ui/react';

import { getBgByName } from '~/utils/get-bg-by-name';
import { getColorBrightness } from '~/utils/get-color-brightness';

export const UiInitialsAvatar = ({
    name,
    size,
}: {
    name: string[];
    size: ResponsiveValue<string>;
}) => (
    <Flex
        align='center'
        justify='center'
        w={size}
        h={size}
        rounded='full'
        fontWeight='bold'
        fontSize={{ base: '14px', md: '16px' }}
        bg={getBgByName(name[0])}
        color={getColorBrightness(name[0])}
    >
        {name[0] && name[0][0].toUpperCase()}
        {name[1] && name[1][0].toUpperCase()}
    </Flex>
);
