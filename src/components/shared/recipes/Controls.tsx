import { EditIcon } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/react';

import { BookmarkHeartIcon } from '~/components/ui/icons/BookmarkHeartIcon';
import { EmojiHeartEyesIcon } from '~/components/ui/icons/EmojiHeartEyesIcon';
import { TrashIcon } from '~/components/ui/icons/TrashIcon';
import { UiButton } from '~/components/ui/UiButton';
import { DATA_TEST_IDS } from '~/constants/test-ids';
import { useAppSelector } from '~/store/hooks';
import { selectCurrentUserId } from '~/store/selectors';

type Props = {
    authorId: string;
    onSave: VoidFunction;
    onLike: VoidFunction;
    onEdit: VoidFunction;
    onDelete: VoidFunction;
};

export const Controls = ({ authorId, onSave, onLike, onEdit, onDelete }: Props) => {
    const userId = useAppSelector(selectCurrentUserId);

    return (
        <>
            {userId === authorId ? (
                <Flex gap={{ base: 3, lg: 4 }}>
                    <Flex
                        data-test-id={DATA_TEST_IDS.RECIPE_DELETE_BUTTON}
                        justify='center'
                        align='center'
                        as='button'
                        w={{ base: '24px', md: '32px', lg: '48px' }}
                        h={{ base: '24px', md: '32px', lg: '48px' }}
                        onClick={onDelete}
                    >
                        <TrashIcon />
                    </Flex>
                    <UiButton
                        size={{
                            base: 'xs',
                            md: 'sm',
                            lg: 'lg',
                        }}
                        variant='primaryOutline'
                        leftIcon={<EditIcon />}
                        text='Редактировать рецепт'
                        onClick={onEdit}
                    />
                </Flex>
            ) : (
                <Flex gap={{ base: 3, lg: 4 }}>
                    <UiButton
                        size={{
                            base: 'xs',
                            md: 'sm',
                            lg: 'lg',
                        }}
                        variant='primaryOutline'
                        leftIcon={<EmojiHeartEyesIcon />}
                        text='Оценить рецепт'
                        onClick={onLike}
                    />
                    <UiButton
                        size={{
                            base: 'xs',
                            md: 'sm',
                            lg: 'lg',
                        }}
                        variant='primary'
                        leftIcon={<BookmarkHeartIcon />}
                        text='Сохранить в закладки'
                        onClick={onSave}
                    />
                </Flex>
            )}
        </>
    );
};
