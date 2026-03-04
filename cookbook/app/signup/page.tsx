'use client';

import {useState } from 'react';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Signup page with form for email, password, and confirm password. Validates that passwords match, creates a new user with Firebase Authentication, saves user data to Firestore, and redirects to login page on success. Includes error handling and loading state management.


export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);

        try {
          const credential = (await createUserWithEmailAndPassword(
            auth, 
            email, 
            password
          )) as UserCredential;

          const user = credential.user;

          console.log('User created with UID:', user.uid);

        await setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          savedRecipeIds: [],
          createdAt: new Date().toISOString(),
        });

        router.push('/login');
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError('An unknown error occurred');
          }
        } finally {
          setLoading(false);
        }
    };

    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className=" max-w-md bg-white p-8 rounded-xl shadow-2xl">
        
        <h1 className="text-4xl font-serif font-bold text-center text-headerBrown mb-6">
          Create Your Cookbook Account
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-headerBrown focus:border-headerBrown"
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-headerBrown focus:border-headerBrown"
            />
          </div>
          
          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-headerBrown focus:border-headerBrown"
            />
          </div>
          {/* Error Message */}
          {error && (
            <p className="text-sm text-red-600 font-medium text-center">{error}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`flex justify-center mt-8 w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white transition ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed text-gray-700' 
                : 'bg-black'
            }`}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="font-medium font-semibold hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </main>
  );
}