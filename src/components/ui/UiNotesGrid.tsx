import { SimpleGrid } from '@chakra-ui/react';

import { DATA_TEST_IDS } from '~/constants/test-ids';
import { useToggleNotes } from '~/hooks/use-toggle-notes';
import { NoteDto } from '~/types';

import { NoteCard } from '../shared/blogs/NoteCard';
import { UiButton } from './UiButton';

export const UiNotesGrid = ({
    notes,
    editable = false,
    onDelete,
}: {
    notes: NoteDto[];
    onDelete?: (id?: string) => void;
    editable?: boolean;
}) => {
    const { notesToHide, notesToShow, hasMore, toggleNotes } = useToggleNotes(notes);

    return (
        <>
            <SimpleGrid
                data-test-id={DATA_TEST_IDS.BLOGGER_USER_NOTES_GRID}
                columns={{ base: notes.length === 1 ? 1 : 6, md: 6 }}
                gap={{ base: 3, md: 4 }}
            >
                {notesToShow.map((note, index) => (
                    <NoteCard
                        key={note.date}
                        index={index}
                        notesLength={notesToShow.length}
                        note={note}
                        editable={editable}
                        onDelete={onDelete}
                    />
                ))}
                {notesToHide.map((note, index) => (
                    <NoteCard
                        key={note._id}
                        index={index}
                        notesLength={notesToShow.length}
                        isVisible={false}
                        note={note}
                    />
                ))}
            </SimpleGrid>
            {hasMore && (
                <UiButton
                    data-test-id={DATA_TEST_IDS.BLOGGER_USER_NOTES_BUTTON}
                    text={notesToShow.length === notes.length ? 'Свернуть' : 'Показать больше'}
                    variant='ghost'
                    size={{ base: 'xs', md: 'sm' }}
                    onClick={toggleNotes}
                />
            )}
        </>
    );
};
