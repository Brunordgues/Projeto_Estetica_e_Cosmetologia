import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router'
import Login from './pages/auth/Login.tsx'
import Auth from './pages/auth/Auth.tsx'
import Register from './pages/auth/Register.tsx'
import Slider from './pages/slider/Slider.tsx'
import Solicitacoes from './pages/solicitacoes/Solicitacoes.tsx'
import Solicitacao from './pages/solicitacoes/Solicitacao.tsx'
import EditarSolicitacao from './pages/solicitacoes/EditarSolicitacao.tsx'
import CheckEmail from './pages/auth/forgot-password/CheckEmail.tsx'
import VerifyCode from './pages/auth/forgot-password/VerifyCode.tsx'
import ChangePassword from './pages/auth/forgot-password/ChangePassword.tsx'
import SideBar from './components/layout/SideBar.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Navigate to={"/auth/login"} replace />
      },
      {
        path: "auth",
        element: <Auth />,
        children: [
          {
            path: "login",
            element: <Login />
          },
          {
            path: "register",
            element: <Register />
          },
          {
            path: "forgot-password",
            element: <CheckEmail />
          },
          {
            path: "forgot-password/verify-code",
            element: <VerifyCode />
          },
          {
            path: "forgot-password/change-password/:hash",
            element: <ChangePassword />
          }
        ]
      },
      {
        path: "",
        element: <SideBar />,
        children: [
          {
            path: "slider",
            element: <Slider />
          },
          {
            path: "minhas-solicitacoes",
            element: <Solicitacoes />
          },
          {
            path: "minhas-solicitacoes/:id",
            element: <Solicitacao />
          },
          {
            path: "minhas-solicitacoes/:id/editar",
            element: <EditarSolicitacao />
          }
        ]
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
