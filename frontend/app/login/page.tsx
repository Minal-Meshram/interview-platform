'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setEmail('');
        setPassword('');
    }, []);

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await fetch(
                'http://localhost:4000/auth/login',
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
                    'admin',
                    JSON.stringify(data.admin)
                );

                router.push('/admin');
            } else {
                alert('Invalid Email or Password');
            }
        } catch (error) {
            console.log(error);
            alert('Login Failed');
        } finally {
            setLoading(false);
        }


    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

                <h1 className="text-4xl font-bold text-black text-center mb-8">
                    Admin Login
                </h1>

                <form onSubmit={handleLogin} autoComplete="off">

                    <div className="mb-4">
                        <label className="block mb-2 text-gray-700 font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            autoComplete="off"
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            className="w-full border p-3 rounded-lg"
                            placeholder="admin@gmail.com"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block mb-2 text-gray-700 font-medium">
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            autoComplete="off"
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            placeholder="********"
                            className="
    w-full
    border
    border-gray-300
    rounded-lg
    p-3
    text-black
    bg-white
    focus:outline-none
    focus:ring-2
    focus:ring-black
  "
                        />
                    </div>

                    <p className="text-center mt-4 text-gray-600">
                        Don't have an account?

                        <span
                            onClick={() => router.push('/register')}
                            className="text-blue-600 cursor-pointer ml-1"
                        >
                            Register
                        </span>
                    </p>
                    <button
                        type="submit"
                        className="
    w-full
    bg-black
    text-white
    py-3
    rounded-lg
    font-semibold
    hover:bg-gray-800
    transition
  "
                    >
                        Login
                    </button>

                </form>

            </div>
        </div>
    );
}