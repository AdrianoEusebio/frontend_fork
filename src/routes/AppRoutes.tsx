import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { Login } from '../pages/Login/Login'
import { useAuth } from '@/context/AuthContext'
import { ProductCategories } from '../pages/ProductCategoria/ProductCategoria'
import { ProductCategoryCadastration } from '../pages/ProductCategoriaCadastration/ProductCategoriaCadastration'
import { ProductCategoryEdit } from '../pages/ProductCategoriaEdit/ProductCategoriaEdit'
import { ProductsPage } from '../pages/ProductVisualization/ProductVisualization'
import { ProductCadastration } from '../pages/ProductCadastration/ProductCadastration'
import { ProductEditPageWrapper } from '../pages/ProductEdit/ProductEditPage'
import { TiposProduto } from '../pages/ProductType/ProductType'
import { SerialPage } from '../pages/SerialListagem/SerialListagem'
import { SerialFormPage } from '../pages/SerialCadastro/SerialCadastro'
import { SerialEditPage } from '../pages/SerialEdit/SerialEdit'
import { CompaniesPage } from '../pages/CompaniesList/CompaniesList'
import { CompanyFormPage } from '../pages/CompaniesCadastration/CompaniesCadastration'
import { CompanyEditPage } from '../pages/CompaniesEdit/CompaniesEdit'
import { StorageLocations } from '../pages/LocaisArmazenamento/LocaisArmazenamento'
import { StorageLocationRegistration } from '../pages/LocaisArmazenamentosRegistration/LocaisArmazenamentoRegistration'
import { StorageLocationEdit } from '../pages/LocaisArmazenamentoEdit/LocaisArmazenamentoEdit'

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
        element={<Navigate to={isAuthenticated ? "/product/visualization" : "/login"} />}
      />
      <Route
        path="/product/categoria"
        element={isAuthenticated ? <ProductCategories /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={!isAuthenticated ? <Login /> : <Navigate to="/product" />}
      />
      <Route
        path='/product/categoria/form'
        element={isAuthenticated ? <ProductCategoryCadastration /> : <Navigate to="/login" />}
      />
      <Route 
        path="/product/categoria/edit/:id"
        element={isAuthenticated ? <ProductCategoryEdit /> : <Navigate to="/login" />}
      />
      <Route 
        path="/product/visualization"
        element={isAuthenticated ? <ProductsPage /> : <Navigate to="/login" />}
      />
      <Route 
        path="/product/cadastration"
        element={isAuthenticated ? <ProductCadastration /> : <Navigate to="/login" />}
      />
      <Route 
        path="/product/edit/:id"
        element={isAuthenticated ? <ProductEditPageWrapper /> : <Navigate to="/login" />}
      />
      <Route 
        path="/product/type"
        element={isAuthenticated ? <TiposProduto /> : <Navigate to="/login" />}
      />
      <Route 
        path="/serial/list"
        element={isAuthenticated ? <SerialPage /> : <Navigate to="/login" />}
      />
      <Route 
        path="/serial/cadastration"
        element={isAuthenticated ? <SerialFormPage /> : <Navigate to="/login" />}
      />
      <Route 
        path="/serial/edit/:id"
        element={isAuthenticated ? <SerialEditPage /> : <Navigate to="/login" />}
      />
      <Route 
        path="/companies/list"
        element={isAuthenticated ? <CompaniesPage /> : <Navigate to="/login" />}
      />
      <Route 
        path="/companies/cadastration"
        element={isAuthenticated ? <CompanyFormPage /> : <Navigate to="/login" />}
      />
      <Route 
        path="/companies/edit/:id"
        element={isAuthenticated ? <CompanyEditPage /> : <Navigate to="/login" />}
      />
      <Route 
        path="/storage"
        element={isAuthenticated ? <StorageLocations /> : <Navigate to="/login" />}
      />
      <Route 
        path="/storage/cadastration"
        element={isAuthenticated ? <StorageLocationRegistration /> : <Navigate to="/login" />}
      />
      <Route 
        path="/storage/edit/:id"
        element={isAuthenticated ? <StorageLocationEdit /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}