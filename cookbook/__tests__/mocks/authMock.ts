import { User } from 'firebase/auth';
import { AuthContextType } from '@/context/AuthContext';

export const authenticatedContext: AuthContextType = {
  user: {
    uid: '123',
    email: 'andrew@depaul.edu',
    displayName: 'Andrew Althoff',
  } as User, 
  loading: false,
  logout: jest.fn().mockResolvedValue(undefined),
};

// Add this for your "Guest" tests
export const loggedOutContext: AuthContextType = {
  user: null,
  loading: false,
  logout: jest.fn().mockResolvedValue(undefined),
};