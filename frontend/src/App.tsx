import { BrowserRouter, Route, Routes } from 'react-router';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import ChatAppPage from './pages/ChatAppPage';
import { Toaster } from 'sonner';
import ProtectedRoute from './components/auth/ProtectedRoute';
function App() {
  return <>
    <Toaster richColors /> {/* Dùng để hiển thị thông báo pop up */}
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route
          path='/signin'
          element={<SignInPage />}
        />

        <Route
          path='signup'
          element={<SignUpPage />}
        />

        {/* Protected Route*/}
        <Route element={<ProtectedRoute />}>
          <Route
            path='/'
            element={<ChatAppPage />}
          />
        </Route>

      </Routes>

    </BrowserRouter>
  </>;
}

export default App
