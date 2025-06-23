import React from 'react';
import useDeleteSession from '../Hooks/useDeleteSession';

function SessionCard({ session }) {
    const { _id, createAt, userAgent, isCurrent } = session;
    const { deleteSession } = useDeleteSession(_id);
    console.log(createAt, userAgent, isCurrent);
    

    return (
        <div className="p-4 bg-white dark:bg-gray-800 shadow-md rounded-xl text-sm space-y-2 border border-gray-200 dark:border-gray-700">
            <p><strong>ID:</strong> {_id}</p>
            <p><strong>Created:</strong> {new Date(createAt).toLocaleString()}</p>
            <p><strong>Device:</strong> {userAgent}</p>
            <p>
                <strong>Status:</strong>{' '}
                <span className={isCurrent ? 'text-green-500 font-semibold' : 'text-gray-400'}>
                    {isCurrent ? 'Current Session' : 'Past Session'}
                </span>
            </p>

            {!isCurrent && (
                <div className="flex justify-end">
                    <button
                        onClick={() => deleteSession(_id)}
                        className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs transition duration-200"
                    >
                        Delete Session
                    </button>
                </div>
            )}
        </div>
    );
}

export default SessionCard;
