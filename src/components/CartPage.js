import { useEffect, useMemo, useState } from "react";
import { formatMoney } from "../utils/format";

function CartItemThumb({ item }) {
  return <img className="cart-item-thumb" src={item.imageUrl} alt={item.name} />;
}

export default function CartPage({
  cart,
  cartTotal,
  cartOriginalTotal,
  updateQty,
  setPage,
  user,
  onSubmitOrder,
  orderSuccess,
  setOrderSuccess,
}) {
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: "",
    deliveryMethod: "pickup",
    comment: "",
    consent: false,
  });

  useEffect(() => {
    setForm(current => ({
      ...current,
      name: user?.name || current.name,
      phone: user?.phone || current.phone,
    }));
  }, [user]);

  const deliveryPrice = form.deliveryMethod === "delivery" ? 300 : 0;
  const totalWithDelivery = cartTotal + deliveryPrice;
  const savings = Math.max(0, cartOriginalTotal - cartTotal);

  const canSubmit = useMemo(() => {
    if (submitting || !form.name || !form.phone || !form.consent) {
      return false;
    }

    if (form.deliveryMethod === "delivery" && !form.address.trim()) {
      return false;
    }

    return true;
  }, [form, submitting]);

  const handleSubmit = async event => {
    event.preventDefault();
    setSubmitting(true);

    const result = await onSubmitOrder(form);
    if (result.ok) {
      setShowForm(false);
    }

    setSubmitting(false);
  };

  if (orderSuccess) {
    return (
      <div className="page page-narrow">
        <div className="success-screen">
          <div className="success-pill">Заказ принят</div>
          <h1>Спасибо за заказ</h1>
          <p>
            Номер заказа: <strong>{orderSuccess.number}</strong>. Мы свяжемся с вами
            для подтверждения состава, времени и доставки.
          </p>
          <div className="hero-btns">
            <button
              className="btn-primary"
              onClick={() => {
                setOrderSuccess(null);
                setPage("account");
              }}
            >
              Мои заказы
            </button>
            <button
              className="btn-secondary"
              onClick={() => {
                setOrderSuccess(null);
                setPage("catalog");
              }}
            >
              Продолжить покупки
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!cart.length) {
    return (
      <div className="page page-narrow">
        <div className="empty-state">
          <div className="empty-state-icon">○</div>
          <h3>Корзина пока пустая</h3>
          <p>Добавьте десерты из каталога, и мы соберём для вас заказ.</p>
          <button className="btn-primary" onClick={() => setPage("catalog")}>
            Перейти в каталог
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="catalog-hero compact">
        <div>
          <span className="eyebrow">Корзина</span>
          <h1 className="page-title">Ваш заказ</h1>
          <p className="page-subtitle">
            Проверьте состав корзины, а затем перейдите к оформлению и отправке заказа.
          </p>
        </div>
      </div>

      {!user ? (
        <div className="inline-alert">
          Чтобы завершить оформление, понадобится вход в аккаунт. Корзину можно собрать заранее.
          <button className="inline-link" onClick={() => setPage("auth")}>
            Войти
          </button>
        </div>
      ) : null}

      <div className="cart-layout">
        <div className="cart-panel">
          <div className="cart-items">
            {cart.map(item => (
              <div className="cart-item" key={item.id}>
                <CartItemThumb item={item} />
                <div className="cart-item-info">
                  <strong>{item.name}</strong>
                  <span>{item.weight}</span>
                  <span>{item.category?.name}</span>
                </div>
                <div className="qty-ctrl">
                  <button className="qty-btn" onClick={() => updateQty(item.id, -1)}>
                    -
                  </button>
                  <span className="qty-num">{item.qty}</span>
                  <button className="qty-btn" onClick={() => updateQty(item.id, 1)}>
                    +
                  </button>
                </div>
                <div className="cart-item-price">{formatMoney(item.price * item.qty)}</div>
              </div>
            ))}
          </div>

          {showForm ? (
            <form className="order-form" onSubmit={handleSubmit}>
              <div className="form-head">
                <h3>Оформление заказа</h3>
                <p>Мы передадим заказ в работу сразу после подтверждения.</p>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Имя *</label>
                  <input
                    value={form.name}
                    onChange={event => setForm({ ...form, name: event.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Телефон *</label>
                  <input
                    value={form.phone}
                    onChange={event => setForm({ ...form, phone: event.target.value })}
                    placeholder="+7 (___) ___-__-__"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Способ получения</label>
                <select
                  value={form.deliveryMethod}
                  onChange={event => setForm({ ...form, deliveryMethod: event.target.value })}
                >
                  <option value="pickup">Самовывоз</option>
                  <option value="delivery">Доставка по Владивостоку</option>
                </select>
              </div>

              {form.deliveryMethod === "delivery" ? (
                <div className="form-group">
                  <label>Адрес доставки</label>
                  <input
                    value={form.address}
                    onChange={event => setForm({ ...form, address: event.target.value })}
                    placeholder="Улица, дом, квартира"
                    required
                  />
                </div>
              ) : null}

              <div className="form-group">
                <label>Комментарий</label>
                <textarea
                  value={form.comment}
                  onChange={event => setForm({ ...form, comment: event.target.value })}
                  placeholder="Пожелания по оформлению, времени и упаковке"
                />
              </div>

              <label className="consent-check">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={event => setForm({ ...form, consent: event.target.checked })}
                  required
                />
                <span>Согласен на обработку персональных данных</span>
              </label>

              <button type="submit" className="checkout-btn" disabled={!canSubmit}>
                {submitting
                  ? "Отправляем..."
                  : `Подтвердить заказ на ${formatMoney(totalWithDelivery)}`}
              </button>
            </form>
          ) : null}
        </div>

        <aside className="cart-summary">
          <h3>Сводка</h3>
          {cart.map(item => (
            <div className="summary-row" key={item.id}>
              <span>
                {item.name} ×{item.qty}
              </span>
              <span>{formatMoney(item.price * item.qty)}</span>
            </div>
          ))}

          {deliveryPrice > 0 ? (
            <div className="summary-row">
              <span>Доставка</span>
              <span>{formatMoney(deliveryPrice)}</span>
            </div>
          ) : null}

          <div className="summary-row total">
            <span>Итого</span>
            <span>{formatMoney(totalWithDelivery)}</span>
          </div>

          {savings > 0 ? (
            <div className="summary-note">Ваша экономия: {formatMoney(savings)}</div>
          ) : null}

          <button className="checkout-btn" onClick={() => setShowForm(value => !value)}>
            {showForm ? "Скрыть форму" : "Перейти к оформлению"}
          </button>
        </aside>
      </div>
    </div>
  );
}
