import { vacancies, type Vacancy } from './data/vacancies';

function escapeHtml(text: string): string {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function tagTone(tag: string): string {
  if (tag.includes('ОПЫТ') && !tag.includes('БЕЗ')) return 'tag--amber';
  if (tag.includes('ЖИЛЬ') || tag === 'С ЖИЛЬЕМ') return 'tag--amber';
  if (tag.includes('ЖЕНЩИН') || tag.includes('ЯЗЫК') || tag.includes('ПАР') && tag.includes('ДЛЯ П')) return 'tag--rose';
  if (tag.includes('СТУДЕНТ')) return 'tag--green';
  if (tag.includes('МУЖЧИН') || tag.includes('ВСЕХ') || tag.includes('ПАР') || tag.includes('ПИТАН')) return 'tag--blue';
  if (tag.includes('БЕЗ')) return 'tag--sand';
  return 'tag--sand';
}

function renderVacancyCard(v: Vacancy): string {
  const tagsHtml =
    v.tags.length > 0
      ? `<ul class="vacancy-card__tags" role="list">${v.tags
          .map(t => `<li class="tag ${tagTone(t)}">${escapeHtml(t)}</li>`)
          .join('')}</ul>`
      : '';

  return `
    <li class="vacancy-card">
      <h3 class="vacancy-card__title">${escapeHtml(v.title)}</h3>
      <p class="vacancy-card__salary">${escapeHtml(v.salary)}</p>
      <p class="vacancy-card__meta">
        <span class="vacancy-card__meta-icon" aria-hidden="true">📍</span>
        ${escapeHtml(v.location)}
      </p>
      <p class="vacancy-card__meta">
        <span class="vacancy-card__meta-icon" aria-hidden="true">📄</span>
        ${escapeHtml(v.contract)}
      </p>
      ${tagsHtml}
    </li>
  `;
}

function renderCtaCard(): string {
  return `
    <li class="vacancy-card vacancy-card--cta">
      <div class="vacancy-card__cta-icon" aria-hidden="true">💼</div>
      <h3 class="vacancy-card__cta-title">Не можете найти подходящую вакансию?</h3>
      <p class="vacancy-card__cta-text">
        Только за 1 минуту заполните простую анкету и получите предложения работ,
        которые будут отвечать вашим требованиям!
      </p>
      <a class="btn btn--cta" href="#contact">ЗАПОЛНИТЬ</a>
    </li>
  `;
}

/** CTA после 5-й карточки, как на референсе (позиция 6 в сетке 3×3) */
export function renderVacanciesSection(): string {
  const items: string[] = [];
  vacancies.forEach((v, i) => {
    items.push(renderVacancyCard(v));
    if (i === 4) items.push(renderCtaCard());
  });

  return `
    <section id="vacancies" class="section section--vacancies" aria-labelledby="vacancies-title">
      <div class="section__inner section__inner--wide">
        <h2 id="vacancies-title" class="section__title">Вакансии</h2>
        <p class="section__text section__text--vacancies">
          Актуальные предложения работы в Польше — официальное трудоустройство и сопровождение.
        </p>
        <ul class="vacancy-grid" role="list">
          ${items.join('')}
        </ul>
      </div>
    </section>
  `;
}
