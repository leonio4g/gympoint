import React from 'react';
import { StatusBar } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import './Config/ReactotronConfig';
import { store, persistor } from './store';
import App from './App';

export default function Index() {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StatusBar barStyle="light-content" backgroundColor="#EE4E62" />
          <App />
        </PersistGate>
      </Provider>
    </>
  );
}
