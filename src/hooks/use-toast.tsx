import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    CloseButton,
    ToastPosition,
    useToast as useChakraToast,
} from '@chakra-ui/react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

export const useToast = () => {
    const toast = useChakraToast();

    const showToast = (
        type: ToastType,
        title?: string,
        description?: string,
        duration: number = 3000,
        position: ToastPosition = 'bottom',
    ) =>
        toast({
            duration: duration,
            position: position,
            render: ({ onClose }) => (
                <Alert
                    w={{ base: '328px', md: '400px' }}
                    data-test-id='error-notification'
                    variant='solid'
                    status={type}
                >
                    <AlertIcon />
                    <Box flexGrow={1}>
                        <AlertTitle>{title}</AlertTitle>
                        <AlertDescription>{description}</AlertDescription>
                    </Box>
                    <CloseButton
                        alignSelf='flex-start'
                        data-test-id='close-alert-button'
                        onClick={onClose}
                    />
                </Alert>
            ),
        });
    return {
        showError: (
            title?: string,
            description?: string,
            duration?: number,
            position?: ToastPosition,
        ) => showToast('error', title, description, duration, position),
        showSuccess: (
            title?: string,
            description?: string,
            duration?: number,
            position?: ToastPosition,
        ) => showToast('success', title, description, duration, position),
    };
};
