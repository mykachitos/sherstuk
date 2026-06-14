export default function AccountPage({ user, orders, accountTab, setAccountTab, setUser, setCart, setPage }) {
  const userOrders = orders;
  const statusLabel = { new: "Новый", cooking: "Готовится", done: "Выполнен" };
  const statusClass = { new: "status-new", cooking: "status-cooking", done: "status-done" };

  return (
    <div className="page">
      <h1 className="page-title">Личный кабинет</h1>
      <div className="account-layout">
        <div className="account-sidebar">
          <div className="account-avatar">{user.name[0]}</div>
          <div className="account-name">{user.name}</div>
          <div className="account-email">{user.email}</div>
          <div className="sidebar-menu">
            {[["orders", "📦 Мои заказы"], ["profile", "👤 Профиль"], ["favorites", "❤️ Избранное"]].map(([k, l]) => (
              <button
                key={k}
                className={`sidebar-item ${accountTab === k ? "active" : ""}`}
                onClick={() => setAccountTab(k)}
              >
                {l}
              </button>
            ))}
          </div>
          <button
            className="logout-btn"
            onClick={() => { setUser(null); setCart([]); setPage("home"); }}
          >
            Выйти из аккаунта
          </button>
        </div>

        <div>
          {accountTab === "orders" && (
            <div>
              <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 22, color: "#3d2010", marginBottom: 20 }}>
                История заказов
              </h2>
              {userOrders.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-state-icon">📦</div>
                  <h3>Заказов пока нет</h3>
                  <p>Сделайте ваш первый заказ!</p>
                  <button className="add-cart-btn" onClick={() => setPage("catalog")}>В каталог</button>
                </div>
              ) : (
                userOrders.map(order => (
                  <div className="order-card" key={order.id}>
                    <div className="order-header">
                      <div>
                        <div className="order-id">Заказ {order.id}</div>
                        <div className="order-date">{order.date}</div>
                      </div>
                      <span className={`order-status ${statusClass[order.status]}`}>
                        {statusLabel[order.status]}
                      </span>
                    </div>
                    <div className="order-items-list">
                      {order.items.map(i => (
                        <div key={i.id}>{i.img} {i.name} × {i.qty}</div>
                      ))}
                    </div>
                    <div className="order-total">
                      Итого: {order.total.toLocaleString("ru")} ₽ ·{" "}
                      {order.delivery === "delivery" ? "Доставка" : "Самовывоз"}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {accountTab === "profile" && (
            <div className="order-card">
              <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 22, color: "#3d2010", marginBottom: 20 }}>
                Мои данные
              </h2>
              <div className="form-group" style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 13, color: "#8a6a50", fontWeight: 500 }}>Имя</label>
                <input
                  readOnly
                  value={user.name}
                  style={{ border: "1px solid rgba(122,79,46,0.15)", borderRadius: 10, padding: "10px 14px", fontSize: 14, fontFamily: "DM Sans, sans-serif", width: "100%", color: "#2d2217", background: "#faf7f2" }}
                />
              </div>
              <div className="form-group">
                <label style={{ fontSize: 13, color: "#8a6a50", fontWeight: 500 }}>Email</label>
                <input
                  readOnly
                  value={user.email}
                  style={{ border: "1px solid rgba(122,79,46,0.15)", borderRadius: 10, padding: "10px 14px", fontSize: 14, fontFamily: "DM Sans, sans-serif", width: "100%", color: "#2d2217", background: "#faf7f2" }}
                />
              </div>
              <div style={{ marginTop: 16, fontSize: 13, color: "#8a6a50" }}>
                Зарегистрирован: {user.created}
              </div>
            </div>
          )}

          {accountTab === "favorites" && (
            <div className="empty-state">
              <div className="empty-state-icon">❤️</div>
              <h3>Избранное пока пусто</h3>
              <p>Нажмите на ❤️ на карточке товара, чтобы сохранить</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}