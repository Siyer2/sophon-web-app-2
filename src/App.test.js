import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';

describe("App", () => {
  const store = createStore(rootReducer);
  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });
});
