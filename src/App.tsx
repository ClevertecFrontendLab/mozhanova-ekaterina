import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';

import { Router } from './app/router/Router';
import { store } from './store/configure-store';
import theme from './theme';

function App() {
    return (
        <BrowserRouter>
            <ChakraProvider theme={theme}>
                <Provider store={store}>
                    <Router />
                </Provider>
            </ChakraProvider>
        </BrowserRouter>
    );
}

export default App;

//Сверстаны: Главная страница, страница Веганская кухня, страница Самое сочное,
