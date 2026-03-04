import { render, screen } from '@testing-library/react';
import Header from "@/components/Header/header";
import { AuthContext, AuthContextType } from '@/context/AuthContext'; // Path to your real context
import { authenticatedContext } from '../mocks/authMock';
import { Auth } from 'firebase/auth';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
  }),
  usePathname: () => '/',
}));

describe('Header Component', () => {
  it('renders the CookBook title', () => {
    render(
      <AuthContext.Provider value={authenticatedContext as AuthContextType}>
        <Header />
      </AuthContext.Provider>
    );
    expect(screen.getByText(/CookBook/i)).toBeInTheDocument();
  });
});