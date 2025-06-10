import { EditIcon } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/react';
import { ErrorResponse, useNavigate, useParams } from 'react-router';

import { NOTIFICATION_MESSAGES } from '~/constants/notification-config';
import { DATA_TEST_IDS } from '~/constants/test-ids';
import { useErrors } from '~/hooks/use-errors';
import { useToast } from '~/hooks/use-toast';
import {
    useDeleteRecipeMutation,
    useLikeUnlikeRecipeMutation,
    useSaveRemoveFromBookmarksMutation,
} from '~/query/recipe-api';
import { useAppSelector } from '~/store/hooks';
import { selectCurrentUserId } from '~/store/selectors';
import { routeHelpers } from '~/utils/get-routes';

import { BookmarkHeartIcon } from '../ui/icons/BookmarkHeartIcon';
import { EmojiHeartEyesIcon } from '../ui/icons/EmojiHeartEyesIcon';
import { TrashIcon } from '../ui/icons/TrashIcon';
import { UiButton } from '../ui/UiButton';

export const Controls = ({ _id, authorId }: { _id: string; authorId: string }) => {
    const navigate = useNavigate();
    const { showSuccess } = useToast();
    const { category, subCategory } = useParams();
    const { deleteRecipeErrorHandler, saveLikeRecipeErrorHandler } = useErrors();
    const [deleteRecipe] = useDeleteRecipeMutation();
    const [saveRecipe] = useSaveRemoveFromBookmarksMutation();
    const [likeRecipe] = useLikeUnlikeRecipeMutation();
    const userId = useAppSelector(selectCurrentUserId);

    const handleEdit = () => {
        if (!category || !subCategory) return;
        navigate(routeHelpers.getEditRecipePath(category, subCategory, _id));
    };
    const handleDelete = async () => {
        try {
            await deleteRecipe(_id).unwrap();
            showSuccess(NOTIFICATION_MESSAGES.DELETE_RECIPE_SUCCESS);
        } catch (error) {
            deleteRecipeErrorHandler(error as ErrorResponse);
        }
    };
    const handleSave = async () => {
        try {
            await saveRecipe(_id).unwrap();
        } catch (error) {
            saveLikeRecipeErrorHandler(error as ErrorResponse);
        }
    };
    const handleLike = async () => {
        try {
            await likeRecipe(_id).unwrap();
        } catch (error) {
            saveLikeRecipeErrorHandler(error as ErrorResponse);
        }
    };

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
                        onClick={handleDelete}
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
                        onClick={handleEdit}
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
                        onClick={handleLike}
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
                        onClick={handleSave}
                    />
                </Flex>
            )}
        </>
    );
};
