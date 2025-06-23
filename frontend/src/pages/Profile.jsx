import React from 'react';
import useAuth from '../Hooks/useAuth';

function Profile() {
    const { user, isLoading, isError } = useAuth();

    if (isLoading) {
        return <p className="text-center">Loading...</p>;
    }

    if (isError || !user) {
        return <p className="text-center text-red-500">Failed to load user profile.</p>;
    }

    const { name, email, verified, createdAt } = user;

    if (!verified) {
        return (
            <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl dark:bg-gray-800 text-gray-900 dark:text-white">
                <h1 className="text-2xl text-red-500 font-bold mb-4">Email Verification Required</h1>
                <p className="mb-4">Please verify your email to access your profile.</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    If you haven't received a verification email, please check your spam folder or resend the verification email.
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 sm:p-10 bg-gradient-to-tr from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 shadow-2xl rounded-3xl text-gray-900 dark:text-white min-h-[450px]">
            {/* Avatar & Heading Section */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-6 space-y-4 sm:space-y-0 mb-10">
                <img
                    src="https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff&size=128"
                    alt="User avatar"
                    className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-md"
                />
                <div className="text-center sm:text-left">
                    <h1 className="text-3xl sm:text-4xl font-bold">{name}</h1>
                    <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1">Here’s your account information</p>
                </div>
            </div>

            {/* Info Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 text-base sm:text-lg">
                <div className="flex items-center space-x-2">
                    <span className="text-blue-600 text-xl">📧</span>
                    <span className="font-semibold">Name:</span>
                    <span className="truncate">{name}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-blue-600 text-xl">📧</span>
                    <span className="font-semibold">Email:</span>
                    <span className="truncate">{email}</span>
                </div>

                <div className="flex items-center space-x-2">
                    <span className="text-green-500 text-xl">{verified ? '✅' : '❌'}</span>
                    <span className="font-semibold">Verified:</span>
                    <span>{verified ? 'Yes' : 'No'}</span>
                </div>

                <div className="flex items-center space-x-2">
                    <span className="text-purple-600 text-xl">🕒</span>
                    <span className="font-semibold">Joined:</span>
                    <span>{new Date(createdAt).toLocaleString("en-US")}</span>
                </div>

                {/* Optional blank space for layout symmetry */}
                <div className="hidden sm:block"></div>
            </div>
        </div>




    );
}

export default Profile;
