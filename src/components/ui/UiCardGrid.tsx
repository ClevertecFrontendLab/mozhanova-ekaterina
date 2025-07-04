import { SimpleGrid } from '@chakra-ui/react';
import { memo } from 'react';

import { useBreakpoint } from '~/hooks/use-breakpoint';
import { useEditRecipe } from '~/hooks/use-edit-recipe';
import { useDeleteDraft } from '~/query/hooks/use-delete-draft';
import { useDeleteRecipe } from '~/query/hooks/use-delete-recipe';
import { useSaveRecipe } from '~/query/hooks/use-save-recipe';
import { Recipe, RecipeDraftDto } from '~/types';

import { UiCard } from '../ui/UiCard';

type Props = {
    data: Recipe[] | RecipeDraftDto[];
    dataTest: string;
    isDraft: boolean;
    editable: boolean;
    isBookmark: boolean;
};

export const UiCardGrid = memo(
    ({ data = [], dataTest, isDraft, editable, isBookmark }: Partial<Props>) => {
        const [isLargerThanMD] = useBreakpoint('md');
        const { handleSave } = useSaveRecipe();
        const { handleEdit } = useEditRecipe(isDraft);
        const { handleDelete: handleDeleteRecipe } = useDeleteRecipe();
        const { handleDelete: handleDeleteDraft } = useDeleteDraft();
        const handleDelete = isDraft ? handleDeleteDraft : handleDeleteRecipe;

        if (data.length === 0) return null;
        return (
            <SimpleGrid
                data-test-id={dataTest}
                rowGap={4}
                columnGap={6}
                columns={{
                    base: 1,
                    sm: 2,
                    md: 1,
                    lg: 2,
                }}
            >
                {data.map((recipe, i) => (
                    <UiCard
                        data-test-id={`food-card-${i}`}
                        key={i}
                        data={recipe}
                        index={i}
                        categoryBgColor='secondary.100'
                        size={isLargerThanMD ? 'lg' : 'sm'}
                        isDraft={isDraft}
                        isBookmark={isBookmark}
                        onSave={handleSave}
                        onEdit={editable ? handleEdit : undefined}
                        onDelete={editable ? handleDelete : undefined}
                    />
                ))}
            </SimpleGrid>
        );
    },
);
