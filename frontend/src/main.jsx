import { createRoot } from 'react-dom/client'
import App from './Dashboard.jsx'
import './index.css'
import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes } from 'react-router-dom'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './config/queryClient.js'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import VerifyEmails from './pages/VerifyEmail.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import AppContainer from './components/AppContainer.jsx'
import Profile from './pages/Profile.jsx'
import Settings from './pages/Settings.jsx'
import LandingPage from './pages/LandingPage.jsx'
import Dashboard from './Dashboard.jsx'


const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path="/" element={<AppContainer />} >
      <Route index element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
    </Route>
    <Route path="/home" element={<LandingPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/email/verify/:code" element={<VerifyEmails />} />
    <Route path="/password/forgot" element={<ForgotPassword />} />
    <Route path="/password/reset" element={<ResetPassword />} />
  </>
))

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools position="bottom-right" initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
)