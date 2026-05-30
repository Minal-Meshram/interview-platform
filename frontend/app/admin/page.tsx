'use client';

import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [modes, setModes] = useState([]);
  const [selectedMode, setSelectedMode] = useState<number | null>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<number | null>(null); const [loading, setLoading] = useState(false);

  async function getModes() {
    try {
      const res = await fetch(
        'http://localhost:4000/question-mode'
      );

      const data = await res.json();

      setModes(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getUsers() {
    try {
      const res = await fetch(
        'http://localhost:4000/user-question-mode/users'
      );
      
      const data = await res.json();

      setUsers(data);

      if (data.length > 0) {
        setSelectedUser(data[0].id);
      }

    } catch (error) {
      console.log(error);
    }
  }

  async function getAssignments() {
  try {
    const res = await fetch(
      'http://localhost:4000/user-question-mode'
    );

    const data = await res.json();
    console.log(data);

    setAssignments(data);
  } catch (error) {
    console.log(error);
  }
}

 async function selectMode(modeId: number) {
  try {
    setLoading(true);

    await fetch(
      `http://localhost:4000/user-question-mode/${selectedUser}`,
      {
        method: 'PUT',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          questionModeId: modeId,
        }),
      }
    );

    setSelectedMode(modeId);

    await getAssignments();

    alert('Question mode updated successfully');

  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
}

  useEffect(() => {
    getModes();
    getUsers();
    getAssignments();

  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-5xl mx-auto">

        <div className="mb-10">

          <h1 className="text-4xl font-bold text-gray-800">
            Questioning Modes
          </h1>

          <p className="text-gray-500 mt-2">
            Select how AI should ask questions in interview rounds
          </p>

        </div>

        <div className="mb-8">

          <label className="block text-sm font-medium mb-2">
            Select User
          </label>

          <select
            value={selectedUser ?? ''}
            onChange={(e) =>
              setSelectedUser(Number(e.target.value))
            }
            className="
      w-full
      md:w-72
      border
      rounded-lg
      p-3
      bg-black
    "
          >
            {users.map((user: any) => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {modes.map((mode: any) => {

            const isSelected = selectedMode === mode.id;

            return (

              <div
                key={mode.id}
                onClick={() => selectMode(mode.id)}
                className={`
                  p-6 rounded-2xl border cursor-pointer
                  transition-all duration-300 shadow-sm
                  hover:shadow-xl hover:-translate-y-1

                  ${isSelected
                    ? 'bg-black text-white border-black'
                    : 'bg-white border-gray-500'
                  }
                `}
              >

                <div className="flex items-center justify-between mb-4">

                  <h2 className="text-2xl font-bold text-black px-3 py-1 rounded-full">
                    {mode.mode}
                  </h2>

                  {isSelected && (
                    <span className="text-sm bg-green-500 px-3 py-1 rounded-full">
                      Selected
                    </span>
                  )}

                </div>

                <p
                  className={`
                    text-sm leading-6
                    ${isSelected
                      ? 'text-gray-200'
                      : 'text-gray-600'
                    }
                  `}
                >
                  {mode.description}
                </p>

                <button
                  disabled={loading}
                  className={`
                    mt-6 w-full py-3 rounded-xl font-semibold
                    transition-all

                    ${isSelected
                      ? 'bg-white text-black'
                      : 'bg-black text-white hover:bg-gray-800'
                    }
                  `}
                >
                  {isSelected
                    ? 'Currently Active'
                    : 'Select Mode'}
                </button>

              </div>
            );
          })}
        </div>

        <div className="mt-12">

          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            User Assignments
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            {assignments.map((user: any) => (

              <div
                key={user.id}
                className="
          bg-white
          rounded-2xl
          p-6
          shadow-md
          border
        "
              >

                <h3 className="text-xl font-bold text-gray-800">
                  {user.name}
                </h3>

                <p className="text-gray-500 mt-2">
                  Current Questioning Mode
                </p>

                <div className="
          mt-4
          inline-block
          bg-black
          text-white
          px-4
          py-2
          rounded-full
          font-medium
        ">
                  {user.mode}
                </div>

              </div>

            ))}

          </div>

        </div>

      </div>
    </div>
  );
}