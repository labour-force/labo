import './style.css';
import { renderVacanciesSection } from './renderVacancies';

const SUPPORT_EMAIL = 'support@labour-forcegroup.com';
const FORM_ACTION = `https://formsubmit.co/${SUPPORT_EMAIL}`;

/** Замените на ваш реальный номер (отображение и ссылка tel:) */
const CONTACT_PHONE_DISPLAY = '+380 00 000 00 00';
const CONTACT_PHONE_HREF = 'tel:+380000000000';

function renderRegistrationModal(): string {
  return `
    <div class="modal" id="registration-modal" hidden>
      <div class="modal__backdrop" data-close-modal tabindex="-1"></div>
      <div class="modal__dialog" role="dialog" aria-modal="true" aria-labelledby="registration-title">
        <button type="button" class="modal__close" data-close-modal aria-label="Close">&times;</button>
        <h2 id="registration-title" class="modal__title">Registratsiya na vakansiyu</h2>
        <p class="modal__vacancy" id="registration-vacancy" hidden></p>
        <form class="modal__form" id="registration-form" action="${FORM_ACTION}" method="POST">
          <input type="hidden" name="_subject" value="Zayavka Labour force group" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="Vacancy" id="registration-vacancy-field" value="" />
          <label class="field">
            <span class="field__label">Imya i familiya</span>
            <input class="field__input" type="text" name="Name" required autocomplete="name" />
          </label>
          <label class="field">
            <span class="field__label">Telefon</span>
            <input class="field__input" type="tel" name="Phone" required autocomplete="tel" />
          </label>
          <label class="field">
            <span class="field__label">Email</span>
            <input class="field__input" type="email" name="Email" required autocomplete="email" />
          </label>
          <label class="field">
            <span class="field__label">Soobshchenie</span>
            <textarea class="field__input field__input--textarea" name="Message" rows="3"></textarea>
          </label>
          <button type="submit" class="btn btn--submit">Otpravit zayavku</button>
          <p class="modal__note">${SUPPORT_EMAIL}</p>
        </form>
      </div>
    </div>
  `;
}

function initRegistrationModal(): void {
  const modal = document.getElementById('registration-modal');
  const vacancyLabel = document.getElementById('registration-vacancy');
  const vacancyField = document.getElementById('registration-vacancy-field') as HTMLInputElement | null;
  const form = document.getElementById('registration-form') as HTMLFormElement | null;
  if (!modal || !vacancyLabel || !vacancyField || !form) return;

  const open = (vacancyTitle?: string) => {
    const title = vacancyTitle?.trim() || 'Obshaya zayavka';
    vacancyField.value = title;
    vacancyLabel.textContent = title;
    vacancyLabel.hidden = false;
    modal.hidden = false;
    document.body.classList.add('modal-open');
    form.querySelector<HTMLInputElement>('input[name="Name"]')?.focus();
  };

  const close = () => {
    modal.hidden = true;
    document.body.classList.remove('modal-open');
  };

  document.addEventListener('click', e => {
    const target = e.target as HTMLElement | null;
    if (!target) return;
    const openTrigger = target.closest<HTMLElement>('[data-open-registration]');
    if (openTrigger) {
      e.preventDefault();
      open(openTrigger.dataset.vacancyTitle);
      return;
    }
    if (target.closest('[data-close-modal]')) close();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modal.hidden) close();
  });
}

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="page">
    <header class="header">
      <a class="brand" href="#top">Labour<span class="brand__accent">force</span> group</a>
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
          <h1 id="hero-title" class="hero__title">Labour force group</h1>
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
          <p class="contact__hint">Свяжитесь с нами:</p>
          <a class="contact__phone" href="${CONTACT_PHONE_HREF}">${CONTACT_PHONE_DISPLAY}</a>
          <a class="contact__email" href="mailto:${SUPPORT_EMAIL}">${SUPPORT_EMAIL}</a>
        </div>
      </section>
    </main>

    <footer class="footer">
      <span class="footer__copy">© ${new Date().getFullYear()} Labour force group</span>
    </footer>
  </div>
  ${renderRegistrationModal()}
`;

initRegistrationModal();
