import { render, screen } from '@testing-library/react';
import SignUpPage from './page';

vi.mock('@clerk/nextjs', () => ({
  SignUp: ({ path }: { path?: string }) => <div data-testid="sign-up">SignUp:{path}</div>,
}));

describe('SignUpPage', () => {
  it('renders the Clerk SignUp component with the expected path prop', () => {
    render(<SignUpPage />);

    expect(screen.getByTestId('sign-up')).toHaveTextContent('SignUp:/sign-up');
  });
});
