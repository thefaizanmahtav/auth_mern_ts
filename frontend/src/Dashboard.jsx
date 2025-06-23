import React from "react";

function Dashboard() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="bg-white dark:bg-gray-900 text-center shadow-xl rounded-3xl p-10 max-w-md w-full space-y-4">
        <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white">
          Welcome Back 👋
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          You're successfully logged in!
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
