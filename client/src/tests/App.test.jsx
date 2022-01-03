import { render, screen, cleanup, waitFor, fireEvent } from '@testing-library/react';

import App from '../App';

beforeEach(() => {
  render(<App />);
});

afterEach(() => {
  cleanup();
});

describe('App', () => {
  it('renders without crashing', async () => {
    await waitFor(() => {
      expect(screen.getByText(/gomoku/i)).toBeInTheDocument();
      expect(screen.getByText(/hint/i)).toBeInTheDocument();
      expect(screen.getByText(/withdraw/i)).toBeInTheDocument();
      expect(screen.getByText(/restart/i)).toBeInTheDocument();
    });    
  });
});

describe('Control', () => {
  it('withdraw', async () => {
    await waitFor(() => {
      const WithdrawButton = screen.getByText('Withdraw');
      expect(WithdrawButton).toBeInTheDocument();
      fireEvent.click(WithdrawButton);
    });
  });

  it('restart -> cancel', async () => {
    await waitFor(() => {
      const RestartButton = screen.getByText('Restart');
      expect(RestartButton).toBeInTheDocument();
      fireEvent.click(RestartButton);
      const CancelButton = screen.getByText('Cancel');
      expect(CancelButton).toBeInTheDocument();
      fireEvent.click(CancelButton);
    });
  });

  it('restart -> confirm', async () => {
    await waitFor(() => {
      const RestartButton = screen.getByText('Restart');
      expect(RestartButton).toBeInTheDocument();
      fireEvent.click(RestartButton);
      const ConfirmButton = screen.getByText('Confirm');
      expect(ConfirmButton).toBeInTheDocument();
      fireEvent.click(ConfirmButton);
    });
  });
});
