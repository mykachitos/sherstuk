export default function AboutPage({ setPage }) {
  const team = [
    { name: "Анна Стерчук", role: "Основатель · Шеф-кондитер", emoji: "👩‍🍳", desc: "10 лет в кондитерском деле. Стажировалась во Франции и Бельгии." },
    { name: "Михаил Орлов", role: "Шоколатье", emoji: "🍫", desc: "Создаёт авторские конфеты из бельгийского шоколада премиум-класса." },
    { name: "Елена Краснова", role: "Декоратор тортов", emoji: "🎨", desc: "Превращает каждый торт в произведение искусства. Победитель конкурсов." },
  ];

  const values = [
    { icon: "🌿", title: "Натуральные ингредиенты", desc: "Только свежие продукты от проверенных поставщиков. Без консервантов и красителей." },
    { icon: "✋", title: "Ручная работа", desc: "Каждое изделие создаётся вручную с любовью и вниманием к деталям." },
    { icon: "🎯", title: "Индивидуальный подход", desc: "Принимаем заказы любой сложности. Воплотим вашу идею в сладость." },
    { icon: "⚡", title: "Свежесть гарантирована", desc: "Готовим в день заказа. Никаких залежавшихся товаров." },
  ];

  const timeline = [
    { year: "2022", title: "Начало пути", desc: "Анна открыла маленькую домашнюю кондитерскую во Владивостоке." },
    { year: "2023", title: "Первая мастерская", desc: "Открытие профессиональной мастерской на ул. Пушкинской." },
    { year: "2024", title: "Команда растёт", desc: "К нам присоединились шоколатье и декоратор. Расширили ассортимент." },
    { year: "2026", title: "500+ клиентов", desc: "Мы стали любимой кондитерской для сотен семей города." },
  ];

  return (
    <div>
      {/* HERO */}
      <div className="about-hero">
        <div className="about-hero-content">
          <p className="hero-eyebrow">О нас</p>
          <h1>Маленькая мастерская<br /><em>с большой историей</em></h1>
          <p>Мы — команда влюблённых в своё дело кондитеров. Создаём сладости, от которых хочется улыбаться.</p>
        </div>
      </div>

      <div className="page">
        {/* НАША ИСТОРИЯ */}
        <section className="about-section">
          <div className="about-story">
            <div className="about-story-text">
              <div className="about-eyebrow">Наша история</div>
              <h2 className="about-h2">Всё началось с домашней кухни</h2>
              <p>
                В 2022 году Анна Стерчук начала печь торты на заказ прямо у себя дома.
                Первые клиенты — друзья и соседи — быстро рассказали о ней всему городу.
              </p>
              <p>
                Сегодня <strong>SweetHand</strong> — это уютная мастерская в центре Владивостока,
                команда из трёх профессионалов и сотни довольных клиентов.
                Но главное осталось неизменным: каждое изделие мы делаем так,
                будто готовим его для самых близких людей.
              </p>
              <button className="btn-primary about-btn" onClick={() => setPage("catalog")}>
                Посмотреть наши работы →
              </button>
            </div>
            <div className="about-story-img">
              <div className="about-emoji-big">🍰</div>
            </div>
          </div>
        </section>

        {/* ЦЕННОСТИ */}
        <section className="about-section">
          <div className="about-eyebrow center">Наши принципы</div>
          <h2 className="about-h2 center">Во что мы верим</h2>
          <div className="values-grid">
            {values.map(v => (
              <div className="value-card" key={v.title}>
                <div className="value-icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TIMELINE */}
        <section className="about-section">
          <div className="about-eyebrow center">Хронология</div>
          <h2 className="about-h2 center">Наш путь</h2>
          <div className="timeline">
            {timeline.map((t, i) => (
              <div className="timeline-item" key={t.year}>
                <div className="timeline-dot"></div>
                <div className="timeline-year">{t.year}</div>
                <div className="timeline-content">
                  <h3>{t.title}</h3>
                  <p>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* КОМАНДА */}
        <section className="about-section">
          <div className="about-eyebrow center">Команда</div>
          <h2 className="about-h2 center">Люди, которые создают магию</h2>
          <div className="team-grid">
            {team.map(m => (
              <div className="team-card" key={m.name}>
                <div className="team-avatar">{m.emoji}</div>
                <div className="team-name">{m.name}</div>
                <div className="team-role">{m.role}</div>
                <p className="team-desc">{m.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* СТАТИСТИКА */}
        <section className="about-stats">
          <div className="about-stats-grid">
            {[
              ["500+", "Довольных клиентов"],
              ["1200+", "Выполненных заказов"],
              ["4", "Года на рынке"],
              ["12", "Видов изделий"],
            ].map(([n, l]) => (
              <div className="about-stat" key={l}>
                <div className="about-stat-num">{n}</div>
                <div className="about-stat-label">{l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="about-cta">
          <h2>Готовы попробовать?</h2>
          <p>Загляните в наш каталог или напишите нам — обсудим ваш идеальный десерт.</p>
          <div className="hero-btns" style={{ justifyContent: "center" }}>
            <button className="btn-primary" style={{ background: "#7a4f2e", color: "white" }} onClick={() => setPage("catalog")}>
              В каталог
            </button>
            <button className="nav-icon-btn" onClick={() => setPage("home")}>
              На главную
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}