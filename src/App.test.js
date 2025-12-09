import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

// Mock the service
jest.mock('./services/mockDataService', () => ({
  fetchUsers: jest.fn(() => Promise.resolve([
    { id: 1, name: 'Test User', email: 'test@example.com', role: 'Developer', displayName: 'Test User (Developer)', initials: 'TU' }
  ])),
  getAvailableRoles: jest.fn(() => ['Developer', 'Designer'])
}));

test('renders user directory header', () => {
  render(<App />);
  const headerElement = screen.getByText(/user directory/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders user list after loading', async () => {
  render(<App />);
  
  await waitFor(() => {
    const userCard = screen.getByTestId(/user-card-1/i);
    expect(userCard).toBeInTheDocument();
  });
});
