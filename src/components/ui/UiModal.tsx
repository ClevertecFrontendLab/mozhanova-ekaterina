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
    onClose: () => void;
};
export const UiModal = ({ isOpen, onClose, header, body, footer, image }: Props) => (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
            <Image
                w={{ base: '106px', md: '206px' }}
                h={{ base: '106px', md: '206px' }}
                src={image}
                mx='auto'
            />
            <ModalHeader>{header}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>{body}</ModalBody>
            <ModalFooter>{footer}</ModalFooter>
        </ModalContent>
    </Modal>
);
