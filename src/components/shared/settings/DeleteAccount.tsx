import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Grid, Text } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { NOTIFICATION_MESSAGES } from '~/constants/notification-config';
import { AppRoutes } from '~/constants/routes-config';
import { useModalContext } from '~/contexts/modal-context';
import { useToast } from '~/hooks/use-toast';
import { useDeleteProfileMutation } from '~/query/user-api';
import { resetUser } from '~/store/user-slice';

import { SectionTitle } from '../profile/SectionTitle';

export const DeleteAccount = () => {
    const { showDeleteProfile, onClose } = useModalContext();
    const [deleteProfile] = useDeleteProfileMutation();
    const { showSuccess, showError } = useToast();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleDeleteProfile = async () => {
        try {
            await deleteProfile().unwrap();
            showSuccess(NOTIFICATION_MESSAGES.DELETE_PROFILE_SUCCESS);
            onClose();
            dispatch(resetUser());
            navigate(AppRoutes.SIGN_IN);
        } catch {
            showError(NOTIFICATION_MESSAGES.SERVER_ERROR);
            onClose();
        }
    };

    const showModal = () =>
        showDeleteProfile({
            onDelete: handleDeleteProfile,
        });

    return (
        <Grid gap={4}>
            <SectionTitle>Удаление аккаунта</SectionTitle>
            <Text onClick={showModal} textAlign='left' as='button' fontWeight={500}>
                Удалить мой аккаунт <ArrowForwardIcon />
            </Text>
        </Grid>
    );
};
