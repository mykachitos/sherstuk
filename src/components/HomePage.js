import { useState } from "react";
import { PRODUCTS } from "../constants/data";
import ProductCard from "./ProductCard";

export default function HomePage({ setPage, addToCart, addedIds, user, feedbackSent, setFeedbackSent, showToast }) {
  const featured = PRODUCTS.filter(p => p.badge);
  const [fbName, setFbName] = useState("");
  const [fbEmail, setFbEmail] = useState("");
  const [fbMsg, setFbMsg] = useState("");

  const sendFeedback = (e) => {
    e.preventDefault();
    if (!fbName || !fbEmail || !fbMsg) return;
    setFeedbackSent(true);
    showToast("Сообщение отправлено! Мы свяжемся с вами.", "success");
  };

  return (
    <div>
      <div className="hero">
        <div className="hero-content">
          <p className="hero-eyebrow">Владивосток · Ручная работа</p>
          <h1>Сладкие шедевры<br /><em>с любовью</em> для вас</h1>
          <p>Каждое изделие создаётся вручную из натуральных ингредиентов. Без консервантов, с душой и вниманием к каждой детали.</p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => setPage("catalog")}>Смотреть каталог</button>
            <button className="btn-outline-white" onClick={() => document.getElementById("feedback").scrollIntoView({ behavior: "smooth" })}>Написать нам</button>
          </div>
          <div className="hero-stats">
            {[["500+", "Довольных клиентов"], ["12", "Видов изделий"], ["3", "Года опыта"]].map(([n, l]) => (
              <div className="hero-stat" key={l}>
                <div className="hero-stat-num">{n}</div>
                <div className="hero-stat-label">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="page">
        <div className="section-header">
          <h2 className="section-title">Хиты продаж</h2>
          <button className="nav-btn" onClick={() => setPage("catalog")} style={{ fontSize: 14, color: "#7a4f2e" }}>
            Весь каталог →
          </button>
        </div>

        {!user && (
          <div className="lock-notice">
            <span className="lock-icon">🔒</span>
            <div>
              Чтобы добавлять товары в корзину и оформлять заказы, пожалуйста,{" "}
              <a onClick={() => setPage("auth")}>войдите или зарегистрируйтесь</a>.
            </div>
          </div>
        )}

        <div className="products-grid">
          {featured.map(p => (
            <ProductCard key={p.id} product={p} onAdd={addToCart} added={!!addedIds[p.id]} />
          ))}
        </div>

        <div id="feedback" className="feedback-section">
          <h2>Есть вопросы? Пишите!</h2>
          <p>Ответим в течение нескольких часов. Принимаем индивидуальные заказы.</p>
          {feedbackSent ? (
            <div style={{ color: "#27ae60", fontSize: 16, fontWeight: 500 }}>
              ✅ Ваше сообщение получено! Скоро свяжемся.
            </div>
          ) : (
            <form className="feedback-form" onSubmit={sendFeedback}>
              <input placeholder="Ваше имя" value={fbName} onChange={e => setFbName(e.target.value)} required />
              <input type="email" placeholder="Email" value={fbEmail} onChange={e => setFbEmail(e.target.value)} required />
              <textarea placeholder="Ваш вопрос или пожелание..." value={fbMsg} onChange={e => setFbMsg(e.target.value)} required />
              <button type="submit" className="feedback-btn">Отправить сообщение</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}