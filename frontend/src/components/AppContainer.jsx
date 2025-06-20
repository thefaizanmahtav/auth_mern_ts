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
            <div className="flex items-baseline m-14 justify-end">
                <UserMenu />
            </div>
                <Outlet />
        </>
    ) : (
        <Navigate
            to="/login"
            replace
            state={{ redirectUrl: window.location.pathname }}
        />
    )
}

export default AppContainer
