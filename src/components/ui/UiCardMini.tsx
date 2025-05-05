import { Box, Flex, Heading, Image } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router';

import { ApplicationState } from '~/store/configure-store';
import { selectRecipeCategories } from '~/store/selectors';
import { TRecipe } from '~/types';

import { UiButton } from './UiButton';

export function UiCardMini({ data: { title, categoriesIds, _id } }: { data: TRecipe }) {
    const { category, subCategory } = useParams();

    const rootCategories = useSelector((state: ApplicationState) =>
        selectRecipeCategories(state, categoriesIds),
    );
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
            <Image
                src={`https://training-api.clevertec.ru${rootCategories[0]?.icon}`}
                alt='category icon'
            />

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
                <Link
                    to={`/${category || rootCategories.map((c) => c?.category)[0]}/${subCategory || rootCategories.map((c) => c?.subCategories[0]?.category)[0]}/${_id}`}
                >
                    <UiButton fontSize='12px' text='Готовить' variant='accentOutline' />
                </Link>
            </Box>
        </Flex>
    );
}
