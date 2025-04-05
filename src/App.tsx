import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router';

import { Router } from './app/router/Router';
import theme from './theme';

function App() {
    return (
        <BrowserRouter>
            <ChakraProvider theme={theme}>
                <Router />
            </ChakraProvider>
        </BrowserRouter>
    );
}

export default App;

//Сверстаны: Главная страница, страница Веганская кухня, страница Самое сочное,
