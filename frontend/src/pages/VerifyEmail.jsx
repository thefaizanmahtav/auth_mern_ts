import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { verifyEmail } from '../lib/api'
import { useNavigate, useParams } from 'react-router-dom'

function VerifyEmails() {
    const { code } = useParams();
    const navigate = useNavigate();

    const { isPending, isSuccess, isError, error } = useQuery({
        queryKey: ["verificationCode", code],
        queryFn: () => verifyEmail(code),
    })
    console.log(isPending, isSuccess, isError, error);
    

    return (
       <div className="min-h-screen flex items-center justify-center px-4 ">
  <div
    className={`w-full max-w-md rounded-2xl shadow-lg p-8 text-center transition-all duration-300
      ${isSuccess ? "bg-green-50 border border-green-400" :
        isError ? "bg-red-50 border border-red-400" :
        "bg-white border border-gray-300"}
    `}
  >
    {/* Icon */}
    <div className="mb-5 flex justify-center">
      {isPending ? (
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full" />
      ) : isSuccess ? (
        <div className="text-green-500 text-5xl">✅</div>
      ) : isError ? (
        <div className="text-red-500 text-5xl">❌</div>
      ) : null}
    </div>

    {/* Main message */}
    <h2 className={`text-xl font-bold mb-2
      ${isPending ? "text-blue-700" :
        isSuccess ? "text-green-700" :
        isError ? "text-red-700" : "text-gray-800"}
    `}>
      {isPending
        ? "Verifying your email..."
        : isSuccess
        ? "Email verified successfully!"
        : isError
        ? error?.message || "Verification failed."
        : ""}
    </h2>

    {/* Sub message */}
    {!isPending && (
      <p className="text-sm text-gray-600 mb-6">
        {isSuccess
          ? "You can now log in to your account."
          : "Please check the link or try again."}
      </p>
    )}

    {/* Redirect button */}
    {!isPending && (
      <button
        onClick={() => navigate("/login")}
        className={`px-5 py-2 text-white rounded-md font-medium shadow-sm transition
          ${isSuccess ? "bg-green-600 hover:bg-green-700" :
            isError ? "bg-red-600 hover:bg-red-700" : "bg-gray-500"}
        `}
      >
        Go to Login
      </button>
    )}
  </div>
</div>


    )
}

export default VerifyEmails;
