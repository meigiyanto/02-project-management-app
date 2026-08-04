import { render, screen } from '@testing-library/react';
import SignInPage from './app/sign-in/[[...sign-in]]/page';
import SignUpPage from './app/sign-up/[[...sign-up]]/page';

vi.mock('@clerk/nextjs', () => ({
  SignIn: ({ path }: { path?: string }) => <div data-testid="sign-in">SignIn:{path}</div>,
  SignUp: ({ path }: { path?: string }) => <div data-testid="sign-up">SignUp:{path}</div>,
}));

describe('auth pages', () => {
  it('renders the Clerk SignIn component with the expected path prop', () => {
    render(<SignInPage />);

    expect(screen.getByTestId('sign-in')).toHaveTextContent('SignIn:/sign-in');
  });

  it('renders the Clerk SignUp component with the expected path prop', () => {
    render(<SignUpPage />);

    expect(screen.getByTestId('sign-up')).toHaveTextContent('SignUp:/sign-up');
  });
});
