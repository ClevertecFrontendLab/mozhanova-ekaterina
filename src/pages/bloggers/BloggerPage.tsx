import { Flex, Grid } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';

import { Hero } from '~/components/shared/blogs/Hero';
import { NotesList } from '~/components/shared/blogs/NotesList';
import { UiButton } from '~/components/ui/UiButton';
import { UiCardGrid } from '~/components/ui/UiCardGrid';
import { NOTIFICATION_MESSAGES } from '~/constants/notification-config';
import { useToast } from '~/hooks/use-toast';
import { useGetBloggerByIdQuery } from '~/query/blogs-api';
import { useGetRecipesByUserIdQuery } from '~/query/recipe-api';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { selectCurrentUserId } from '~/store/selectors';
import { setBlogger } from '~/store/user-slice';

export const BloggerPage = () => {
    const { bloggerId } = useParams();
    const dispatch = useAppDispatch();
    const currentUserId = useAppSelector(selectCurrentUserId);
    const navigate = useNavigate();
    const { showError } = useToast();
    const hash = useLocation().hash;

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
            dispatch(setBlogger(blogger.bloggerInfo));
        }
    }, [blogger, dispatch]);

    useEffect(() => {
        if (hash) {
            document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [hash]);

    if (!blogger || !recipes) return null;
    return (
        <Grid
            as='main'
            gap={{ base: 8, md: 10 }}
            padding={{
                base: '16px 16px 32px',
                md: '56px 20px 0',
                lg: '56px 24px 0',
            }}
        >
            <>
                <Hero blogger={blogger} />
                <UiCardGrid data={recipes?.recipes} />
                <Flex justifyContent='center' mt={4} mb={10}>
                    <UiButton
                        // data-test-id={DATA_TEST_IDS.LOAD_MORE_BUTTON}
                        // onClick={loadMore}
                        size='md'
                        text='Загрузить еще'
                        variant='primary'
                    />
                </Flex>
            </>
            <NotesList notes={blogger.bloggerInfo.notes || []} />
        </Grid>
    );
};
