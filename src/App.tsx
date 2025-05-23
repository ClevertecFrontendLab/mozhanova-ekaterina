import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router';

import { Router } from './app/router/Router';
import { GlobalLoader } from './components/GlobalLoader';
import { ModalProvider } from './contexts/modal-context';
import theme from './theme';

function App() {
    return (
        <BrowserRouter>
            <ChakraProvider theme={theme}>
                <ModalProvider>
                    <>
                        <GlobalLoader />
                        <Router />
                    </>
                </ModalProvider>
            </ChakraProvider>
        </BrowserRouter>
    );
}

export default App;
