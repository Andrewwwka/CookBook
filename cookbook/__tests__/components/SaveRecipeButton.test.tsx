import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SaveRecipeButton from '@/components/SaveRecipeButton';
import { AuthContext, AuthContextType } from '@/context/AuthContext';
import { authenticatedContext, loggedOutContext } from '../mocks/authMock';
import { Meal } from '@/lib/themealdb';

// Mock the Router
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
    useRouter: () => ({ push: mockPush }),
}));

// Mock Firestore
jest.mock('firebase/firestore', () => ({
    collection: jest.fn(),
    addDoc: jest.fn(() => Promise.resolve()),
    serverTimestamp: jest.fn(),
    getFirestore: jest.fn(),
}));

const mockMeal = ({
  idMeal: '52772',
  strMeal: 'Teriyaki Chicken',
  strMealThumb: 'https://www.themealdb.com/images/teriyaki.jpg',
  strCategory: 'Chicken',
  strArea: 'Japanese',
  strInstructions: 'Cook it.',
} as unknown) as Meal;

describe('SaveRecipeButton', () => {
    it('shows the save button and calls router.push if user is logged out', async () => {
        // Mock the window.alert because your component uses it
        window.alert = jest.fn();

        render(
            <AuthContext.Provider value={loggedOutContext as AuthContextType}>
                <SaveRecipeButton meal={mockMeal} />
            </AuthContext.Provider>
        );
        
        const button = screen.getByRole('button', { name: /save to my cookbook/i });
        fireEvent.click(button);

        expect(mockPush).toHaveBeenCalledWith('/login');
    });

    it('shows "Saving..." when the button is clicked', async () => {
        render(
            <AuthContext.Provider value={authenticatedContext as AuthContextType}>
                <SaveRecipeButton meal={mockMeal} />
            </AuthContext.Provider>
        );

        const button = screen.getByRole('button', { name: /save to my cookbook/i });
        fireEvent.click(button);

        expect(button).toHaveTextContent('Saving...');
    });
});