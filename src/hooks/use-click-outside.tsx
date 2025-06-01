import { useEffect, useState } from 'react';

export const useClickOutside = (trigger: boolean) => {
    const [clickedLink, setClickedLink] = useState('');
    useEffect(() => {
        if (!trigger) return;
        const handleClick = (event: MouseEvent) => {
            const link = (event.target as Element)?.closest('a');

            if (link) {
                event.preventDefault();
                event.stopPropagation();
                event.stopImmediatePropagation();

                setClickedLink(link.pathname);
            }
        };

        document.addEventListener('click', handleClick, true);

        return () => {
            console.log('cleanup');
            document.removeEventListener('click', handleClick, true);
        };
    }, [trigger]);

    return { clickedLink, setClickedLink };
};
