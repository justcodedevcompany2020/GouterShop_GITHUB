import React from 'react';
import { Provider } from 'react-redux';
import NavigationMenu from './src/navigation/NavigationMenu';
import { store } from './src/store/configureStore';

function App() {

  return (
    <Provider store={store}>
      <NavigationMenu />
    </Provider>
  );
}

export default App;
