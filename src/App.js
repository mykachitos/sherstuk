import { useState, useEffect } from "react";
import { PRODUCTS, ORDERS_KEY, USER_KEY, CART_KEY } from "./constants/data";
import { css } from "./constants/styles";
import { getFromStorage, setToStorage } from "./utils/storage";

import HomePage from "./components/HomePage";
import CatalogPage from "./components/CatalogPage";
import CartPage from "./components/CartPage";
import AccountPage from "./components/AccountPage";
import AuthPage from "./components/AuthPage";
import AboutPage from "./components/AboutPage";

export default function SweetHandApp() {
  const [page, setPage] = useState("home");
  const [category, setCategory] = useState("Все");
  const [cart, setCart] = useState(() => getFromStorage(CART_KEY, []));
  const [user, setUser] = useState(() => getFromStorage(USER_KEY, null));
  const [orders, setOrders] = useState(() => getFromStorage(ORDERS_KEY, []));
  const [toast, setToast] = useState({ msg: "", type: "", show: false });
  const [addedIds, setAddedIds] = useState({});
  const [accountTab, setAccountTab] = useState("orders");
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);

  useEffect(() => { setToStorage(CART_KEY, cart); }, [cart]);
  useEffect(() => { setToStorage(USER_KEY, user); }, [user]);
  useEffect(() => { setToStorage(ORDERS_KEY, orders); }, [orders]);

  const showToast = (msg, type = "") => {
    setToast({ msg, type, show: true });
    setTimeout(() => setToast(t => ({ ...t, show: false })), 2500);
  };

  const addToCart = (product) => {
    if (!user) {
      showToast("Войдите, чтобы добавить в корзину");
      setPage("auth");
      return;
    }
    setCart(prev => {
      const ex = prev.find(i => i.id === product.id);
      if (ex) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    setAddedIds(p => ({ ...p, [product.id]: true }));
    setTimeout(() => setAddedIds(p => ({ ...p, [product.id]: false })), 1200);
    showToast(`${product.name} добавлен в корзину`, "success");
  };

  const updateQty = (id, delta) => {
    setCart(prev => {
      const updated = prev.map(i =>
        i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i
      );
      return updated.filter(i => i.qty > 0);
    });
  };

  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const filtered = category === "Все" ? PRODUCTS : PRODUCTS.filter(p => p.category === category);

  return (
    <>
      <style>{css}</style>
      <div className="app">
        <nav className="nav">
          <div className="nav-inner">
            <div className="nav-logo" onClick={() => setPage("home")}>
              Sweet<span>Hand</span>
            </div>
            <div className="nav-links">
              {[
                ["home", "Главная"],
                ["catalog", "Каталог"],
                ["about", "О нас"],
              ].map(([key, label]) => (
                <button
                  key={key}
                  className={`nav-btn ${page === key ? "active" : ""}`}
                  onClick={() => setPage(key)}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="nav-actions">
              <button
                className="nav-icon-btn"
                onClick={() => {
                  if (!user) { showToast("Войдите, чтобы открыть корзину"); setPage("auth"); }
                  else setPage("cart");
                }}
              >
                🛒 Корзина {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </button>
              {user ? (
                <button className="nav-icon-btn" onClick={() => setPage("account")}>
                  👤 {user.name.split(" ")[0]}
                </button>
              ) : (
                <button className="nav-icon-btn" onClick={() => setPage("auth")}>
                  🔐 Войти
                </button>
              )}
            </div>
          </div>
        </nav>

        {page === "home" && (
          <HomePage
            setPage={setPage}
            addToCart={addToCart}
            addedIds={addedIds}
            user={user}
            feedbackSent={feedbackSent}
            setFeedbackSent={setFeedbackSent}
            showToast={showToast}
          />
        )}
        {page === "catalog" && (
          <CatalogPage
            filtered={filtered}
            category={category}
            setCategory={setCategory}
            addToCart={addToCart}
            addedIds={addedIds}
            user={user}
            setPage={setPage}
          />
        )}
        {page === "about" && <AboutPage setPage={setPage} />}
        {page === "cart" && (
          <CartPage
            cart={cart}
            cartTotal={cartTotal}
            updateQty={updateQty}
            setCart={setCart}
            user={user}
            orders={orders}
            setOrders={setOrders}
            showToast={showToast}
            setPage={setPage}
            orderSuccess={orderSuccess}
            setOrderSuccess={setOrderSuccess}
          />
        )}
        {page === "account" && user && (
          <AccountPage
            user={user}
            orders={orders}
            accountTab={accountTab}
            setAccountTab={setAccountTab}
            setUser={setUser}
            setCart={setCart}
            setPage={setPage}
          />
        )}
        {page === "auth" && (
          <AuthPage setUser={setUser} setPage={setPage} showToast={showToast} />
        )}

        <footer className="footer">
          <div className="footer-logo">Sweet<span>Hand</span></div>
          <p style={{ marginTop: 8 }}>г. Владивосток · ул. Пушкинская, 14 · +7 (423) 200-00-00</p>
          <p style={{ marginTop: 4 }}>© 2026 SweetHand — кондитерские изделия ручной работы</p>
        </footer>

        <div className={`toast ${toast.type} ${toast.show ? "show" : ""}`}>
          {toast.msg}
        </div>
      </div>
    </>
  );
}