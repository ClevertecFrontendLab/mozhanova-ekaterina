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
import { Link, useParams } from 'react-router';

import { UiCardInfo } from '~/components/ui/UiCardInfo';
import { TRecipe } from '~/types';

type Props = {
    data: TRecipe;
};

export function SliderCard({
    data: { title, description, image, category, likes, bookmarks, subcategory, id },
}: Props) {
    const [isLargerThanMD] = useMediaQuery('(min-width: 769px)');
    const params = useParams();

    return (
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
            <Image objectFit='cover' maxW='100%' maxH='100%' src={image} alt='card image' />

            <Stack spacing={0} flexGrow={1}>
                <CardBody
                    p={{
                        base: '8px',
                        md: '12px',
                        lg: '16px 24px 24px',
                    }}
                >
                    <Link
                        to={`/${params.category || category[0]}/${params.subCategory || subcategory[0]}/${id}`}
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
                    </Link>
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
                        category={category}
                        likes={likes}
                        bookmarks={bookmarks}
                    />
                </CardFooter>
            </Stack>
        </Card>
    );
}
