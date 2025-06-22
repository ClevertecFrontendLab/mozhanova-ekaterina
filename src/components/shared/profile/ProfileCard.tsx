import { Card, CardBody } from '@chakra-ui/react';
import { Link } from 'react-router';

import { routeHelpers } from '~/utils/get-routes';

import { ProfileInfo } from './ProfileInfo';

export const ProfileCard = ({
    id,
    firstName,
    lastName,
    login,
    photo,
}: {
    id: string;
    firstName: string;
    lastName: string;
    login: string;
    photo: string;
}) => (
    <Link to={routeHelpers.getBlogPath(id)}>
        <Card>
            <CardBody px={{ base: 4, md: 6 }} py={{ base: 2, md: 4 }}>
                <ProfileInfo
                    photoLink={photo}
                    firstName={firstName}
                    lastName={lastName}
                    login={login}
                />
            </CardBody>
        </Card>
    </Link>
);
