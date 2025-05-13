import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router';

import { Router } from './app/router/Router';
import { ModalProvider } from './contexts/modal-context';
import theme from './theme';

function App() {
    return (
        <BrowserRouter>
            <ChakraProvider theme={theme}>
                <ModalProvider>
                    <Router />
                </ModalProvider>
            </ChakraProvider>
        </BrowserRouter>
    );
}

export default App;

//Сверстаны: Главная страница, страница Веганская кухня, страница Самое сочное,
