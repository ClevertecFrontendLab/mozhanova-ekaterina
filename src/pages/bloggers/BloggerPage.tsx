import { Box, Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

import { Hero } from '~/components/shared/blogs/Hero';
import { UiButton } from '~/components/ui/UiButton';
import { UiCardGrid } from '~/components/ui/UiCardGrid';
import { NOTIFICATION_MESSAGES } from '~/constants/notification-config';
import { useToast } from '~/hooks/use-toast';
import { useGetBloggerByIdQuery } from '~/query/blogs-api';
import { useGetRecipesByUserIdQuery } from '~/query/recipe-api';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { selectCurrentUserId } from '~/store/selectors';
import { setUser } from '~/store/user-slice';

export const BloggerPage = () => {
    const { bloggerId } = useParams();
    const dispatch = useAppDispatch();
    const currentUserId = useAppSelector(selectCurrentUserId);
    const navigate = useNavigate();
    const { showError } = useToast();

    const { data: blogger, isError } = useGetBloggerByIdQuery(
        {
            bloggerId,
            currentUserId,
        },
        { skip: !bloggerId || !currentUserId },
    );

    const { data: recipes } = useGetRecipesByUserIdQuery({ bloggerId }, { skip: !bloggerId });

    useEffect(() => {
        if (isError) {
            showError(NOTIFICATION_MESSAGES.SERVER_ERROR);
            navigate(-1);
        }
    }, [isError, showError, navigate]);

    useEffect(() => {
        if (blogger) {
            dispatch(setUser(blogger.bloggerInfo));
        }
    }, [blogger, dispatch]);

    if (!blogger) return null;
    return (
        <Box
            as='main'
            padding={{
                base: '16px 16px 32px',
                md: '56px 20px 0',
                lg: '56px 24px 0',
            }}
        >
            <Hero blogger={blogger} />
            <UiCardGrid data={recipes?.recipes} />
            <Flex justifyContent='center' mt={4} mb={10}>
                <UiButton
                    // data-test-id={DATA_TEST_IDS.LOAD_MORE_BUTTON}
                    // onClick={loadMore}
                    size='md'
                    text='Загрузка'
                    variant='primary'
                />
            </Flex>
        </Box>
    );
};
