import React, { useEffect, useCallback, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, Route, Routes } from "react-router-dom"
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
import { Nav, Navbar } from "react-bootstrap"

import { Container } from "@nextui-org/react"

const App = () => {
  const { user: currentUser } = useSelector((state) => state.auth)
  const [showAdminBoard, setShowAdminBoard] = useState(false)

  const dispatch = useDispatch()

  const logOut = useCallback(() => {
    dispatch(logout())
  }, [dispatch])

  useEffect(() => {
    if (currentUser) {
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"))
    }
  }, [currentUser])

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
      <Navbar collapseOnSelect expand="lg" variant="light">
        <Link to="/">Destino Certo</Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link to="/home">Home</Link>
            {showAdminBoard && (
              <Link to={"/criardestino"}>Cadastrar Destino</Link>
            )}
            <Link to="/listardestinos">Destinos</Link>
            {currentUser && <Link to="/minhasviagens">Minhas viagens</Link>}
            {currentUser && <Link to="/profile">Perfil</Link>}
          </Nav>

          {currentUser ? (
            <Nav>
              <Link to="/profile">{currentUser.username}</Link>
              <Link to="/login" onClick={logOut}>
                Sair
              </Link>
            </Nav>
          ) : (
            <Nav>
              <Link to="/login">Login</Link>
              <Link to="/register" onClick={logOut}>
                Registrar
              </Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
      <Container style={{height: "100vh"}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/criardestino" element={<CriarDestino />} />
          <Route path="/destino/:id/" element={<Destino />} />
          <Route path="/listardestinos" element={<ListarDestinos />} />
          <Route path="/escolherdestino/:id/" element={<EscolherDestino />} />
          <Route path="/login" element={<Login />} />
          <Route path="/minhasviagens" element={<MinhasViagens />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </Container>
    </div>
  )
}

export default App
