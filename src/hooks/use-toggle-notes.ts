import { useEffect, useState } from 'react';

import { BREAKPOINTS_VALUES } from '~/constants/breakpoints-config';
import { Note } from '~/types';

import { useWindowSize } from './use-window-size';

export const useToggleNotes = (notes: Note[]) => {
    const { width } = useWindowSize();
    const slicedNotes = width < BREAKPOINTS_VALUES.sm ? notes.slice(0, 2) : notes.slice(0, 3);
    const [notesToShow, setShowNotes] = useState(slicedNotes);
    const notesToHide = notes.slice(slicedNotes.length);
    const showToggleButton = notes.length !== slicedNotes.length;

    const toggleNotes = () => {
        setShowNotes(notesToShow.length === notes.length ? slicedNotes : notes);
    };

    useEffect(() => {
        setShowNotes(slicedNotes);
    }, [notes]);

    return { notesToShow, notesToHide, showToggleButton, toggleNotes };
};
