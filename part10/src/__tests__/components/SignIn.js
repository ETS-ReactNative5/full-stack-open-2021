import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';

import { SignInContainer } from "../../components/SignIn";

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const onSubmit = jest.fn();
      const { getByPlaceholderText, getByText } = render(<SignInContainer onSubmit={onSubmit} />);

      await act(async () => await fireEvent.changeText(getByPlaceholderText('Username'), 'kalle'));
      await act(async () => await fireEvent.changeText(getByPlaceholderText('Password'), 'password'));
      await act(async () => await fireEvent.press(getByText('Sign In')));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: "kalle",
          password: "password",
        });
      });
    });
  });
});