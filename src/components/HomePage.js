import { useEffect, useState } from "react";
import { sendFeedback } from "../utils/api";
import { formatMoney } from "../utils/format";
import ProductCard from "./ProductCard";

function CategorySpotlight({ category, onOpenCatalog }) {
  return (
    <button className="category-spotlight" onClick={() => onOpenCatalog(category.slug)}>
      <span>{category.name}</span>
      <strong>{category.productCount} позиций</strong>
    </button>
  );
}

export default function HomePage({
  categories,
  featuredProducts,
  discountedProducts,
  monthProducts,
  favoriteIds,
  addToCart,
  toggleFavorite,
  addedIds,
  user,
  onOpenCatalog,
  onGoToAuth,
  feedbackSent,
  setFeedbackSent,
  showToast,
}) {
  const mainMonthProduct = monthProducts[0];
  const secondaryMonthProducts = monthProducts.slice(1, 4);
  const [sendingFeedback, setSendingFeedback] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    message: "",
    consent: false,
  });

  useEffect(() => {
    setForm(current => ({
      ...current,
      name: user?.name || current.name,
      email: user?.email || current.email,
      phone: user?.phone || current.phone,
    }));
  }, [user]);

  const handleFeedbackSubmit = async event => {
    event.preventDefault();
    setSendingFeedback(true);

    try {
      await sendFeedback({
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
        personalDataConsent: form.consent,
      });
      setFeedbackSent(true);
      setForm(current => ({
        ...current,
        message: "",
        consent: false,
      }));
      showToast("Сообщение отправлено. Мы скоро свяжемся с вами.", "success");
    } catch (error) {
      showToast(error.message || "Не удалось отправить сообщение.");
    } finally {
      setSendingFeedback(false);
    }
  };

  return (
    <div>
      <section className="hero">
        <div className="hero-content hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Новая коллекция SweetHand</span>
            <h1>Авторские десерты для подарков, семейных ужинов и красивых событий.</h1>
            <p>
              Большой каталог тортов, пирожных, печенья и шоколадных наборов.
              Теперь на сайте есть вход в аккаунт, реальные заказы, избранное и
              форма обратной связи для индивидуальных запросов.
            </p>
            <div className="hero-btns">
              <button className="btn-primary" onClick={() => onOpenCatalog("all")}>
                Открыть каталог
              </button>
              {!user ? (
                <button className="btn-secondary" onClick={onGoToAuth}>
                  Войти и сохранить избранное
                </button>
              ) : (
                <button className="btn-secondary" onClick={() => onOpenCatalog("all")}>
                  Продолжить покупки
                </button>
              )}
            </div>
            <div className="hero-stats">
              {[
                ["20+", "позиций в каталоге"],
                ["до 15%", "скидки недели"],
                ["ежедневно", "доставка и самовывоз"],
              ].map(([value, label]) => (
                <div className="hero-stat" key={label}>
                  <div className="hero-stat-num">{value}</div>
                  <div className="hero-stat-label">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {mainMonthProduct ? (
            <div className="hero-featured-card">
              <img src={mainMonthProduct.imageUrl} alt={mainMonthProduct.name} />
              <div className="hero-featured-overlay">
                <span className="eyebrow light">Товар месяца</span>
                <h2>{mainMonthProduct.name}</h2>
                <p>{mainMonthProduct.description}</p>
                <div className="hero-featured-bottom">
                  <strong>{formatMoney(mainMonthProduct.price)}</strong>
                  <button className="btn-primary invert" onClick={() => addToCart(mainMonthProduct)}>
                    В корзину
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <div className="page">
        <section className="homepage-section">
          <div className="section-heading">
            <h2>Категории</h2>
            <p>Быстрый переход к разделам каталога и подборкам по ассортименту.</p>
          </div>
          <div className="category-grid">
            {categories.map(category => (
              <CategorySpotlight
                key={category.id}
                category={category}
                onOpenCatalog={onOpenCatalog}
              />
            ))}
          </div>
        </section>

        {secondaryMonthProducts.length > 0 ? (
          <section className="homepage-section">
            <div className="section-heading">
              <h2>Подборка месяца</h2>
              <p>Десерты, которые команда рекомендует в этом месяце.</p>
            </div>
            <div className="month-picks-grid">
              {secondaryMonthProducts.map(product => (
                <div className="month-pick-card" key={product.id}>
                  <img src={product.imageUrl} alt={product.name} />
                  <div className="month-pick-body">
                    <strong>{product.name}</strong>
                    <p>{product.description}</p>
                    <div className="month-pick-footer">
                      <span>{formatMoney(product.price)}</span>
                      <button className="inline-link" onClick={() => addToCart(product)}>
                        Добавить
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section className="homepage-section">
          <div className="section-heading">
            <h2>Скидки недели</h2>
            <p>Актуальные предложения с реальной скидкой от базовой цены.</p>
          </div>
          <div className="products-grid">
            {discountedProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={addToCart}
                added={Boolean(addedIds[product.id])}
                isFavorite={favoriteIds.has(product.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        </section>

        <section className="homepage-section">
          <div className="section-heading">
            <h2>Популярные десерты</h2>
            <p>Позиции, которые чаще всего выбирают для подарков и праздников.</p>
          </div>
          <div className="products-grid">
            {featuredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={addToCart}
                added={Boolean(addedIds[product.id])}
                isFavorite={favoriteIds.has(product.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        </section>

        <section className="homepage-section feature-strip">
          {[
            ["Ручная работа", "Каждый десерт собирается вручную в мастерской."],
            ["Живой каталог", "Товары, скидки и заказы работают через реальный backend."],
            ["Избранное", "Сохраняйте понравившиеся позиции и возвращайтесь к ним позже."],
          ].map(([title, text]) => (
            <div className="feature-strip-card" key={title}>
              <strong>{title}</strong>
              <p>{text}</p>
            </div>
          ))}
        </section>

        <section id="feedback" className="feedback-section">
          <div className="feedback-header">
            <div>
              <span className="eyebrow">Обратная связь</span>
              <h2>Хотите что-то уточнить? Напишите нам</h2>
              <p>
                Оставьте сообщение, если нужен торт с индивидуальным оформлением,
                набор в подарок, расчёт на мероприятие или просто консультация по заказу.
              </p>
            </div>
            <div className="feedback-contacts">
              <div className="feedback-contact-card">
                <span>Телефон</span>
                <strong>+7 (423) 200-00-00</strong>
              </div>
              <div className="feedback-contact-card">
                <span>Email</span>
                <strong>hello@sweethand.ru</strong>
              </div>
            </div>
          </div>

          {feedbackSent ? (
            <div className="feedback-success">
              Мы получили сообщение. Менеджер свяжется с вами и уточнит детали.
            </div>
          ) : (
            <form className="feedback-form" onSubmit={handleFeedbackSubmit}>
              <div className="feedback-form-grid">
                <input
                  placeholder="Ваше имя"
                  value={form.name}
                  onChange={event => setForm(current => ({ ...current, name: event.target.value }))}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={event => setForm(current => ({ ...current, email: event.target.value }))}
                  required
                />
              </div>
              <input
                placeholder="Телефон"
                value={form.phone}
                onChange={event => setForm(current => ({ ...current, phone: event.target.value }))}
              />
              <textarea
                placeholder="Расскажите, что хотите уточнить или заказать"
                value={form.message}
                onChange={event => setForm(current => ({ ...current, message: event.target.value }))}
                required
              />
              <label className="consent-check">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={event => setForm(current => ({ ...current, consent: event.target.checked }))}
                  required
                />
                <span>Согласен на обработку персональных данных</span>
              </label>
              <button type="submit" className="feedback-btn" disabled={sendingFeedback}>
                {sendingFeedback ? "Отправляем..." : "Отправить сообщение"}
              </button>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}
