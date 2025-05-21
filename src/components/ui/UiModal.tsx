import {
    Box,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react';

type Props = {
    isOpen: boolean;
    image?: string;
    header?: React.ReactNode;
    body?: React.ReactNode;
    footer?: React.ReactNode;
    'data-test-id'?: string;
    onClose: () => void;
};
export const UiModal = ({ isOpen, onClose, header, body, footer, image, ...props }: Props) => (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent {...props}>
            {image && (
                <Box pb={8}>
                    <Image
                        w={{ base: '106px', md: '206px' }}
                        h={{ base: '106px', md: '206px' }}
                        src={image}
                        mx='auto'
                    />
                </Box>
            )}

            {header && (
                <ModalHeader pt={0} pb={4}>
                    {header}
                </ModalHeader>
            )}
            <ModalCloseButton size='sm' top={6} right={6} data-test-id='close-button' />
            {body && <ModalBody p={0}>{body}</ModalBody>}
            {footer && (
                <ModalFooter flexDirection='column' pt={6} pb={0}>
                    {footer}
                </ModalFooter>
            )}
        </ModalContent>
    </Modal>
);
