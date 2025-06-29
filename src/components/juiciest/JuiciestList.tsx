import { memo } from 'react';

import { useSaveRecipe } from '~/query/hooks/use-save-recipe';
import { Recipe } from '~/types';

import { UiCard } from '../ui/UiCard';

export const JuiciestList = memo(({ data }: { data?: Recipe[] }) => {
    const { handleSave } = useSaveRecipe();

    if (!data) return null;
    return (
        <>
            {data.map((recipe, i) => (
                <UiCard
                    index={i}
                    key={recipe._id}
                    data={recipe}
                    size='lg'
                    recommendation='Елена Высоцкая'
                    onSave={handleSave}
                />
            ))}
        </>
    );
});
