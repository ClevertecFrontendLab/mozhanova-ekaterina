import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import { AppRoutes } from '~/config';
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
            showSuccess('Верификация прошла успешно', '', 15000, 'bottom-left');
            navigate(AppRoutes.SIGN_IN);
        } else {
            showVerificationFailed();
            navigate(AppRoutes.SIGN_UP);
        }
    }, [navigate, showSuccess, showVerificationFailed, emailVerified]);
    return null;
};
