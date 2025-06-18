import { Box, Grid, Heading, SimpleGrid, Text, useDisclosure } from '@chakra-ui/react';

import { PencilIcon } from '~/components/ui/icons/PencilIcon';
import { UiButton } from '~/components/ui/UiButton';
import { useToggleNotes } from '~/hooks/use-toggle-notes';
import { NoteDto } from '~/types';

import { NoteCard } from '../blogs/NoteCard';
import { NotesDrawer } from './NotesDrawer';

export const NotesList = ({ notes = [] }: { notes?: NoteDto[] }) => {
    const { notesToHide, notesToShow, hasMore, toggleNotes } = useToggleNotes(notes);
    const { onClose, onOpen, isOpen } = useDisclosure();

    return (
        <Grid p={{ base: 4, md: 6 }} bg='neutral.10' borderRadius='16px' gap={4}>
            <Heading
                display='flex'
                alignItems='center'
                justifyContent='space-between'
                fontSize={{ base: '18px', md: '20px' }}
                fontWeight={700}
            >
                <Box>
                    Заметки <wbr />
                    <Text as='span' fontWeight={400} color='text.secondary'>
                        ({notes.length})
                    </Text>
                </Box>
                <UiButton
                    onClick={onOpen}
                    variant='outline'
                    leftIcon={<PencilIcon />}
                    text='Новая заметка'
                />
            </Heading>
            {notes.length > 0 && (
                <>
                    <SimpleGrid
                        columns={{ base: notes.length === 1 ? 1 : 6, md: 6 }}
                        gap={{ base: 3, md: 4 }}
                    >
                        {notesToShow.map((note, index) => (
                            <NoteCard
                                index={index}
                                key={note.date}
                                note={note}
                                notesLength={notesToShow.length}
                                editable
                            />
                        ))}
                        {notesToHide.map((note, index) => (
                            <NoteCard
                                key={note.date}
                                index={index}
                                notesLength={notesToShow.length}
                                isVisible={false}
                                note={note}
                            />
                        ))}
                    </SimpleGrid>
                </>
            )}
            {hasMore && (
                <UiButton
                    text={notesToShow.length === notes.length ? 'Свернуть' : 'Показать больше'}
                    variant='ghost'
                    size={{ base: 'xs', md: 'sm' }}
                    onClick={toggleNotes}
                />
            )}
            <NotesDrawer isOpen={isOpen} onClose={onClose} />
        </Grid>
    );
};
