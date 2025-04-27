import { Box } from '@chakra-ui/react';
import { memo } from 'react';
import { useSelector } from 'react-redux';

import UiCardGrid from '~/components/ui/UiCardGrid';
import { selectFilteredRecipes } from '~/store/selectors';

function SearchPage() {
    const filteredRecipes = useSelector(selectFilteredRecipes);

    console.log(filteredRecipes);

    return (
        <>
            <Box
                padding={{
                    base: '0 16px',
                    md: '0 20px',
                    lg: '0 24px',
                }}
            >
                <Box mb={10}>
                    {filteredRecipes.length > 0 ? (
                        <UiCardGrid data={filteredRecipes} />
                    ) : (
                        <Box p={4}>Ничего не нашлось</Box>
                    )}
                </Box>
            </Box>
        </>
    );
}

export default memo(SearchPage);
