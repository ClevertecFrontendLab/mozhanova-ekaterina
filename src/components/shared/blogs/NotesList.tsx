import { Grid, Heading, SimpleGrid, Text } from '@chakra-ui/react';

import { UiButton } from '~/components/ui/UiButton';
import { DATA_TEST_IDS } from '~/constants/test-ids';
import { useToggleNotes } from '~/hooks/use-toggle-notes';
import { NoteDto } from '~/types';

import { NoteCard } from './NoteCard';

export const NotesList = ({
    notes,
    ref,
}: {
    notes: NoteDto[];
    ref?: (node: HTMLDivElement) => void;
}) => {
    const { notesToHide, notesToShow, hasMore, toggleNotes } = useToggleNotes(notes);

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
            <Heading fontSize={{ base: '20px', md: '36px' }} fontWeight={400}>
                Заметки <wbr />
                <Text
                    as='span'
                    data-test-id={DATA_TEST_IDS.BLOGGER_USER_NOTES_COUNT}
                    color='text.secondary'
                >
                    ({notes.length})
                </Text>
            </Heading>
            {notes.length > 0 && (
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
                    {hasMore && (
                        <UiButton
                            data-test-id={DATA_TEST_IDS.BLOGGER_USER_NOTES_BUTTON}
                            text={
                                notesToShow.length === notes.length ? 'Свернуть' : 'Показать больше'
                            }
                            variant='ghost'
                            size={{ base: 'xs', md: 'sm' }}
                            onClick={toggleNotes}
                        />
                    )}
                </>
            )}
        </Grid>
    );
};
