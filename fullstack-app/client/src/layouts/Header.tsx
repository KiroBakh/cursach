import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

import NavigationHeader from "../components/NavigationHeader";
import HomePage from "../pages/HomePage";

import "../styles/styles.css";
import Footer from "./Footer";
import axios from "axios";

interface User {
  _id: string;
  username: string;
}

export default function Header() {
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User[]>([]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/users/${localStorage.getItem("userId")}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUser([response.data]);
      console.log(response.data);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      fetchUserData();
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  let homePage = location.pathname === "/";

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg white-text bg-dark header">
          <div className=" bg-dark">
            <nav className="navbar">
              <div className="container">
                <img
                  className="logo"
                  src="/img/logo.png"
                  alt="logo"
                  width="50"
                  height="50"
                />
              </div>
            </nav>
          </div>

          <div className="container-fluid">
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {!homePage ? (
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/">
                      Головна
                    </NavLink>
                  </li>
                ) : (
                  ""
                )}
                <NavigationHeader />
              </ul>
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Пошукай щось..."
                  aria-label="Search"
                />
                <button
                  className="btn btn-outline-success search-button"
                  type="submit"
                >
                  Пошук
                </button>
              </form>

              <NavLink to="/api/auth" className="ms-5 mx-3">
                {isLoggedIn ? (
                  <div className="dropdown ">
                    <button
                      className="btn btn-secondary dropdown-toggle "
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {user.length > 0
                        ? user.map((u) => u.username).join(", ")
                        : "Нет пользователя"}
                    </button>
                    <ul className="dropdown-menu bg-dark">
                      <li>
                        <a className="dropdown-item" href="#n">
                          Профіль
                        </a>
                      </li>
                      <hr className="dropdown-divider bg-light" />
                      <li>
                        <a className="dropdown-item" href="#n">
                          Інше
                        </a>
                      </li>
                      <li>
                        {" "}
                        <button
                          className="btn btn-outline-info mx-4 mt-2"
                          onClick={handleLogout}
                        >
                          Вихід
                        </button>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <button className="btn btn-outline-info">Вхід</button>
                )}
              </NavLink>
            </div>
          </div>
        </nav>
      </header>
      {homePage ? <HomePage /> : ""}
      <Outlet />
      <Footer />
    </>
  );
}
