import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Link, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import { logout } from "./slices/auth";
import EventBus from "./common/EventBus";
import CriarDestino from "./components/CriarDestino";
import ListarDestinos from "./components/ListarDestinos";
import Destino from "./components/Destino";

const App = () => {

  const { user: currentUser } = useSelector((state) => state.auth);
  
  const dispatch = useDispatch();

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    EventBus.on("logout", () => {
      logOut();
    });
    return () => {
      EventBus.remove("logout");
    };
  }, [currentUser, logOut]);

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
            <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/criardestino"} className="nav-link">
                Cadastrar Destino
              </Link>
            </li>
            </div>
            <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/listardestinos"} className="nav-link">
                Destinos
              </Link>
            </li>
            </div>
            {currentUser && (
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  User
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
                  LogOut
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
                  Sign Up
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
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
  );
};

export default App;