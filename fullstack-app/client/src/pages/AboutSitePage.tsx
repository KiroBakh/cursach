import React from "react";
import "../styles/styles.css";
import { NavLink } from "react-router-dom";

const AboutSite = () => {
  return (
    <div className="main-container">
      <div className="container containerAboutSite">
        <div className="about-content fw-bolder">
          <h1 className="text-center mt-4">
            Навчальна платформа для вивчення військових стратегій
          </h1>
          <p>
            Ласкаво просимо на нашу навчальну платформу, яка пропонує широкий
            вибір курсів з тактичних та оперативно-тактичних стратегій для
            вивчення військової науки.
          </p>

          <h2>Курси та Модулі</h2>
          <p>
            Наша платформа пропонує різноманітні курси та модулі, що дозволяють
            детально вивчити тактичні аспекти військових стратегій. Кожен курс
            складається з ряду уроків, які покривають різні теми, від введення в
            стратегічне мислення до тактичних вправ та тренувань.
          </p>
        </div>

        <h2 className="text-center my-4 fw-bold lear-courses">
          Вивчайте наші тактичні курси
        </h2>
        <div className="accordion" id="accordionPanelsStayOpenExample">
          {/* Курс 1 */}
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#course1"
                aria-expanded="true"
                aria-controls="course1"
              >
                Основи Військових стратегії
              </button>
            </h2>
            <div id="course1" className="accordion-collapse collapse show">
              <div className="accordion-body">
                Поглибтеся в основи тактичної стратегії та вивчайте ключові
                тактичні принципи та процеси прийняття рішень. Цей курс
                дозволить вам розібратися у фундаментальних аспектах тактичної
                стратегії, які використовуються в різних військових сценаріях.
                Ви дізнаєтеся, як вибирати оптимальні тактики в залежності від
                ситуації та впроваджувати їх у практику.
              </div>
            </div>
          </div>

          {/* Курс 2 */}
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#course2"
                aria-expanded="true"
                aria-controls="course2"
              >
                Сучасні Тактичні Військові Сценарії
              </button>
            </h2>
            <div id="course2" className="accordion-collapse collapse">
              <div className="accordion-body">
                <span className="fw-bold">
                  Аналіз Сучасних Військових Конфліктів:
                </span>{" "}
                Вивчайте найсучасніші військові конфлікти та аналізуйте їхні
                тактичні аспекти. Цей курс пропонує унікальний погляд на сучасні
                військові сценарії, дозволяючи глибше зрозуміти виклики та
                можливості, які вони представляють. Ви розкриєте найефективніші
                тактичні рішення, придатні для вирішення сучасних глобальних
                конфліктів.
                <hr />
                <span className="fw-bold">
                  Експериментальні Тактичні Сценарії:
                </span>{" "}
                Вируште у вивчення та аналіз експериментальних тактичних
                сценаріїв, що моделюють можливі військові ситуації майбутнього.
                Цей курс надасть вам можливість досліджувати новаторські
                стратегії та тактики, розроблені для вирішення сучасних та
                потенційних майбутніх військових викликів. Розширте свої знання
                та розвиньте навички, необхідні для ефективного управління у
                сучасних тактичних військових сценаріях.
              </div>
            </div>
          </div>

          {/* Курс 3 */}
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#course3"
                aria-expanded="true"
                aria-controls="course3"
              >
                Ефективне Використання Військової Техніки
              </button>
            </h2>
            <div id="course3" className="accordion-collapse collapse">
              <div className="accordion-body">
                <span className="fw-bold">
                  Оптимізація Застосування Військової Техніки:
                </span>{" "}
                Розгляньте найновіші стратегії та підходи до ефективного
                використання військової техніки. Цей курс дозволить вам глибше
                зрозуміти технічні аспекти військового обладнання та розглянути
                оптимальні методи їх впровадження в сучасних військових
                операціях. Ви отримаєте унікальні інсайти щодо стратегій,
                спрямованих на підвищення ефективності використання військової
                техніки на полі бою.
                <hr />
                <span className="fw-bold">
                  Тактичні Взаємодії із Технікою:
                </span>{" "}
                <span className="fw-bold">
                  Стратегії Управління Технічним Арсеналом:
                </span>{" "}
                Розвивайте стратегічні навички управління великим арсеналом
                військової техніки. Курс допоможе вам вивчити сучасні методи
                планування, розгортання та координації великого технічного
                арсеналу. Набуваючи знань у цьому напрямку, ви зможете
                забезпечити оптимальне та ефективне використання військової
                техніки у будь-яких стратегічних військових завданнях.
              </div>
            </div>
          </div>
        </div>

        <div id="carouselExampleFade" className="carousel slide carousel-fade">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="https://azov.org.ua/wp-content/uploads/2017/05/MG_1081.jpg"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://euromaidanpress.com/wp-content/uploads/2023/05/s-1.jpeg"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://static.espreso.tv/uploads/photobank/256000_257000/256850_306899175_159661333332017_2061017609135944064_n_new_960x380_0.webp"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://tvoemisto.tv/media/gallery/full/i/m/image1_cbd50.jpg"
                className="d-block w-100"
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        <p>
          <button
            className="btn btn-primary mb-2 mt-5 bg-gradient"
            style={{ width: "300px", height: "50px" }}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseWidthExample"
            aria-expanded="false"
            aria-controls="collapseWidthExample"
          >
            Подарунок для вас!
          </button>
        </p>
        <div style={{ minHeight: "120px" }}>
          <div
            className="collapse collapse-horizontal"
            id="collapseWidthExample"
          >
            <div
              className="card card-body free-courses"
            >
              <NavLink className="bg-dark" to="/api/courses">Вивчити курси безкоштовно</NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSite;
