import React from 'react'
import useAuth from '../Hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom'
import UserMenu from './UserMenu'

function AppContainer() {
    const { user, isLoading } = useAuth()

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p>Loading...</p>
            </div>
        )
    }

    return user ? (
        <>
            <div className="min-h-screen bg-blue-100 dark:bg-gray-900 flex items-center justify-center p-6">
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 w-full max-w-3xl">
                    <div className="flex justify-end mb-4">
                        <UserMenu />
                    </div>
                    <Outlet />

                </div>
            </div>
        </>
    ) : (
        <Navigate
            to="/home"
            replace
            state={{ redirectUrl: window.location.pathname }}
        />
    )
}

export default AppContainer
