import { EditIcon } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/react';

import { DATA_TEST_IDS } from '~/constants/test-ids';

import { UiButton } from '../ui/UiButton';

export const SubmitButtons = ({ saveDraft }: { saveDraft: () => void }) => (
    <Flex gap={5} direction={{ base: 'column', sm: 'row' }} justify='center'>
        <UiButton
            size='lg'
            leftIcon={<EditIcon />}
            variant='outline'
            text='Сохранить черновик'
            onClick={saveDraft}
            data-test-id={DATA_TEST_IDS.RECIPE_SAVE_DRAFT_BUTTON}
        />
        <UiButton
            size='lg'
            variant='solid'
            text='Опубликовать рецепт'
            type='submit'
            data-test-id={DATA_TEST_IDS.RECIPE_PUBLISH_RECIPE_BUTTON}
        />
    </Flex>
);
