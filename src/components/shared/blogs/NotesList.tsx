import { Grid, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { useState } from 'react';

import { UiButton } from '~/components/ui/UiButton';
import { BREAKPOINTS_VALUES } from '~/constants/breakpoints-config';
import { DATA_TEST_IDS } from '~/constants/test-ids';
import { useWindowSize } from '~/hooks/use-window-size';
import { Note } from '~/types';

import { NoteCard } from './NoteCard';

export const NotesList = ({
    notes,
    ref,
}: {
    notes: Note[];
    ref: (node: HTMLDivElement) => void;
}) => {
    const { width } = useWindowSize();
    const slicedNotes = width < BREAKPOINTS_VALUES.sm ? notes.slice(0, 2) : notes.slice(0, 3);
    const [notesToShow, setShowNotes] = useState(slicedNotes);
    const showToggleButton = notes.length !== slicedNotes.length;

    const toggleNotes = () => {
        setShowNotes(notesToShow.length === notes.length ? slicedNotes : notes);
    };

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
            <Heading fontSize={{ base: '20px' }}>
                Заметки {` `}
                <Text
                    data-test-id={DATA_TEST_IDS.BLOGGER_USER_NOTES_COUNT}
                    display='inline-block'
                    color='text.secondary'
                >
                    {`(${notes.length})`}
                </Text>
            </Heading>
            {notes.length > 0 ? (
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
                                notesLength={notes.length}
                                note={note}
                            />
                        ))}
                    </SimpleGrid>
                    {showToggleButton ? (
                        notesToShow.length < notes.length ? (
                            <UiButton
                                data-test-id={DATA_TEST_IDS.BLOGGER_USER_NOTES_BUTTON}
                                text='Показать больше'
                                variant='ghost'
                                size={{ base: 'xs', md: 'sm' }}
                                onClick={toggleNotes}
                            />
                        ) : (
                            <UiButton
                                text='Свернуть'
                                variant='ghost'
                                size={{ base: 'xs', md: 'sm' }}
                                onClick={toggleNotes}
                            />
                        )
                    ) : null}
                </>
            ) : null}
        </Grid>
    );
};
