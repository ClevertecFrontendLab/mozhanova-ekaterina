import { useToast as useChakraToast, UseToastOptions } from '@chakra-ui/react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

export const useToast = () => {
    const toast = useChakraToast();
    const styles: Record<ToastType, UseToastOptions> = {
        error: {
            containerStyle: {
                bg: 'error.400',
                borderRadius: 'unset',
                w: {
                    base: '328px',
                    md: '400px',
                },
            },
        },
        success: {},
        warning: {},
        info: {},
    };

    const showToast = (type: ToastType, title: string, description: string) =>
        toast({
            title: title,
            description: description,
            status: type,
            duration: 3000,
            isClosable: true,
            variant: 'solid',
            ...styles[type],
        });
    return {
        showError: (title: string, description: string) => showToast('error', title, description),
        showSuccess: (title: string, description: string) =>
            showToast('success', title, description),
    };
};
