import React from "react";

export default function Footer() {
  return (
    <>
      <footer className="bg-dark text-white footer">
        <div className="containerFot p-4">
          <div className="row">
            <div className="col-md-3">
              <h5 className="zagolovok">Про нас</h5>
              <hr className="hr-text zagolovok-hr" />
              <p>
                Наша платформа пропонує широкий спектр курсів з військової
                стратегії.
              </p>
            </div>
            <div className="col-md-3">
              <h5>Контакти</h5>
              <hr className="hr-text contacts-hr" />
              <ul className="list-unstyled">
                <li className="email">
                  Email:{" "}
                  <a href="mailto:kirycha21@gmail.com"> kirycha21@gmail.com</a>
                </li>
                <li className="phone">
                  Телефон: <a href="tel:+380936320370">+380936320370</a>
                </li>
              </ul>
            </div>
            <div className="col-md-3">
              <h5>Посилання</h5>
              <hr className="hr-text links-hr" />
              <ul className="list-unstyled">
                <li className="list">
                  <a href="/api/courses" className="text-white ">
                    Курси
                  </a>
                </li>
                <li className="list">
                  <a href="/modules" className="text-white">
                    Модулі
                  </a>
                </li>
                <li className="list">
                  <a href="/practice" className="text-white">
                    Практика
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-3">
              <h5>Підписатися</h5>
              <hr className="hr-text subscribe-hr" />
              <p className="subscribe">
                Підпишіться на нашу розсилку, щоб бути в курсі новин та
                оновлень.
              </p>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  aria-label="Email"
                  aria-describedby="button-addon2"
                />
                <button
                  className="btn btn-primary bg-secondary"
                  type="button"
                  id="button-addon2"
                >
                  Підписатися
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center p-3 bg-secondary">
          &copy; {new Date().getFullYear()} ВІТІ Військова Платформа
        </div>
      </footer>
    </>
  );
}
