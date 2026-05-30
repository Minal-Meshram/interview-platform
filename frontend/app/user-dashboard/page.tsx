'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UserDashboard() {

  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [mode, setMode] = useState('');

  useEffect(() => {

    const storedUser =
      localStorage.getItem('user');

    if (!storedUser) {

      router.push('/user-login');
      return;
    }

    const userData =
      JSON.parse(storedUser);

    setUser(userData);

    getMode(userData.id);

  }, []);

  async function getMode(
    userId: number,
  ) {

    const res = await fetch(
      `http://localhost:4000/user-auth/${userId}`
    );

    const data = await res.json();

    setMode(data.mode);
  }

  function logout() {

    localStorage.removeItem('user');

    router.push('/user-login');
  }

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-4xl mx-auto">

        <div className="bg-white rounded-2xl p-8 shadow">

          <div className="flex justify-between items-center">

            <h1 className="text-3xl font-bold text-gray-500">

              Welcome {user?.name}

            </h1>

            <button
              onClick={logout}
              className="
              bg-red-500
              text-white
              px-4
              py-2
              rounded-lg
            "
            >
              Logout
            </button>

          </div>

          <div className="mt-8">

            <h2 className="text-xl font-semibold text-gray-600">
              Assigned Questioning Mode
            </h2>

            <div
              className="
              mt-4
              inline-block
              bg-black
              text-white
              px-4
              py-2
              rounded-full
            "
            >
              {mode}
            </div>

          </div>

          <button
            className="
            mt-8
            bg-black
            text-white
            px-6
            py-3
            rounded-xl
          "
          >
            Start Interview
          </button>

        </div>

      </div>

    </div>
  );
}