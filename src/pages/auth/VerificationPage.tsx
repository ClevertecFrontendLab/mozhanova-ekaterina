import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import { NOTIFICATION_MESSAGES } from '~/constants/notification-config';
import { AppRoutes } from '~/constants/routes-config';
import { useModalContext } from '~/contexts/modal-context';
import { useToast } from '~/hooks/use-toast';

export const VerificationPage = () => {
    const { showSuccess } = useToast();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const emailVerified = searchParams.get('emailVerified');
    const { showVerificationFailed } = useModalContext();

    useEffect(() => {
        const verificationStatus = emailVerified === 'true';
        if (verificationStatus) {
            showSuccess(NOTIFICATION_MESSAGES.VERIFICATION_SUCCESS);
            navigate(AppRoutes.SIGN_IN);
        } else {
            showVerificationFailed();
            navigate(AppRoutes.SIGN_UP);
        }
    }, []);
    return null;
};
