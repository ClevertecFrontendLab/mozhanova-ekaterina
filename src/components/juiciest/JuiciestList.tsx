import { memo } from 'react';

import { TRecipe } from '~/query/recipe-api';

import { UiCard } from '../ui/UiCard';

function JuiciestList({ data }: { data?: TRecipe[] }) {
    if (!data) return null;
    return (
        <>
            {data
                ? data.map((recipe, i) => (
                      <UiCard
                          index={i}
                          key={recipe._id}
                          data={recipe}
                          size='lg'
                          recommendation='Елена Высоцкая'
                      />
                  ))
                : null}
        </>
    );
}

export default memo(JuiciestList);
