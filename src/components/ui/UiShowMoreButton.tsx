import { Flex } from '@chakra-ui/react';

import { DATA_TEST_IDS } from '~/constants/test-ids';

import { UiButton } from './UiButton';

type Props = {
    onShowMore: VoidFunction;
    ref?: React.RefObject<HTMLButtonElement | null>;
    text?: string;
};

export const UiShowMoreButton = ({ onShowMore, ref, text = 'Загрузить еще' }: Props) => (
    <Flex justifyContent='center' mt={4}>
        <UiButton
            data-test-id={DATA_TEST_IDS.LOAD_MORE_BUTTON}
            onClick={onShowMore}
            ref={ref}
            size='md'
            text={text}
            variant='primary'
        />
    </Flex>
);
