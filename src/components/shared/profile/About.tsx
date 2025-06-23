import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Grid, Text } from '@chakra-ui/react';
import { Link } from 'react-router';

import { BASE_URL } from '~/query/constants/api-config';

import { SectionTitle } from '../settings/SectionTitle';

export const About = () => (
    <Grid gap={4}>
        <SectionTitle>О проекте</SectionTitle>
        <Text fontWeight={500}>
            Связаться с{' '}
            <Link to={BASE_URL} target='_blank'>
                <Text as='span' fontWeight='inherit' textDecoration='underline'>
                    разработчиками <ArrowForwardIcon />
                </Text>
            </Link>
        </Text>
    </Grid>
);
