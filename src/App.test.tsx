import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

test('no text in main page', () => {
  const { queryByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(queryByText(/learn/i)).not.toBeInTheDocument();
});
