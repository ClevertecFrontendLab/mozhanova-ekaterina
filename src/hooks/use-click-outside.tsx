import { useEffect, useState } from 'react';

export const useClickOutside = (trigger: boolean) => {
    const [clickedLink, setClickedLink] = useState('');
    const base = import.meta.env.BASE_URL;

    useEffect(() => {
        if (!trigger) return;
        const handleClick = (event: MouseEvent) => {
            const link = (event.target as Element)?.closest('a');

            if (link) {
                event.preventDefault();
                event.stopPropagation();
                event.stopImmediatePropagation();

                let path = link.pathname;

                if (base && path.startsWith(base)) {
                    path = path.slice(base.length);
                }

                setClickedLink(path || '/');
            }
        };

        document.addEventListener('click', handleClick, true);

        return () => {
            console.log('test');

            document.removeEventListener('click', handleClick, true);
        };
    }, [trigger]);

    return { clickedLink, setClickedLink };
};
