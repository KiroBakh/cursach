import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/styles.css";
import SocialMedia from "../components/SocialMedia";
import axios from "axios";

export default function AuthPage() {
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const [error, setError] = useState("");
  const [loginError, setLoginError] = useState("");

  const [userAuth, setUserAuth] = useState({
    username: "",
    email: "",
    password: "",
    role: "student",
  });

  const togglePanel = () => {
    setIsSignUpActive(!isSignUpActive);
  };

  const handleRegis = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userAuth.email)) {
      setError("Введіть правильну адресу електронної пошти");
      return;
    }

    const usernameRegex = /^[a-zA-Zа-яА-Я]+\s[a-zA-Zа-яА-Я]+$/;
    if (!usernameRegex.test(userAuth.username)) {
      setError("Введіть коректне ім'я та прізвище, розділені пробілом");
      return;
    }

    if (userAuth.password.length < 8) {
      setError("Пароль повинен містити принаймні 8 символів");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users",
        userAuth
      );
      console.log(response.data);
      togglePanel();
      setUserAuth({
        username: "",
        email: "",
        password: "",
        role: "",
      });
    } catch (error) {
      console.log(error);
      setError("Помилка реєстрації користувача. Спробуйте ще раз.");
    }
  };

  const navigate = useNavigate();

  const [login, isLogin] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        login
      );

      localStorage.setItem("userId", response.data.user.id);

      localStorage.setItem("token", response.data.token);

      navigate("/");

      console.log(response.data);
    } catch (err) {
      console.log(err);
      setLoginError("Incorrect email or password");
    }
  };

  return (
    <div className="back-auth">
      <div
        className={`containerAuth ${
          isSignUpActive ? "right-panel-active" : ""
        }`}
      >
        <div className="form-container sign-up-container">
          <form>
            <h1 className="containerAuth-title">Реєстрація</h1>
            <SocialMedia />
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <span className="containerAuth-span">
              або використовуйте свій e-mail для реєстрації
            </span>
            <input
              type="text"
              name="username"
              value={userAuth.username}
              onChange={(e) =>
                setUserAuth({ ...userAuth, username: e.target.value })
              }
              placeholder="Ім'я та прізвище"
            />
            <input
              type="email"
              name="email"
              value={userAuth.email}
              onChange={(e) =>
                setUserAuth({ ...userAuth, email: e.target.value })
              }
              placeholder="example@example.com"
            />
            <input
              type="password"
              name="password"
              value={userAuth.password}
              onChange={(e) =>
                setUserAuth({ ...userAuth, password: e.target.value })
              }
              placeholder="Пароль"
            />
            <button className="auth-button" onClick={handleRegis}>
              Зареєструватись
            </button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form>
            <h1 className="containerAuth-title">Авторизація</h1>
            <SocialMedia />
            <span className="containerAuth-span">
              або використовуйте свій обліковий запис
            </span>
            {loginError && (
              <div className="alert alert-danger mt-2" role="alert">
                {loginError}
              </div>
            )}
            <input
              type="email"
              value={login.email}
              name="email"
              onChange={(e) => isLogin({ ...login, email: e.target.value })}
              placeholder="Електронна пошта"
            />
            <input
              type="password"
              value={login.password}
              name="password"
              onChange={(e) => isLogin({ ...login, password: e.target.value })}
              placeholder="Пароль"
            />
            <NavLink className="containerAuth-link" to="#n">
              Забули пароль?
            </NavLink>
            <button className="auth-button" onClick={handleLogin}>
              Вхід
            </button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="containerAuth-title">Ласкаво просимо!</h1>
              <p className="containerAuth-description">
                Щоб залишатися на зв'язку з нами, будь ласка, увійдіть до
                системи з вашою особистою інформацією
              </p>
              <button className="ghost" onClick={togglePanel}>
                Авторизація
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="containerAuth-title">Привіт друг!</h1>
              <p className="containerAuth-description">
                Введіть свої особисті дані та почніть подорож разом з нами
              </p>
              <button className="ghost" onClick={togglePanel}>
                Реєстрація
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
