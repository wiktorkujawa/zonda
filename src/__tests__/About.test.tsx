import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import About from '../pages/About';

test('text in about page', () => {
  const { getByText } = render(
    <Provider store={store}>
      <About />
    </Provider>
  );

  expect(getByText('About the page')).toBeInTheDocument();
});
