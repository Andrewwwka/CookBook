import '@testing-library/jest-dom';
import 'whatwg-fetch'; // This adds fetch to the Jest environment

// Also helpful for Next.js 15
import { TextEncoder, TextDecoder } from 'util';
Object.assign(global, { TextDecoder, TextEncoder });

jest.mock('@/lib/firebase', () => ({
    auth: {
      onAuthStateChanged: jest.fn(() => jest.fn()), // Mock unsubscribe
      signOut: jest.fn(),
    },
    db: {}, // Mock Firestore if you use it
  }));

  jest.mock('firebase/firestore', () => ({
    getFirestore: jest.fn(),
    doc: jest.fn(),
    setDoc: jest.fn(),
    deleteDoc: jest.fn(),
    getDoc: jest.fn(() => Promise.resolve({ exists: () => false })),
  }));
  
  jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(),
    onAuthStateChanged: jest.fn(() => jest.fn()),
    signOut: jest.fn(),
  }));