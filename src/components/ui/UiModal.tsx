import {
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
                <Image
                    w={{ base: '106px', md: '206px' }}
                    h={{ base: '106px', md: '206px' }}
                    src={image}
                    mx='auto'
                />
            )}
            {header && <ModalHeader>{header}</ModalHeader>}
            <ModalCloseButton data-test-id='close-button' />
            {body && <ModalBody>{body}</ModalBody>}
            {footer && <ModalFooter>{footer}</ModalFooter>}
        </ModalContent>
    </Modal>
);
