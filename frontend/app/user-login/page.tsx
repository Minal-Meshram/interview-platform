'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UserLoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(
    e: React.FormEvent,
  ) {

    e.preventDefault();

    const res = await fetch(
      'http://localhost:4000/user-auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await res.json();

    if (data.success) {

      localStorage.setItem(
        'user',
        JSON.stringify(data.user),
      );

      router.push('/user-dashboard');

    } else {

      alert('Invalid Email or Password');

    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          User Login
        </h1>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded-lg mb-4 border-gray-300 text-gray-800"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded-lg mb-4 border-gray-300 text-blue-600"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            type="submit"
            className="
            w-full
            bg-blue-600
            text-white
            py-3
            rounded-lg
          "
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}