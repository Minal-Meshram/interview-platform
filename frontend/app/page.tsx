'use client';

import { useRouter } from 'next/navigation';

export default function HomePage() {

  const router = useRouter();

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-10 rounded-2xl shadow-lg text-center">

        <h1 className="text-4xl font-bold mb-4 text-gray-600">
          Interview Platform
        </h1>

        <p className="text-gray-500 mb-8">
          Select your role to continue
        </p>

        <div className="flex gap-4">

          <button
            onClick={() => router.push('/login')}
            className="
              bg-black
              text-white
              px-6
              py-3
              rounded-xl
            "
          >
            Admin Login
          </button>

          <button
            onClick={() => router.push('/user-login')}
            className="
              bg-blue-600
              text-white
              px-6
              py-3
              rounded-xl
            "
          >
            User Login
          </button>

        </div>

      </div>

    </div>
  );
}