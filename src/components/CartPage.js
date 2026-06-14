import { useState } from "react";

export default function CartPage({ cart, cartTotal, updateQty, setCart, user, orders, setOrders, showToast, setPage, orderSuccess, setOrderSuccess }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    phone: "",
    address: "",
    delivery: "pickup",
    comment: "",
  });

  const placeOrder = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    const order = {
      id: `SW-${Date.now()}`,
      date: new Date().toLocaleDateString("ru"),
      status: "new",
      items: [...cart],
      total: cartTotal,
      delivery: form.delivery,
      address: form.address,
      phone: form.phone,
    };
    setOrders(prev => [order, ...prev]);
    setCart([]);
    setOrderSuccess(true);
    showToast("Заказ успешно оформлен!", "success");
  };

  if (orderSuccess)
    return (
      <div className="page">
        <div className="success-screen">
          <div className="big-icon">🎉</div>
          <h2>Заказ оформлен!</h2>
          <p>Мы уже приступаем к приготовлению. Ожидайте звонка для подтверждения.</p>
          <button
            className="btn-primary"
            style={{ background: "#7a4f2e", color: "white", border: "none", borderRadius: 12, padding: "13px 28px", fontSize: 15, cursor: "pointer" }}
            onClick={() => { setOrderSuccess(false); setPage("account"); }}
          >
            Мои заказы
          </button>
        </div>
      </div>
    );

  if (!cart.length)
    return (
      <div className="page">
        <h1 className="page-title">Корзина</h1>
        <div className="empty-state">
          <div className="empty-state-icon">🛒</div>
          <h3>Корзина пуста</h3>
          <p>Добавьте что-нибудь вкусное из нашего каталога</p>
          <button className="add-cart-btn" onClick={() => setPage("catalog")}>
            Перейти в каталог
          </button>
        </div>
      </div>
    );

  return (
    <div className="page">
      <h1 className="page-title">Корзина</h1>
      <div className="cart-layout">
        <div>
          <div className="cart-items">
            {cart.map(item => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-emoji">{item.img}</div>
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-sub">{item.price.toLocaleString("ru")} ₽ · {item.weight}</div>
                </div>
                <div className="qty-ctrl">
                  <button className="qty-btn" onClick={() => updateQty(item.id, -1)}>−</button>
                  <span className="qty-num">{item.qty}</span>
                  <button className="qty-btn" onClick={() => updateQty(item.id, 1)}>+</button>
                </div>
                <div className="cart-item-price">{(item.price * item.qty).toLocaleString("ru")} ₽</div>
                <button className="remove-btn" onClick={() => updateQty(item.id, -item.qty)}>✕</button>
              </div>
            ))}
          </div>

          {showForm && (
            <form className="order-form" onSubmit={placeOrder}>
              <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: 20, color: "#3d2010" }}>
                Оформление заказа
              </h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Имя *</label>
                  <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>Телефон *</label>
                  <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+7 (___) ___-__-__" required />
                </div>
              </div>
              <div className="form-group">
                <label>Способ получения</label>
                <select value={form.delivery} onChange={e => setForm({ ...form, delivery: e.target.value })}>
                  <option value="pickup">Самовывоз (ул. Пушкинская, 14)</option>
                  <option value="delivery">Доставка по Владивостоку (+300 ₽)</option>
                </select>
              </div>
              {form.delivery === "delivery" && (
                <div className="form-group">
                  <label>Адрес доставки</label>
                  <input value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} placeholder="Улица, дом, квартира" />
                </div>
              )}
              <div className="form-group">
                <label>Комментарий к заказу</label>
                <textarea value={form.comment} onChange={e => setForm({ ...form, comment: e.target.value })} placeholder="Пожелания по украшению, особые требования..." />
              </div>
              <button type="submit" className="checkout-btn" style={{ marginTop: 0 }}>
                Подтвердить заказ на {(cartTotal + (form.delivery === "delivery" ? 300 : 0)).toLocaleString("ru")} ₽
              </button>
            </form>
          )}
        </div>

        <div className="cart-summary">
          <h3>Итого</h3>
          {cart.map(i => (
            <div className="summary-row" key={i.id}>
              <span>{i.name} ×{i.qty}</span>
              <span>{(i.price * i.qty).toLocaleString("ru")} ₽</span>
            </div>
          ))}
          <div className="summary-row total">
            <span>Итого</span>
            <span>{cartTotal.toLocaleString("ru")} ₽</span>
          </div>
          <button className="checkout-btn" onClick={() => setShowForm(!showForm)}>
            {showForm ? "Скрыть форму" : "Оформить заказ →"}
          </button>
        </div>
      </div>
    </div>
  );
}