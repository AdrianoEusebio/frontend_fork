import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Dashboard from '../pages/Dashboard/Dashboard'
import { Login } from '../pages/Login/Login'
import { useAuth } from '@/context/AuthContext'
import { ProductCategories } from '../pages/Product/Product'
import { ProductCategoryCadastration } from '../pages/ProductTypeCadastration/ProductTypeCadastration'

function ProtectedRoute() {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return <Outlet />
}

export default function AppRoutes() {
   const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={isAuthenticated ? "/product" : "/login"} />}
      />
      <Route
        path="/product"
        element={isAuthenticated ? <ProductCategories /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={!isAuthenticated ? <Login /> : <Navigate to="/product" />}
      />
      <Route
        path='/product/form'
        element={isAuthenticated ? <ProductCategoryCadastration /> : <Navigate to="/login" />}
      />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}