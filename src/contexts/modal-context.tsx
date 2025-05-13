// contexts/modal-context.tsx
import { createContext, useContext } from 'react';

import { useModal } from '../hooks/use-modal';

type ModalContextType = ReturnType<typeof useModal>;

const ModalContext = createContext<ModalContextType | null>(null);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
    const modal = useModal();

    return (
        <ModalContext.Provider value={modal}>
            {children}
            <modal.ModalComponent />
        </ModalContext.Provider>
    );
};

export const useModalContext = () => {
    const context = useContext(ModalContext);
    if (!context) throw new Error('Use ModalContext outside provider!');
    return context;
};
