import { useEffect, useMemo, useState } from "react";
import { ORDER_STATUS_LABELS } from "../constants/data";
import { formatDate, formatMoney } from "../utils/format";
import ProductCard from "./ProductCard";

function OrderThumb({ item }) {
  return <img className="order-item-thumb" src={item.imageUrl} alt={item.name} />;
}

export default function AccountPage({
  user,
  orders,
  favoriteProducts,
  accountTab,
  setAccountTab,
  onLogout,
  setPage,
  toggleFavorite,
  addToCart,
  addedIds,
  onSaveProfile,
  loading,
}) {
  const [profile, setProfile] = useState({ name: "", phone: "" });

  useEffect(() => {
    setProfile({
      name: user?.name || "",
      phone: user?.phone || "",
    });
  }, [user]);

  const counters = useMemo(
    () => ({
      orders: orders.length,
      favorites: favoriteProducts.length,
      amount: orders.reduce((sum, order) => sum + order.total, 0),
    }),
    [favoriteProducts, orders]
  );

  if (!user) {
    return (
      <div className="page page-narrow">
        <div className="empty-state">
          <div className="empty-state-icon">○</div>
          <h3>Профиль доступен после входа</h3>
          <p>Авторизуйтесь, чтобы увидеть избранное, заказы и персональные данные.</p>
          <button className="btn-primary" onClick={() => setPage("auth")}>
            Войти
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="account-overview">
        <div className="account-hero-card">
          <div className="account-avatar large">{user.name[0]}</div>
          <div>
            <span className="eyebrow">Личный кабинет</span>
            <h1 className="page-title">{user.name}</h1>
            <p className="page-subtitle">
              Управляйте профилем, избранными десертами и заказами в одном месте.
            </p>
          </div>
        </div>

        <div className="overview-stats">
          <div className="overview-card">
            <strong>{counters.orders}</strong>
            <span>Заказов</span>
          </div>
          <div className="overview-card">
            <strong>{counters.favorites}</strong>
            <span>В избранном</span>
          </div>
          <div className="overview-card">
            <strong>{formatMoney(counters.amount)}</strong>
            <span>Сумма заказов</span>
          </div>
        </div>
      </div>

      <div className="account-layout">
        <aside className="account-sidebar">
          <div className="sidebar-menu">
            {[
              ["orders", "Заказы"],
              ["profile", "Профиль"],
              ["favorites", "Избранное"],
            ].map(([key, label]) => (
              <button
                key={key}
                className={`sidebar-item ${accountTab === key ? "active" : ""}`}
                onClick={() => setAccountTab(key)}
              >
                {label}
              </button>
            ))}
          </div>
          <button className="logout-btn" onClick={() => onLogout()}>
            Выйти
          </button>
        </aside>

        <div className="account-main">
          {accountTab === "orders" ? (
            <section>
              <div className="section-heading">
                <h2>История заказов</h2>
                <p>Здесь собраны все оформленные заказы и их текущие статусы.</p>
              </div>
              {loading ? (
                <div className="empty-state small">
                  <p>Загружаем историю заказов...</p>
                </div>
              ) : orders.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-state-icon">○</div>
                  <h3>Пока нет заказов</h3>
                  <p>Когда оформите первый заказ, он появится здесь.</p>
                  <button className="btn-primary" onClick={() => setPage("catalog")}>
                    Перейти в каталог
                  </button>
                </div>
              ) : (
                orders.map(order => (
                  <article className="order-card" key={order.id}>
                    <div className="order-header">
                      <div>
                        <div className="order-id">{order.number}</div>
                        <div className="order-date">{formatDate(order.createdAt)}</div>
                      </div>
                      <span className={`order-status status-${order.status}`}>
                        {ORDER_STATUS_LABELS[order.status] || order.status}
                      </span>
                    </div>
                    <div className="order-items-list">
                      {order.items.map(item => (
                        <div className="order-item-row" key={item.id}>
                          <OrderThumb item={item} />
                          <div className="order-item-text">
                            <strong>{item.name}</strong>
                            <span>
                              {item.qty} шт. • {formatMoney(item.price * item.qty)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="order-total">
                      Итого: {formatMoney(order.total)} •{" "}
                      {order.deliveryMethod === "delivery" ? "Доставка" : "Самовывоз"}
                    </div>
                  </article>
                ))
              )}
            </section>
          ) : null}

          {accountTab === "profile" ? (
            <section className="profile-card">
              <div className="section-heading">
                <h2>Профиль</h2>
                <p>Обновите имя и телефон для следующих заказов.</p>
              </div>

              <div className="form-group">
                <label>Email</label>
                <input value={user.email} readOnly />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Имя</label>
                  <input
                    value={profile.name}
                    onChange={event =>
                      setProfile(current => ({ ...current, name: event.target.value }))
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Телефон</label>
                  <input
                    value={profile.phone}
                    onChange={event =>
                      setProfile(current => ({ ...current, phone: event.target.value }))
                    }
                  />
                </div>
              </div>
              <div className="profile-actions">
                <button className="btn-primary" onClick={() => onSaveProfile(profile)}>
                  Сохранить изменения
                </button>
                <span className="profile-hint">Аккаунт создан {formatDate(user.dateJoined)}</span>
              </div>
            </section>
          ) : null}

          {accountTab === "favorites" ? (
            <section>
              <div className="section-heading">
                <h2>Избранное</h2>
                <p>Сохраняйте понравившиеся позиции и возвращайтесь к ним позже.</p>
              </div>
              {favoriteProducts.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-state-icon">○</div>
                  <h3>Избранное пока пустое</h3>
                  <p>Откройте каталог и отметьте товары сердцем.</p>
                  <button className="btn-primary" onClick={() => setPage("catalog")}>
                    Открыть каталог
                  </button>
                </div>
              ) : (
                <div className="products-grid">
                  {favoriteProducts.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAdd={addToCart}
                      added={Boolean(addedIds[product.id])}
                      isFavorite
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}
                </div>
              )}
            </section>
          ) : null}
        </div>
      </div>
    </div>
  );
}
