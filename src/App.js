import React, { useEffect, useCallback, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Route, Link, Routes } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import Login from "./components/Login"
import Register from "./components/Register"
import Home from "./components/Home"
import Profile from "./components/Profile"
import { logout } from "./slices/auth"
import EventBus from "./common/EventBus"
import CriarDestino from "./components/CriarDestino"
import ListarDestinos from "./components/ListarDestinos"
import Destino from "./components/Destino"
import EscolherDestino from "./components/EscolherDestino"
import MinhasViagens from "./components/MinhasViagens"

const App = () => {
  const { user: currentUser } = useSelector((state) => state.auth)
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const dispatch = useDispatch()

  const logOut = useCallback(() => {
    dispatch(logout())
  }, [dispatch])

  useEffect(() => {
    if (currentUser) {
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    }
  }, [currentUser]);

  useEffect(() => {
    EventBus.on("logout", () => {
      logOut()
    })
    return () => {
      EventBus.remove("logout")
    }
  }, [currentUser, logOut])

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Destino Certo
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>
          {showAdminBoard && (
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/criardestino"} className="nav-link">
                Cadastrar Destino
              </Link>
            </li>
          </div>
          )}
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/listardestinos"} className="nav-link">
                Destinos
              </Link>
            </li>
          </div>

          {currentUser && (
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/minhasviagens"} className="nav-link">
                  Minhas Viagens
                </Link>
              </li>
            </div>
          )}
          {currentUser && (
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                Perfil
              </Link>
            </li>
          )}
        </div>
        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                Sair
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Cadastrar
              </Link>
            </li>
          </div>
        )}
      </nav>
      <div>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/criardestino" element={<CriarDestino />} />
          <Route path="/destino/:id/" element={<Destino />} />
          <Route path="/listardestinos" element={<ListarDestinos />} />
          <Route path="/escolherdestino/:id/" element={<EscolherDestino />} />
          <Route path="/login" element={<Login />} />
          <Route path="/minhasviagens" element={<MinhasViagens />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
