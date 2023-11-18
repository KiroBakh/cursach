import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/styles.css";

export default function HomePage() {
  return (
    <>
      <div className="main">
        <div className="container">
          <div className="jumbotron home-page__jumbotron">
            <h1 className="display-4 home-page__title">
              Вітаємо на освітній платформі
            </h1>
            <p className="lead home-page__lead">
              На цьому сайті ви зможете вивчати "Військові стратегії на
              тактичному та оперативно-тактичному рівні".
            </p>
            <hr className="my-4 home-page__hr" />
            <p className="home-page__description">
              Виберіть курс та починайте вивчення. Наші модулі та уроки
              допоможуть вам засвоїти найкращі військові практики.
            </p>

            <NavLink to="/api/courses" className="btnC">
              Перейти до курсів
            </NavLink>
          </div>

          <div className="row">
            <div className="col-md-4 home-page__column">
              <h2 className="home-page__subtitle">Навчальні курси</h2>
              <p className="home-page__column-description">
                Виберіть навчальні курси від провідних експертів у галузі
                військової стратегії.
              </p>
              <NavLink
                to="/courses"
                className="btn btn-secondary home-page__btn-more"
              >
                Дізнатися більше
              </NavLink>
            </div>
            <div className="col-md-4 home-page__column">
              <h2 className="home-page__subtitle">Модулі та Заняття</h2>
              <p className="home-page__column-description">
                Перегляньте модулі та уроки для кращого засвоєння матеріалу та
                підвищення навичок.
              </p>
              <NavLink
                to="/modules"
                className="btn btn-secondary home-page__btn-more"
              >
                Дізнатися більше
              </NavLink>
            </div>
            <div className="col-md-4 home-page__column">
              <h2 className="home-page__subtitle">Практичне Застосування</h2>
              <p className="home-page__column-description">
                Застосовуйте знання у практиці через розв'язання вправ, тестів
                та практичних завдань.
              </p>
              <NavLink
                to="/practice"
                className="btn btn-secondary home-page__btn-more"
              >
                Дізнатися більше
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
