import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/registerPage.jsx'
import AdminPage from './pages/AdminPage.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route element={<ProtectedRoute/>}>
            <Route path='/admin' element={<AdminPage/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>

  )
}
export default App;