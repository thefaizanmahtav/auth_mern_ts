import React from 'react'
import useSessions from '../Hooks/useSessions.'
import SessionCard from '../components/SessionCard'

function Settings() {

    const { sessions, isPending, isSuccess, isError } = useSessions()
    console.log({ isError });
    return (
        <div className="min-h-screen from-gray-900 to-gray-800 text-white flex justify-center px-4 py-10">
            <div className="w-full max-w-2xl space-y-6">
                <h1 className="text-3xl font-bold text-center text-white">My Sessions</h1>

                <div className="p-6 bg-gray-800/60 backdrop-blur-md rounded-2xl shadow-2xl space-y-4 border border-gray-700">
                    {isPending && <p className="text-center text-gray-400">Loading...</p>}
                    {isError && <p className="text-center text-red-500">Failed to load sessions.</p>}


                    {isSuccess && (
                        <ul className="space-y-4">
                            {sessions.map((session) => (
                                <li key={session._id}>
                                    <SessionCard session={session} />
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Settings
