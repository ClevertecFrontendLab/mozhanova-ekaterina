import { SimpleGrid } from '@chakra-ui/react';
import { memo, useEffect, useState } from 'react';

import { useBreakpoint } from '~/hooks/use-breakpoint';
import { useEditRecipe } from '~/hooks/use-edit-recipe';
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
        const [recipes, setRecipes] = useState<Recipe[] | RecipeDraftDto[]>([]);
        const { handleSave } = useSaveRecipe();
        const { handleEdit } = useEditRecipe(isDraft);

        const onSave = (id: string) => {
            handleSave(id);
            setRecipes((prev) => prev.filter((recipe) => recipe._id !== id));
        };

        useEffect(() => {
            setRecipes(data);
        }, [data]);

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
                {recipes.map((recipe, i) => (
                    <UiCard
                        data-test-id={`food-card-${i}`}
                        key={i}
                        data={recipe}
                        index={i}
                        categoryBgColor='secondary.100'
                        size={isLargerThanMD ? 'lg' : 'sm'}
                        isDraft={isDraft}
                        editable={editable}
                        isBookmark={isBookmark}
                        onSave={onSave}
                        onEdit={handleEdit}
                    />
                ))}
            </SimpleGrid>
        );
    },
);
