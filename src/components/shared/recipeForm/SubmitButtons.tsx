import { EditIcon } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/react';

import { UiButton } from '~/components/ui/UiButton';
import { DATA_TEST_IDS } from '~/constants/test-ids';

export const SubmitButtons = ({
    saveDraft,
    onSubmit,
}: {
    saveDraft: VoidFunction;
    onSubmit: VoidFunction;
}) => (
    <Flex gap={5} direction={{ base: 'column', sm: 'row' }} justify='center'>
        <UiButton
            zIndex={32}
            size='lg'
            leftIcon={<EditIcon />}
            variant='outline'
            text='Сохранить черновик'
            onClick={saveDraft}
            data-test-id={DATA_TEST_IDS.RECIPE_SAVE_DRAFT_BUTTON}
        />
        <UiButton
            zIndex={32}
            size='lg'
            variant='solid'
            text='Опубликовать рецепт'
            onClick={onSubmit}
            data-test-id={DATA_TEST_IDS.RECIPE_PUBLISH_RECIPE_BUTTON}
        />
    </Flex>
);
