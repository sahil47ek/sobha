'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setAuthenticated } from '@/store/features/adminSlice';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';
import { LockClosedIcon } from '@heroicons/react/24/outline';

export default function Login() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const admin = useAppSelector((state) => state.admin);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (password === admin.password) {
        // Set authentication in Redux store
        dispatch(setAuthenticated(true));
        
        // Set authentication cookie
        Cookies.set('adminAuth', 'true', { expires: 1 }); // Expires in 1 day
        
        // Show success message
        toast.success('Welcome back!');
        
        // Redirect to admin dashboard
        router.push('/admin');
        router.refresh(); // Force a refresh to ensure middleware picks up the new cookie
      } else {
        throw new Error('Invalid password');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-primary/10">
      <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center mb-8">
            <Image
              src="/images/sobha-logo.png"
              alt="Sobha Logo"
              width={200}
              height={70}
              className="h-16 w-auto"
              priority
            />
          </div>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white/80 backdrop-blur-sm pt-8 pb-12 px-4 shadow-2xl sm:rounded-xl sm:px-10 border border-primary/10">
            <div className="flex justify-center mb-6">
              <div className="bg-primary/10 rounded-full p-3">
                <LockClosedIcon className="h-6 w-6 text-primary" />
              </div>
            </div>
            
            <h2 className="mb-8 text-center text-2xl font-semibold text-gray-900">
              Admin Portal
            </h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-black hover:bg-primary-dark hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 ${
                    isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02]'
                  }`}
                >
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </button>
              </div>
            </form>
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>Protected Area • Sobha Real Estate</p>
          </div>
        </div>
      </div>
    </div>
  );
} 