import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import AdminPage from './pages/AdminPage.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<HomePage />} />
          <Route path='/login' exact element={<LoginPage />} />
          <Route path='/register' exact element={<RegisterPage />} />
          <Route element={<ProtectedRoute/>}>
            <Route path='/admin' exact element={<AdminPage/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>

  )
}
export default App;