import {
    Card,
    CardBody,
    CardFooter,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    useMediaQuery,
} from '@chakra-ui/react';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router';

import { UiCardInfo } from '~/components/ui/UiCardInfo';
import { API_IMAGE_URL } from '~/config';
import { ApplicationState } from '~/store/configure-store';
import { selectRecipeCategories, selectRecipeSubCategories } from '~/store/selectors';
import { TRecipe } from '~/types';

type Props = {
    data: TRecipe;
};

export const SliderCard = ({
    data: { title, description, image, categoriesIds, likes, bookmarks, _id },
}: Props) => {
    const [isLargerThanMD] = useMediaQuery('(min-width: 769px)');
    const params = useParams();

    const subCategories = useSelector((state: ApplicationState) =>
        selectRecipeSubCategories(state, categoriesIds),
    );
    const rootCategoriesIds = useMemo(
        () => subCategories.map((c) => c.rootCategoryId!),
        [subCategories],
    );

    const rootCategories = useSelector((state: ApplicationState) =>
        selectRecipeCategories(state, rootCategoriesIds),
    );

    return (
        <Link
            to={`/${params.category || rootCategories.map((c) => c?.category)[0]}/${params.subCategory || rootCategories.map((c) => c?.subCategories[0]?.category)[0]}/${_id}`}
        >
            <Card
                position='relative'
                overflow='hidden'
                variant='outline'
                transition='box-shadow 0.3s ease-in-out'
                _hover={{
                    shadow: 'themeNeutralGreen',
                }}
                h='100%'
            >
                <Image
                    objectFit='cover'
                    maxW='100%'
                    maxH='100%'
                    src={`${API_IMAGE_URL}${image}`}
                    alt='card image'
                />

                <Stack spacing={0} flexGrow={1}>
                    <CardBody
                        p={{
                            base: '8px',
                            md: '12px',
                            lg: '16px 24px 24px',
                        }}
                    >
                        <Flex
                            gap={{
                                base: 5,
                                md: 2,
                            }}
                            direction='column'
                            textAlign='left'
                        >
                            <Heading
                                as='h3'
                                fontWeight='500'
                                size={{
                                    base: 'sm',
                                    md: 'md',
                                }}
                                noOfLines={{
                                    base: 2,
                                    md: 1,
                                }}
                            >
                                {title}
                            </Heading>
                            <Text fontSize='sm' noOfLines={3}>
                                {isLargerThanMD ? description : null}
                            </Text>
                        </Flex>
                    </CardBody>

                    <CardFooter
                        p={{
                            base: '0 8px 4px',
                            md: '12px',
                            lg: '0 24px 20px',
                        }}
                    >
                        <UiCardInfo
                            categoryBgColor='primary.100'
                            categories={rootCategories.map((category) => category?._id)}
                            likes={likes}
                            bookmarks={bookmarks}
                        />
                    </CardFooter>
                </Stack>
            </Card>
        </Link>
    );
};
