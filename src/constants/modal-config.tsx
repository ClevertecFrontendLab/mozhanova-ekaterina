import { DeleteProfileModal } from '~/components/modals/DeleteProfileModal';
import { RecipePreventiveModal } from '~/components/modals/RecipePreventiveModal';
import { ResetCredentialsModal } from '~/components/modals/ResetCredentialsModal';
import { SendEmailModal } from '~/components/modals/SendEmailModal';
import { SignInErrorModal } from '~/components/modals/SignInErrorModal';
import { SignUpSuccessModal } from '~/components/modals/SignUpSuccessModal';
import { UpdatePasswordModal } from '~/components/modals/UpdatePasswordModal';
import { UploadImageModal } from '~/components/modals/UploadImageModal';
import { VerificationCodeModal } from '~/components/modals/VerificationCodeModal';
import { VerificationFailedModal } from '~/components/modals/VerificationFailedModal';

export const modalConfig = [
    {
        type: 'signUpSuccess',
        component: <SignUpSuccessModal />,
    },
    {
        type: 'verificationFailed',
        component: <VerificationFailedModal />,
    },
    {
        type: 'sendEmail',
        component: <SendEmailModal />,
    },
    {
        type: 'verificationCode',
        component: <VerificationCodeModal />,
    },
    {
        type: 'resetCredentials',
        component: <ResetCredentialsModal />,
    },
    {
        type: 'signInError',
        component: <SignInErrorModal />,
    },
    {
        type: 'uploadImage',
        component: <UploadImageModal />,
    },
    {
        type: 'recipePreventive',
        component: <RecipePreventiveModal />,
    },
    {
        type: 'updatePassword',
        component: <UpdatePasswordModal />,
    },
    {
        type: 'deleteProfile',
        component: <DeleteProfileModal />,
    },
] as const;
