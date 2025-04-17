import { useEffect } from 'react';

export const useBodyScrollLock = (isLocked: boolean) => {
    useEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;

        if (isLocked) {
            document.body.classList.add('body-no-scroll');
        } else {
            document.body.classList.remove('body-no-scroll');
        }

        return () => {
            document.body.classList.remove('body-no-scroll');
            document.body.style.overflow = originalStyle;
        };
    }, [isLocked]);
};
