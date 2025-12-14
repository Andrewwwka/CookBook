'use client';

import {useState } from 'react';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';

interface isFirebaseAuthError {
  code: string;
  message: string;
}

const isFirebaseAuthError = (e: unknown): e is isFirebaseAuthError => {
  return typeof e === 'object' && 
  e !== null && 
  'code' in e && 
  'message' in e};

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        setLoading(true);

        if (!email || !password) {
          setError('Please enter both email and password');
          setLoading(false);
          return;
        }

        try {
          await signInWithEmailAndPassword(auth, email, password);
          console.log('Login successful');
          router.push('/');
        }
        catch (error) {
          if (isFirebaseAuthError(error)) {
            console.error('Firebase Auth Error:', error.code, error.message);
            
            switch (error.code) {
              case 'auth/user-not-found':
              case 'auth/wrong-password':
              case 'auth/invalid-credential':
                setError('Invalid email or password');
                break;
              default:
                setError('Login failed. Please try again.');
            }      
          } else {
            console.log('Unknown error during login:', error);
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
          Login to CookBook
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
            {loading ? 'Loggin In...' : 'Login'}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Dont have an account?{' '}
          <Link href="/signup" className="font-medium hover:underline font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  );
}