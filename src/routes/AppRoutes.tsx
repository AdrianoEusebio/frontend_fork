import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Dashboard from '../pages/Dashboard/Dashboard'
import { Login } from '../pages/Login/Login'
import { useAuth } from '@/context/AuthContext'

function ProtectedRoute() {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return <Outlet />
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}