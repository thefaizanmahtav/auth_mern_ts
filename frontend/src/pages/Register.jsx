import React from 'react'
import { useForm } from "react-hook-form"
import { NavLink, replace, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { register as userRegister } from '../lib/api'

function Register() {

    const navigate = useNavigate()

    const {
        mutate: createAccount,
        isPending,
        isError,
        error
    } = useMutation({
        mutationFn: userRegister,
        onSuccess: () => { navigate("/login", { replace: true }) },
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
                <p className="text-3xl font-bold text-center">Create an account</p>

                {/* Form */}
                <form className="p-6 rounded-2xl bg-gray-700 shadow-md space-y-4">
                    {isError &&
                        (<span className="text-md flex justify-center text-red-500">{error?.message || "Registration failed"}</span>)
                    }

                    {/* Name Field */}
                    <div className="flex flex-col">
                        <label htmlFor="name" className="text-lg font-medium mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            {...register("name", {
                                required: "Name is required",
                            })}
                            placeholder="Enter your name"
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                        {errors.name && (
                            <span className="text-sm text-red-500 mt-1">{errors.name.message}</span>
                        )}
                    </div>

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
                                    message: "Invalid email address"
                                },
                            })}
                            placeholder="Enter your email"
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                        {errors.email && (
                            <span className="text-sm text-red-500 mt-1">{errors.email.message}</span>
                        )}

                    </div>

                    {/* Password Field */}
                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-lg font-medium mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            {...register("password", {
                                required: "Password is required",
                                // pattern: {
                                //     value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/, message: "Password must be at least 6 characters long and contain at least one letter and one number"
                                // }
                            })}
                            placeholder="Enter your password"
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                        {errors.password && (
                            <span className="text-sm text-red-500 mt-1">{errors.password.message}</span>
                        )}
                    </div>

                    {/* Confirm Password Field */}

                    <div className="flex flex-col">
                        <label htmlFor="confirmPassword" className="text-lg font-medium mb-1">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            {...register("confirmPassword", { required: "Confirm Password is required", })}
                            placeholder="Confirm your password"
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                        {errors.confirmPassword && (
                            <span className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</span>
                        )}
                    </div>


                    <button
                        type="submit"
                        onClick={handleSubmit((data) => createAccount(data))}
                        disabled={isPending}
                        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                    >Create Account</button>

                    <p className="text-md text-center">
                        Already have an account?{" "}
                        <NavLink to="/login" className="text-blue-300 hover:underline">
                            Sign In
                        </NavLink>
                    </p>
                </form>
            </div>
        </div>

    )
}

export default Register
