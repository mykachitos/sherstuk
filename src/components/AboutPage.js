export default function AboutPage({ onOpenCatalog }) {
  return (
    <div>
      <section className="about-hero">
        <div className="about-hero-content">
          <span className="eyebrow">О мастерской</span>
          <h1>Небольшая команда, которая делает десерты так, будто готовит их для близких.</h1>
          <p>
            SweetHand вырос из домашней кондитерской в понятный сервис с реальным
            каталогом, заказами, избранным и персональной обратной связью.
          </p>
        </div>
      </section>

      <div className="page">
        <section className="about-band">
          <div className="about-copy">
            <h2>Что изменилось на сайте</h2>
            <p>
              Теперь каталог работает через backend, на сайте есть скидки, товары
              месяца, избранное и полноценная форма обратной связи.
            </p>
            <p>
              Мы сохранили атмосферу авторской кондитерской, но сделали интерфейс
              плотнее, удобнее и ближе к реальному магазину.
            </p>
          </div>
          <div className="about-grid">
            {[
              ["Ручная сборка", "Каждый десерт оформляется вручную."],
              ["Живой каталог", "Ассортимент и цены приходят из backend."],
              ["Индивидуальный заказ", "Можно оставить заявку прямо с сайта."],
              ["Личный кабинет", "Избранное и история заказов доступны после входа."],
            ].map(([title, text]) => (
              <div className="about-card" key={title}>
                <strong>{title}</strong>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="about-cta">
          <h2>Готовы выбрать десерт?</h2>
          <p>Откройте каталог и посмотрите новые подборки, скидки и товары месяца.</p>
          <button className="btn-primary" onClick={() => onOpenCatalog("all")}>
            Перейти в каталог
          </button>
        </section>
      </div>
    </div>
  );
}
