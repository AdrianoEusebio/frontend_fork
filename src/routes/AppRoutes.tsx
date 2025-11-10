import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Dashboard from '../pages/Dashboard/Dashboard'
import { Login } from '../pages/Login/Login'
import { useAuth } from '@/context/AuthContext'
import { ProductCategories } from '../pages/Product/Product'
import { ProductCategoryCadastration } from '../pages/ProductTypeCadastration/ProductTypeCadastration'
import { ProductCategoryEdit } from '../pages/ProductTypeEdit/ProductTypeEdit'
import { ProductsPage } from '../pages/ProductVisualization/ProductVisualization'

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
        element={<Navigate to={isAuthenticated ? "/product-visualization" : "/login"} />}
      />
      <Route
        path="/product-type"
        element={isAuthenticated ? <ProductCategories /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={!isAuthenticated ? <Login /> : <Navigate to="/product" />}
      />
      <Route
        path='/product-type/form'
        element={isAuthenticated ? <ProductCategoryCadastration /> : <Navigate to="/login" />}
      />
      <Route 
        path="/product-type/edit/:id"
        element={isAuthenticated ? <ProductCategoryEdit /> : <Navigate to="/login" />}
      />
      <Route 
        path="/product-visualization"
        element={isAuthenticated ? <ProductsPage /> : <Navigate to="/login" />}
      />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}