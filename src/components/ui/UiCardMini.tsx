import { Box, Flex, Heading, Image } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';

import { API_IMAGE_URL } from '~/config';
import { ApplicationState } from '~/store/configure-store';
import { selectRecipeCategories, selectRecipeSubCategories } from '~/store/selectors';
import { TRecipe } from '~/types';
import { routeHelpers } from '~/utils/get-routes';

import { UiButton } from './UiButton';

export const UiCardMini = ({ data: { title, categoriesIds, _id } }: { data: TRecipe }) => {
    const subCategories = useSelector((state: ApplicationState) =>
        selectRecipeSubCategories(state, categoriesIds),
    );
    const rootCategoriesIds = useMemo(
        () =>
            (Array.isArray(subCategories) &&
                subCategories?.map((category) => category.rootCategoryId!)) ||
            [],
        [subCategories],
    );

    const rootCategories = useSelector((state: ApplicationState) =>
        selectRecipeCategories(state, rootCategoriesIds),
    );

    const categoryRoute = rootCategories[0]?.category ?? '';
    const subCategoryRoute = subCategories[0]?.category ?? '';

    return (
        <Flex
            transition='box-shadow 0.3s ease-in-out'
            _hover={{
                shadow: 'themeNeutralGreen',
            }}
            borderWidth='1px'
            borderColor='border.light'
            borderRadius='8px'
            p={{
                base: '10px 12px',
                xl: '12px 24px',
            }}
            alignItems='center'
            gap={{
                base: 2,
                md: 3,
            }}
        >
            <Image src={`${API_IMAGE_URL}${rootCategories[0]?.icon}`} alt='category icon' />

            <Heading
                fontSize={{
                    base: 'md',
                    md: 'xl',
                }}
                fontWeight='500'
                textOverflow='ellipsis'
                whiteSpace='nowrap'
                overflowX='hidden'
                flexGrow={1}
            >
                {title}
            </Heading>
            <Box flexBasis='70px'>
                <Link to={routeHelpers.getRecipePath(categoryRoute, subCategoryRoute, _id)}>
                    <UiButton fontSize='12px' text='Готовить' variant='accentOutline' />
                </Link>
            </Box>
        </Flex>
    );
};
