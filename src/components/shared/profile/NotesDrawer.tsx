import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Textarea,
} from '@chakra-ui/react';

import { UiButton } from '~/components/ui/UiButton';

type Props = {
    isOpen: boolean;
    onClose: VoidFunction;
};

export const NotesDrawer = ({ isOpen, onClose }: Props) => (
    <Drawer
        size={{
            base: 'xs',
            md: 'custom',
        }}
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        variant='custom'
    >
        <DrawerOverlay />
        <DrawerContent>
            <DrawerCloseButton size='sm' />
            <DrawerHeader>Новая заметка</DrawerHeader>

            <DrawerBody>
                <Textarea
                    minH='96px'
                    css={{
                        '&[aria-invalid=true]': { boxShadow: 'none' },
                    }}
                    borderColor='border.light'
                    placeholder='максимально 160 символов'
                    _focus={{ borderColor: 'border.light', boxShadow: 'none' }}
                />
            </DrawerBody>

            <DrawerFooter>
                <UiButton size={{ base: 'sm', md: 'lg' }} variant='solid' text='Опубликовать' />
            </DrawerFooter>
        </DrawerContent>
    </Drawer>
);
