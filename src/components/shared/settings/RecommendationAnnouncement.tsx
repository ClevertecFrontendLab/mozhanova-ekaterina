import { Box, Flex, Grid, Heading, HStack, Image, Text } from '@chakra-ui/react';

import image from '~/assets/ui/recommend.png';
import { BookmarkHeartIcon } from '~/components/ui/icons/BookmarkHeartIcon';
import { PeopleOutlineIcon } from '~/components/ui/icons/PeopleOutlineIcon';
import { ThumbUpIcon } from '~/components/ui/icons/ThumbUpIcon';
import { UiButton } from '~/components/ui/UiButton';
import { useAppSelector } from '~/store/hooks';
import { selectStatisticsCounts } from '~/store/selectors';

export const RecommendationAnnouncement = () => {
    const statistics = useAppSelector(selectStatisticsCounts);
    return (
        <Flex
            position='relative'
            gap={8}
            bg='primary.100'
            p={{ base: 4 }}
            px={{ md: 6, lg: 8 }}
            py={{ md: 6 }}
            pt={{ base: 6 }}
            borderRadius='16px'
            direction={{ base: 'column', sm: 'row' }}
        >
            <Image
                mx={{ base: 'auto', sm: 'unset' }}
                w={{ base: '108px', md: '206px' }}
                h={{ base: '108px', md: '206px' }}
                src={image}
            />
            <Grid gap={{ base: 4, sm: 6 }} maxW='579px'>
                <Heading fontWeight={600} fontSize={{ base: '20px', md: '36px' }}>
                    Теперь вы можете рекомендовать рецепты
                    <p>других авторов</p>
                </Heading>
                <Text
                    fontWeight={500}
                    display='flex'
                    gap={2}
                    flexDirection={{ base: 'column', lg: 'row' }}
                >
                    Это можно будет сделать с помощью кнопки{' '}
                    <Box>
                        <UiButton
                            variant='solid'
                            text='Рекомендовать рецепт'
                            leftIcon={<ThumbUpIcon />}
                            size={{ base: 'xs', md: 'sm' }}
                            cursor='unset'
                            hover={false}
                        />
                    </Box>
                </Text>
            </Grid>
            <HStack
                position='absolute'
                right={{ base: '12px', sm: '16px' }}
                top={{ base: '12px', sm: '16px' }}
                fontWeight='600'
                color='primary.400'
                fontSize='12px'
                alignItems='center'
                spacing={2}
            >
                <Flex gap={1.5} alignItems='center'>
                    <BookmarkHeartIcon size='12px' />
                    {statistics.bookmarks}
                </Flex>
                <Flex gap={1.5} alignItems='center'>
                    <PeopleOutlineIcon />
                    {statistics.subscribersCount}
                </Flex>
            </HStack>
        </Flex>
    );
};
