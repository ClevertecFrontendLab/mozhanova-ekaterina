import { Card, CardBody, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import { API_IMAGE_URL } from '~/constants/api-config';
import { useBreakpoint } from '~/hooks/use-breakpoint';
import { ApplicationState } from '~/store/configure-store';
import { selectRecipeCategoriesIds } from '~/store/selectors';
import { Recipe } from '~/types';

import { BookmarkHeartIcon } from '../ui/icons/BookmarkHeartIcon';
import { ClockIcon } from '../ui/icons/ClockIcon';
import { EmojiHeartEyesIcon } from '../ui/icons/EmojiHeartEyesIcon';
import { UiButton } from '../ui/UiButton';
import { UiCardBadge } from '../ui/UiCardBadge';
import { UiCardStats } from '../ui/UiCardStats';

export const Hero = ({ recipe }: { recipe: Recipe }) => {
    const [isLargerThanLG] = useBreakpoint('lg');

    const rootCategoriesIds = useSelector((state: ApplicationState) =>
        selectRecipeCategoriesIds(state, recipe.categoriesIds),
    );

    return (
        <Card
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
            <CardBody p={0} borderRadius='8px' overflow='hidden'>
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
                    <Controls />
                </Flex>
            </CardBody>
        </Card>
    );
};

function Controls() {
    return (
        <Flex gap={{ base: 3, lg: 4 }}>
            <UiButton
                size={{
                    base: 'xs',
                    md: 'sm',
                    lg: 'lg',
                }}
                variant='primaryOutline'
                leftIcon={<EmojiHeartEyesIcon />}
                text='Оценить рецепт'
            />
            <UiButton
                size={{
                    base: 'xs',
                    md: 'sm',
                    lg: 'lg',
                }}
                variant='primary'
                leftIcon={<BookmarkHeartIcon />}
                text='Сохранить в закладки'
            />
        </Flex>
    );
}
