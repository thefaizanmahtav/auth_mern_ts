import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'
import { NavLink, useSearchParams } from 'react-router-dom'
import { resetPassword } from '../lib/api'

function ResetPassword() {
    const [searchParams] = useSearchParams()

    const code = searchParams.get("code")
    const exp = Number(searchParams.get("exp"))
    const now = Date.now()

    const linkIsValid = code && exp && exp > now

    const {
        mutate: setUserPassword,
        isError,
        isPending,
        error,
        isSuccess,
    } = useMutation({
        mutationFn: resetPassword,
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()


    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md space-y-6">
                {linkIsValid ? (
                    <>
                        <p className="text-3xl font-bold text-center">Change Your Password</p>
                        <form
                            className="p-6 rounded-2xl bg-gray-700 shadow-md space-y-4"
                        >
                            {isError && (
                                <div className="text-md text-red-500 text-center">
                                    {error?.message || "Something went wrong."}
                                </div>
                            )}

                            <div className="flex flex-col">
                                <label htmlFor="password" className="text-lg font-medium mb-1 text-white">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    {...register("password", {
                                        required: "Password is required",
                                    })}
                                    placeholder="Enter your password"
                                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                />
                                {errors.password && (
                                    <span className="text-sm text-red-500 mt-1">
                                        {errors.password.message}
                                    </span>
                                )}
                            </div>

                            <button
                                onClick={handleSubmit(data => {
                                    setUserPassword({ password: data.password, code })
                                })}
                                disabled={isPending}
                                className={`w-full py-2 px-4 rounded-md transition ${isPending
                                    ? "bg-blue-300 cursor-not-allowed"
                                    : "bg-blue-500 hover:bg-blue-600 text-white"
                                    }`}
                            >
                                {isPending ? "Changing..." : "Change Password"}
                            </button>

                            {isSuccess && (
                                <>
                                    <div className="text-green-500 text-center font-medium mt-2">
                                        ✅ Password changed successfully
                                    </div>
                                    <p className="text-md text-center">
                                        You can now{" "}
                                        <NavLink to="/login" className="text-blue-300 hover:underline">
                                            Login
                                        </NavLink>
                                    </p>
                                </>
                            )}
                        </form>
                    </>
                ) : (
                    <div className="p-6 rounded-2xl bg-gray-700 shadow-md space-y-4">
                        <p className="text-2xl font-semibold text-center text-red-500">
                            Invalid or expired reset link.
                        </p>
                        <p className="text-md text-center">
                            Please try again or{" "}
                            <NavLink to="/password/forgot" className="text-blue-300 hover:underline">
                                request a new link
                            </NavLink>.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ResetPassword
