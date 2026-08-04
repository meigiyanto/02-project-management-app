import { render, screen } from '@testing-library/react';
import SignInPage from './page';

vi.mock('@clerk/nextjs', () => ({
  SignIn: ({ path }: { path?: string }) => <div data-testid="sign-in">SignIn:{path}</div>,
}));

describe('SignInPage', () => {
  it('renders the Clerk SignIn component with the expected path prop', () => {
    render(<SignInPage />);

    expect(screen.getByTestId('sign-in')).toHaveTextContent('SignIn:/sign-in');
  });
});
