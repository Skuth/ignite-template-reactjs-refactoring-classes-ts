import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './routes';

import { FoodsProvider } from './hooks/FoodContext';

import GlobalStyle from './styles/global';

const App = () => (
  <>
    <GlobalStyle />
    <Router>
      <FoodsProvider>
        <Routes />
      </FoodsProvider>
    </Router>
  </>
);

export default App;
