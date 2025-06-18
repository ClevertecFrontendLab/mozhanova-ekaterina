import { Flex } from '@chakra-ui/react';

import { DATA_TEST_IDS } from '~/constants/test-ids';

import { UiButton } from './UiButton';

type Props = {
    onShowMore: VoidFunction;
    ref?: React.RefObject<HTMLButtonElement | null>;
};

export const UiShowMoreButton = ({ onShowMore, ref }: Props) => (
    <Flex justifyContent='center' mt={4}>
        <UiButton
            data-test-id={DATA_TEST_IDS.LOAD_MORE_BUTTON}
            onClick={onShowMore}
            ref={ref}
            size='md'
            text='Загрузить еще'
            variant='primary'
        />
    </Flex>
);
