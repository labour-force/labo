import './style.css';
import { renderVacanciesSection } from './renderVacancies';

/** Замените на ваш реальный номер (отображение и ссылка tel:) */
const CONTACT_PHONE_DISPLAY = '+380 00 000 00 00';
const CONTACT_PHONE_HREF = 'tel:+380000000000';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="page">
    <header class="header">
      <a class="brand" href="#top">Labour<span class="brand__accent">force</span></a>
      <nav class="nav" aria-label="Навигация">
        <a href="#about">О нас</a>
        <a href="#vacancies">Вакансии</a>
        <a href="#services">Услуги</a>
        <a href="#contact">Контакты</a>
      </nav>
    </header>

    <main id="top">
      <section class="hero" aria-labelledby="hero-title">
        <div class="hero__inner">
          <p class="hero__eyebrow">Кадровые решения для бизнеса</p>
          <h1 id="hero-title" class="hero__title">Labour force</h1>
          <p class="hero__lead">
            Подбор персонала и сопровождение кадровых процессов — без лишнего шума,
            с фокусом на результат и сроки.
          </p>
          <a class="btn" href="#vacancies">Смотреть вакансии</a>
        </div>
        <div class="hero__glow" aria-hidden="true"></div>
      </section>

      <section id="about" class="section section--about" aria-labelledby="about-title">
        <div class="section__inner">
          <h2 id="about-title" class="section__title">О компании</h2>
          <p class="section__text">
            Мы помогаем компаниям закрывать кадровые задачи: от поиска специалистов
            до организации процессов найма. Работаем прозрачно и по договорённости —
            без публичного перечисления лицензий и сертификатов на сайте.
          </p>
        </div>
      </section>

      ${renderVacanciesSection()}

      <section id="services" class="section section--services" aria-labelledby="services-title">
        <div class="section__inner">
          <h2 id="services-title" class="section__title">Услуги</h2>
          <ul class="cards" role="list">
            <li class="card">
              <h3 class="card__title">Подбор персонала</h3>
              <p class="card__text">Поиск кандидатов под ваши критерии и этапы отбора.</p>
            </li>
            <li class="card">
              <h3 class="card__title">Кадровое сопровождение</h3>
              <p class="card__text">Консультации и поддержка по вопросам трудоустройства и документов.</p>
            </li>
            <li class="card">
              <h3 class="card__title">HR-процессы</h3>
              <p class="card__text">Помощь в выстраивании понятного цикла найма для команды.</p>
            </li>
          </ul>
        </div>
      </section>

      <section id="contact" class="section section--contact" aria-labelledby="contact-title">
        <div class="section__inner section__inner--narrow">
          <h2 id="contact-title" class="section__title">Контакты</h2>
          <p class="contact__hint">Свяжитесь с нами по телефону:</p>
          <a class="contact__phone" href="${CONTACT_PHONE_HREF}">${CONTACT_PHONE_DISPLAY}</a>
        </div>
      </section>
    </main>

    <footer class="footer">
      <span class="footer__copy">© ${new Date().getFullYear()} Labour force</span>
    </footer>
  </div>
`;
