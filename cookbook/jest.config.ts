import nextJest from 'next/jest.js';

const createJestConfig = nextJest({ 
  // This tells Next.js to look at the folder where this config file sits
  dir: './' 
});

const config = {
  // Try using the relative path without <rootDir> if the alias is failing
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup.ts'], 
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  testMatch: ['**/__tests__/**/*.test.{ts,tsx}', '**/__tests__/**/*.spec.{ts,tsx}'],
};

export default createJestConfig(config);