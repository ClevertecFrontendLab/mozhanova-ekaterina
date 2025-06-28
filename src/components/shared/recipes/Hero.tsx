import { Card, CardBody, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import { ClockIcon } from '~/components/ui/icons/ClockIcon';
import { UiCardBadge } from '~/components/ui/UiCardBadge';
import { UiCardStats } from '~/components/ui/UiCardStats';
import { useBreakpoint } from '~/hooks/use-breakpoint';
import { API_IMAGE_URL } from '~/query/constants/api-config';
import { ApplicationState } from '~/store/configure-store';
import { selectRecipeCategoriesIds } from '~/store/selectors';
import { Recipe } from '~/types';

import { Controls } from './Controls';

type Props = {
    recipe: Recipe;
    onSave: VoidFunction;
    onLike: VoidFunction;
    onEdit: VoidFunction;
    onDelete: VoidFunction;
};

export const Hero = ({ recipe, onSave, onLike, onEdit, onDelete }: Props) => {
    const [isLargerThanLG] = useBreakpoint('lg');

    const rootCategoriesIds = useSelector((state: ApplicationState) =>
        selectRecipeCategoriesIds(state, recipe.categoriesIds),
    );

    return (
        <Card
            borderColor='transparent !important'
            boxShadow='none !important'
            _hover={{ boxShadow: 'none !important' }}
            gap={{
                base: 4,
                md: 6,
            }}
            direction={{
                base: 'column',
                sm: 'row',
            }}
            shadow='none'
            mb={{
                base: 6,
                lg: 10,
            }}
        >
            <Image
                objectFit='cover'
                borderRadius='8px'
                src={`${API_IMAGE_URL}/${recipe.image}`}
                alt='recipe'
                w={{
                    base: '',
                    sm: '232px',
                    md: '353px',
                    lg: '553px',
                }}
            />
            <CardBody
                p={0}
                borderRadius='8px'
                overflow='hidden'
                display='flex'
                flexDirection='column'
            >
                <Flex justifyContent='space-between'>
                    <Flex
                        wrap='wrap'
                        gap={{
                            base: 2,
                            md: 4,
                        }}
                    >
                        {rootCategoriesIds.length > 0 &&
                            rootCategoriesIds.map((item) => (
                                <UiCardBadge color='secondary.100' key={item} categoryId={item} />
                            ))}
                    </Flex>
                    <UiCardStats
                        size={isLargerThanLG ? 'md' : 'sm'}
                        bookmarks={recipe?.bookmarks}
                        likes={recipe?.likes}
                    />
                </Flex>
                <Heading
                    mt={10}
                    mb={{
                        base: 4,
                        md: 6,
                    }}
                    maxW='500px'
                    fontSize={{
                        base: '2xl',
                        md: '5xl',
                    }}
                    fontWeight='700'
                >
                    {recipe?.title}
                </Heading>
                <Text flexGrow={1} mb={6} fontSize='sm'>
                    {recipe?.description}
                </Text>
                <Flex
                    direction={{
                        base: 'column',
                        sm: 'row',
                    }}
                    gap={3}
                    justifyContent='space-between'
                    alignItems={{
                        base: 'flex-start',
                        sm: 'flex-end',
                    }}
                >
                    <Flex
                        bg='neutral.20'
                        borderRadius='4px'
                        gap={2}
                        p='2px 8px'
                        alignItems='center'
                        h='fit-content'
                    >
                        <ClockIcon />
                        <Text whiteSpace='nowrap' fontSize='sm'>
                            {recipe.time} минут
                        </Text>
                    </Flex>
                    <Controls
                        authorId={recipe.authorId}
                        onSave={onSave}
                        onLike={onLike}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                </Flex>
            </CardBody>
        </Card>
    );
};
