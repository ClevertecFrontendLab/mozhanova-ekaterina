import { Box, Grid, Heading, Text, useDisclosure } from '@chakra-ui/react';

import { UiNotesGrid } from '~/components/ui/UiNotesGrid';
import { DATA_TEST_IDS } from '~/constants/test-ids';
import { NoteDto } from '~/types';

import { NotesDrawer } from '../shared/profile/NotesDrawer';
import { PencilIcon } from './icons/PencilIcon';
import { UiButton } from './UiButton';

export const UiNotesBox = ({
    notes = [],
    editable,
    ref,
}: {
    notes: NoteDto[];
    editable?: boolean;
    ref?: (node: HTMLDivElement) => void;
}) => {
    const { onClose, onOpen, isOpen } = useDisclosure();
    return (
        <Grid
            data-test-id={DATA_TEST_IDS.BLOG_NOTES_BOX}
            ref={ref}
            id='notes'
            gap={4}
            p={{ base: 4, md: 6 }}
            bg='neutral.10'
            borderRadius='16px'
        >
            <Heading
                display='flex'
                alignItems='center'
                justifyContent='space-between'
                fontSize={{ base: '18px', md: '20px' }}
                fontWeight={700}
                ref={ref}
            >
                <Box>
                    Заметки <wbr />
                    <Text as='span' fontWeight={400} color='text.secondary'>
                        ({notes.length})
                    </Text>
                </Box>
                {editable && (
                    <UiButton
                        onClick={onOpen}
                        variant='outline'
                        leftIcon={<PencilIcon />}
                        text='Новая заметка'
                    />
                )}
            </Heading>
            {notes.length > 0 && <UiNotesGrid editable={editable} notes={notes} />}

            <NotesDrawer isOpen={isOpen} onClose={onClose} />
        </Grid>
    );
};
