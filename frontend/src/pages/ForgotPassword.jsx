import React from 'react'
import { useForm } from "react-hook-form"
import { NavLink } from 'react-router-dom'
import { sendPasswordResetEmail } from '../lib/api'
import { useMutation } from '@tanstack/react-query'

function ForgotPassword() {

    const {
        mutate: sendPasswordReset,
        isPending,
        isSuccess,
        isError,
        error
    } = useMutation({
        mutationFn: sendPasswordResetEmail,
        // onSuccess: () => setTimeout(() => navigate("/login"), 3000), // Optional redirect
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md space-y-4">
                {/* Heading */}


                {isSuccess ? <div className="flex items-center gap-2 p-4 border border-green-300 bg-green-200 text-green-700 rounded-md text-md font-medium">
                    ✅ <span>Password reset link has been sent to your email.</span>
                </div> :
                    <>
                        <p className="text-2xl font-semibold text-center">Reset Your Password</p>
                        <form className="p-6 rounded-2xl bg-gray-700 shadow-md space-y-4">
                            {/* Error Message */}
                            {isError && (
                                <div className="text-sm text-red-600 text-center">
                                    {error?.message || "Something went wrong. Please try again."}
                                </div>
                            )}

                            {/* Email Field */}
                            <div className="flex flex-col">
                                <label htmlFor="email" className="text-lg font-medium mb-1">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                            message: "Invalid email format"
                                        },
                                    })}
                                    placeholder="you@example.com"
                                    className="mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                                />
                                {errors.email && (
                                    <span className="text-sm text-red-500 mt-1">{errors.email.message}</span>
                                )}
                            </div>

                            <button
                                onClick={handleSubmit((data) => sendPasswordReset(data.email))}
                                disabled={isPending}
                                className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition">
                                {isPending ? "Sending..." : "Send Reset Link"}
                            </button>

                            <div className="text-center text-sm mt-4">
                                Back to{" "}
                                <NavLink to="/login" className="text-blue-300 hover:underline">
                                    Login
                                </NavLink>{" "}
                                or{" "}
                                <NavLink to="/register" className="text-blue-300 hover:underline">
                                    Register
                                </NavLink>
                            </div>
                        </form>

                    </>
                }

            </div>
        </div>
    )
}

export default ForgotPassword
