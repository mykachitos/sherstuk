import { useState, useEffect, useRef } from "react";

const FONT = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');`;

const PRODUCTS = [
  { id: 1, name: "Торт «Малиновый сон»", category: "Торты", price: 2800, weight: "1.2 кг", img: "🍰", desc: "Нежный бисквит с малиновым конфитюром и сливочным кремом. Украшен свежими ягодами.", badge: "Хит", allergens: "Глютен, молоко, яйца" },
  { id: 2, name: "Медовик классический", category: "Торты", price: 2200, weight: "1.0 кг", img: "🍯", desc: "Традиционный медовик с заварным кремом. Пропитан натуральным цветочным мёдом.", badge: null, allergens: "Глютен, молоко, яйца" },
  { id: 3, name: "Торт «Три шоколада»", category: "Торты", price: 3400, weight: "1.4 кг", img: "🍫", desc: "Три слоя мусса — тёмный, молочный и белый шоколад. Без муки.", badge: "Новинка", allergens: "Молоко, яйца" },
  { id: 4, name: "Макаронс ассорти", category: "Пирожные", price: 980, weight: "12 шт", img: "🎨", desc: "Французские макаронс с начинками: малина, фисташка, карамель, шоколад.", badge: "Хит", allergens: "Глютен, миндаль, яйца" },
  { id: 5, name: "Эклеры шоколадные", category: "Пирожные", price: 650, weight: "6 шт", img: "✨", desc: "Классические эклеры с заварным кремом и шоколадной глазурью.", badge: null, allergens: "Глютен, молоко, яйца" },
  { id: 6, name: "Пирожное «Картошка»", category: "Пирожные", price: 480, weight: "6 шт", img: "🥔", desc: "Домашнее пирожное картошка с какао и сгущённым молоком. По бабушкиному рецепту.", badge: null, allergens: "Глютен, молоко" },
  { id: 7, name: "Трюфели ручной работы", category: "Конфеты", price: 890, weight: "200 г", img: "⚫", desc: "Бельгийский шоколад 72%, сливки, ваниль. Каждая конфета — произведение искусства.", badge: "Хит", allergens: "Молоко" },
  { id: 8, name: "Шоколадные медальоны", category: "Конфеты", price: 760, weight: "150 г", img: "🔮", desc: "Белый и тёмный шоколад с сублимированными ягодами и орехами.", badge: null, allergens: "Молоко, орехи" },
  { id: 9, name: "Имбирное печенье", category: "Печенье", price: 420, weight: "300 г", img: "🌟", desc: "Ароматное имбирное печенье с расписной глазурью. Идеально для подарка.", badge: null, allergens: "Глютен, яйца" },
  { id: 10, name: "Овсяное печенье", category: "Печенье", price: 380, weight: "250 г", img: "🌾", desc: "Домашнее овсяное печенье с изюмом и корицей. Без лишних добавок.", badge: null, allergens: "Глютен, молоко" },
  { id: 11, name: "Торт «Птичье молоко»", category: "Торты", price: 2600, weight: "1.1 кг", img: "🕊️", desc: "Воздушное суфле с шоколадной глазурью. Нежнее нежного.", badge: null, allergens: "Молоко, яйца, желатин" },
  { id: 12, name: "Марципановые фигурки", category: "Конфеты", price: 1100, weight: "180 г", img: "🐝", desc: "Фигурки из миндального марципана. Ручная роспись, съедобные краски.", badge: "Новинка", allergens: "Миндаль" },
];

const CATEGORIES = ["Все", "Торты", "Пирожные", "Конфеты", "Печенье"];

const ORDERS_KEY = "sweethand_orders";
const USER_KEY = "sweethand_user";
const CART_KEY = "sweethand_cart";

const USERS_DB_KEY = "sweethand_users_db";

function getFromStorage(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
}
function setToStorage(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}

const css = `
  ${FONT}
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; background: #faf7f2; color: #2d2217; }
  
  :root {
    --cream: #faf7f2;
    --warm: #f5efe3;
    --brown: #7a4f2e;
    --brown-light: #c8956a;
    --brown-dark: #3d2010;
    --rose: #d4847a;
    --rose-light: #f0c4be;
    --gold: #c9a84c;
    --text: #2d2217;
    --text-muted: #8a6a50;
    --border: rgba(122,79,46,0.15);
    --white: #ffffff;
    --shadow: 0 2px 20px rgba(61,32,16,0.08);
    --shadow-lg: 0 8px 40px rgba(61,32,16,0.12);
  }

  .app { min-height: 100vh; display: flex; flex-direction: column; }

  /* NAV */
  .nav {
    background: var(--white);
    border-bottom: 1px solid var(--border);
    position: sticky; top: 0; z-index: 100;
    box-shadow: var(--shadow);
  }
  .nav-inner {
    max-width: 1200px; margin: 0 auto;
    display: flex; align-items: center; gap: 24px;
    padding: 14px 24px;
  }
  .nav-logo {
    font-family: 'Playfair Display', serif;
    font-size: 22px; font-weight: 700;
    color: var(--brown-dark);
    letter-spacing: -0.5px;
    cursor: pointer;
    flex: 0 0 auto;
  }
  .nav-logo span { color: var(--rose); }
  .nav-links { display: flex; gap: 4px; flex: 1; }
  .nav-btn {
    background: none; border: none; cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px; color: var(--text-muted);
    padding: 8px 14px; border-radius: 8px;
    transition: all 0.2s;
    font-weight: 400;
  }
  .nav-btn:hover { background: var(--warm); color: var(--brown); }
  .nav-btn.active { background: var(--warm); color: var(--brown-dark); font-weight: 500; }
  .nav-actions { display: flex; gap: 8px; align-items: center; margin-left: auto; }
  .nav-icon-btn {
    background: none; border: 1px solid var(--border);
    border-radius: 10px; padding: 8px 14px;
    cursor: pointer; font-size: 14px;
    display: flex; align-items: center; gap: 6px;
    color: var(--text-muted); transition: all 0.2s;
    font-family: 'DM Sans', sans-serif;
    font-weight: 400;
  }
  .nav-icon-btn:hover { border-color: var(--brown-light); color: var(--brown); background: var(--warm); }
  .cart-badge {
    background: var(--rose); color: white;
    border-radius: 50%; width: 18px; height: 18px;
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: 500;
  }

  /* HERO */
  .hero {
    background: linear-gradient(135deg, #3d2010 0%, #7a4f2e 50%, #c8956a 100%);
    color: white; padding: 80px 24px;
    text-align: center; position: relative; overflow: hidden;
  }
  .hero::before {
    content: '';
    position: absolute; inset: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='20'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }
  .hero-content { position: relative; max-width: 700px; margin: 0 auto; }
  .hero-eyebrow {
    font-size: 12px; letter-spacing: 3px; text-transform: uppercase;
    color: var(--rose-light); margin-bottom: 16px; font-weight: 500;
  }
  .hero h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(32px, 5vw, 56px);
    line-height: 1.15; margin-bottom: 20px;
    font-weight: 700;
  }
  .hero h1 em { font-style: italic; color: var(--rose-light); }
  .hero p { font-size: 17px; opacity: 0.85; margin-bottom: 36px; line-height: 1.6; font-weight: 300; }
  .hero-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
  .btn-primary {
    background: white; color: var(--brown-dark);
    border: none; border-radius: 12px;
    padding: 14px 28px; font-size: 15px;
    cursor: pointer; font-weight: 500;
    transition: all 0.2s;
    font-family: 'DM Sans', sans-serif;
    box-shadow: 0 4px 16px rgba(0,0,0,0.15);
  }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 6px 24px rgba(0,0,0,0.2); }
  .btn-outline-white {
    background: transparent; color: white;
    border: 1px solid rgba(255,255,255,0.4); border-radius: 12px;
    padding: 14px 28px; font-size: 15px;
    cursor: pointer; font-weight: 400;
    transition: all 0.2s;
    font-family: 'DM Sans', sans-serif;
  }
  .btn-outline-white:hover { background: rgba(255,255,255,0.1); }
  .hero-stats {
    display: flex; gap: 40px; justify-content: center;
    margin-top: 48px; padding-top: 40px;
    border-top: 1px solid rgba(255,255,255,0.15);
  }
  .hero-stat { text-align: center; }
  .hero-stat-num { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 700; }
  .hero-stat-label { font-size: 12px; opacity: 0.7; margin-top: 4px; font-weight: 300; }

  /* MAIN LAYOUT */
  .page { max-width: 1200px; margin: 0 auto; padding: 48px 24px; flex: 1; }

  /* CATALOG */
  .section-header { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 32px; }
  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: 30px; font-weight: 600; color: var(--brown-dark);
  }
  .filter-bar {
    display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 32px;
  }
  .filter-chip {
    background: var(--white); border: 1px solid var(--border);
    border-radius: 20px; padding: 8px 18px;
    font-size: 13px; cursor: pointer; font-weight: 400;
    color: var(--text-muted); transition: all 0.2s;
    font-family: 'DM Sans', sans-serif;
  }
  .filter-chip:hover { border-color: var(--brown-light); color: var(--brown); }
  .filter-chip.active {
    background: var(--brown); color: white; border-color: var(--brown);
  }

  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 24px;
  }

  .product-card {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
    transition: all 0.25s;
    cursor: default;
    display: flex; flex-direction: column;
  }
  .product-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
    border-color: var(--brown-light);
  }
  .product-img {
    background: var(--warm);
    height: 180px; display: flex;
    align-items: center; justify-content: center;
    font-size: 64px; position: relative;
  }
  .product-badge {
    position: absolute; top: 12px; right: 12px;
    background: var(--rose); color: white;
    font-size: 11px; padding: 4px 10px; border-radius: 20px;
    font-weight: 500;
  }
  .product-badge.new { background: var(--gold); }
  .product-body { padding: 16px 18px; flex: 1; display: flex; flex-direction: column; }
  .product-category {
    font-size: 11px; color: var(--text-muted);
    text-transform: uppercase; letter-spacing: 1.5px;
    margin-bottom: 6px; font-weight: 500;
  }
  .product-name {
    font-family: 'Playfair Display', serif;
    font-size: 17px; font-weight: 600; color: var(--brown-dark);
    margin-bottom: 8px; line-height: 1.3;
  }
  .product-desc {
    font-size: 13px; color: var(--text-muted);
    line-height: 1.5; margin-bottom: 12px; flex: 1;
  }
  .product-weight { font-size: 12px; color: var(--text-muted); margin-bottom: 14px; }
  .product-footer {
    display: flex; align-items: center; justify-content: space-between;
    margin-top: auto;
  }
  .product-price {
    font-family: 'Playfair Display', serif;
    font-size: 20px; font-weight: 700; color: var(--brown);
  }
  .product-price span { font-size: 13px; font-weight: 400; color: var(--text-muted); font-family: 'DM Sans', sans-serif; }
  .add-cart-btn {
    background: var(--brown); color: white;
    border: none; border-radius: 10px;
    padding: 9px 18px; font-size: 13px;
    cursor: pointer; font-weight: 500;
    transition: all 0.2s; font-family: 'DM Sans', sans-serif;
    display: flex; align-items: center; gap: 6px;
  }
  .add-cart-btn:hover { background: var(--brown-dark); transform: translateY(-1px); }
  .add-cart-btn.added { background: #6a8a6a; }

  /* CART PAGE */
  .cart-layout { display: grid; grid-template-columns: 1fr 360px; gap: 32px; align-items: start; }
  @media (max-width: 900px) { .cart-layout { grid-template-columns: 1fr; } }
  .cart-items { display: flex; flex-direction: column; gap: 12px; }
  .cart-item {
    background: var(--white); border: 1px solid var(--border);
    border-radius: 14px; padding: 16px 18px;
    display: flex; align-items: center; gap: 16px;
  }
  .cart-item-emoji { font-size: 40px; width: 60px; height: 60px; background: var(--warm); border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .cart-item-info { flex: 1; }
  .cart-item-name { font-size: 15px; font-weight: 500; color: var(--brown-dark); margin-bottom: 4px; }
  .cart-item-sub { font-size: 13px; color: var(--text-muted); }
  .qty-ctrl { display: flex; align-items: center; gap: 10px; }
  .qty-btn {
    width: 30px; height: 30px; border-radius: 8px;
    border: 1px solid var(--border); background: var(--white);
    cursor: pointer; font-size: 16px; display: flex; align-items: center; justify-content: center;
    transition: all 0.2s; color: var(--brown);
  }
  .qty-btn:hover { background: var(--warm); border-color: var(--brown-light); }
  .qty-num { font-size: 15px; font-weight: 500; min-width: 20px; text-align: center; }
  .cart-item-price { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; color: var(--brown); min-width: 90px; text-align: right; }
  .remove-btn { background: none; border: none; cursor: pointer; color: var(--text-muted); padding: 4px; border-radius: 6px; transition: all 0.2s; font-size: 16px; }
  .remove-btn:hover { color: #c0392b; background: #fdf0ee; }

  .cart-summary {
    background: var(--white); border: 1px solid var(--border);
    border-radius: 16px; padding: 24px; position: sticky; top: 80px;
  }
  .cart-summary h3 { font-family: 'Playfair Display', serif; font-size: 20px; margin-bottom: 20px; color: var(--brown-dark); }
  .summary-row { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 14px; color: var(--text-muted); }
  .summary-row.total { font-size: 18px; font-weight: 600; color: var(--brown-dark); border-top: 1px solid var(--border); padding-top: 14px; margin-top: 14px; }
  .checkout-btn {
    width: 100%; background: var(--brown); color: white;
    border: none; border-radius: 12px; padding: 14px;
    font-size: 15px; font-weight: 500; cursor: pointer;
    transition: all 0.2s; margin-top: 16px;
    font-family: 'DM Sans', sans-serif;
  }
  .checkout-btn:hover { background: var(--brown-dark); }
  .checkout-btn:disabled { opacity: 0.5; cursor: default; }

  /* ORDER FORM */
  .order-form {
    background: var(--white); border: 1px solid var(--border);
    border-radius: 16px; padding: 28px;
    display: flex; flex-direction: column; gap: 16px;
    margin-top: 20px;
  }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .form-group { display: flex; flex-direction: column; gap: 6px; }
  .form-group label { font-size: 13px; font-weight: 500; color: var(--text-muted); }
  .form-group input, .form-group select, .form-group textarea {
    border: 1px solid var(--border); border-radius: 10px;
    padding: 10px 14px; font-size: 14px; color: var(--text);
    background: var(--white); font-family: 'DM Sans', sans-serif;
    transition: border 0.2s; outline: none;
    width: 100%;
  }
  .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
    border-color: var(--brown-light);
    box-shadow: 0 0 0 3px rgba(200,149,106,0.12);
  }
  .form-group textarea { resize: vertical; min-height: 80px; }

  /* ACCOUNT PAGE */
  .account-layout { display: grid; grid-template-columns: 240px 1fr; gap: 32px; align-items: start; }
  @media (max-width: 800px) { .account-layout { grid-template-columns: 1fr; } }
  .account-sidebar {
    background: var(--white); border: 1px solid var(--border);
    border-radius: 16px; padding: 24px; position: sticky; top: 80px;
  }
  .account-avatar {
    width: 70px; height: 70px; background: var(--warm);
    border-radius: 50%; display: flex; align-items: center; justify-content: center;
    font-family: 'Playfair Display', serif; font-size: 26px; font-weight: 600;
    color: var(--brown); margin: 0 auto 16px;
  }
  .account-name { text-align: center; font-weight: 600; font-size: 16px; color: var(--brown-dark); margin-bottom: 4px; }
  .account-email { text-align: center; font-size: 13px; color: var(--text-muted); margin-bottom: 20px; }
  .sidebar-menu { display: flex; flex-direction: column; gap: 4px; }
  .sidebar-item {
    background: none; border: none; cursor: pointer;
    text-align: left; padding: 10px 14px; border-radius: 10px;
    font-size: 14px; color: var(--text-muted); transition: all 0.2s;
    font-family: 'DM Sans', sans-serif;
  }
  .sidebar-item:hover { background: var(--warm); color: var(--brown); }
  .sidebar-item.active { background: var(--warm); color: var(--brown-dark); font-weight: 500; }
  .logout-btn {
    width: 100%; margin-top: 16px; padding: 10px;
    background: none; border: 1px solid var(--border);
    border-radius: 10px; cursor: pointer; font-size: 14px;
    color: var(--text-muted); transition: all 0.2s;
    font-family: 'DM Sans', sans-serif;
  }
  .logout-btn:hover { border-color: #c0392b; color: #c0392b; background: #fdf0ee; }

  .order-card {
    background: var(--white); border: 1px solid var(--border);
    border-radius: 14px; padding: 20px 22px; margin-bottom: 14px;
  }
  .order-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
  .order-id { font-weight: 600; font-size: 15px; color: var(--brown-dark); }
  .order-date { font-size: 13px; color: var(--text-muted); }
  .order-status {
    font-size: 12px; padding: 4px 12px; border-radius: 20px; font-weight: 500;
  }
  .status-new { background: #fff3cd; color: #856404; }
  .status-cooking { background: #d1ecf1; color: #0c5460; }
  .status-done { background: #d4edda; color: #155724; }
  .order-items-list { font-size: 13px; color: var(--text-muted); line-height: 1.8; }
  .order-total { font-weight: 600; font-size: 15px; color: var(--brown); margin-top: 10px; }

  /* AUTH PAGE */
  .auth-container {
    max-width: 420px; margin: 60px auto; padding: 0 24px;
  }
  .auth-card {
    background: var(--white); border: 1px solid var(--border);
    border-radius: 20px; padding: 36px; box-shadow: var(--shadow);
  }
  .auth-logo {
    font-family: 'Playfair Display', serif;
    font-size: 24px; font-weight: 700; color: var(--brown-dark);
    text-align: center; margin-bottom: 6px;
  }
  .auth-logo span { color: var(--rose); }
  .auth-subtitle { text-align: center; font-size: 14px; color: var(--text-muted); margin-bottom: 28px; }
  .auth-tabs { display: flex; background: var(--warm); border-radius: 10px; padding: 4px; margin-bottom: 24px; }
  .auth-tab {
    flex: 1; padding: 9px; border: none; background: none;
    border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 400;
    color: var(--text-muted); transition: all 0.2s; font-family: 'DM Sans', sans-serif;
  }
  .auth-tab.active { background: white; color: var(--brown-dark); font-weight: 500; box-shadow: 0 1px 6px rgba(0,0,0,0.06); }
  .auth-form { display: flex; flex-direction: column; gap: 14px; }
  .auth-submit {
    width: 100%; padding: 13px; background: var(--brown); color: white;
    border: none; border-radius: 12px; font-size: 15px; font-weight: 500;
    cursor: pointer; transition: all 0.2s; margin-top: 4px;
    font-family: 'DM Sans', sans-serif;
  }
  .auth-submit:hover { background: var(--brown-dark); }
  .auth-err { color: #c0392b; font-size: 13px; text-align: center; }
  .auth-ok { color: #27ae60; font-size: 13px; text-align: center; }

  /* TOAST */
  .toast {
    position: fixed; bottom: 24px; right: 24px;
    background: var(--brown-dark); color: white;
    padding: 12px 20px; border-radius: 12px;
    font-size: 14px; font-weight: 500;
    z-index: 9999; opacity: 0;
    transform: translateY(10px);
    transition: all 0.3s; pointer-events: none;
  }
  .toast.show { opacity: 1; transform: translateY(0); }
  .toast.success { background: #27ae60; }

  /* EMPTY */
  .empty-state {
    text-align: center; padding: 60px 20px; color: var(--text-muted);
  }
  .empty-state-icon { font-size: 56px; margin-bottom: 16px; }
  .empty-state h3 { font-family: 'Playfair Display', serif; font-size: 22px; color: var(--brown-dark); margin-bottom: 8px; }
  .empty-state p { font-size: 15px; margin-bottom: 24px; }

  /* FOOTER */
  .footer {
    background: var(--brown-dark); color: rgba(255,255,255,0.7);
    padding: 40px 24px; text-align: center; font-size: 13px;
  }
  .footer-logo { font-family: 'Playfair Display', serif; font-size: 20px; color: white; margin-bottom: 8px; }
  .footer-logo span { color: var(--rose-light); }

  /* FEEDBACK FORM */
  .feedback-section {
    background: var(--warm); border-radius: 20px; padding: 40px;
    text-align: center; margin-top: 40px;
  }
  .feedback-section h2 { font-family: 'Playfair Display', serif; font-size: 26px; color: var(--brown-dark); margin-bottom: 8px; }
  .feedback-section p { color: var(--text-muted); margin-bottom: 24px; font-size: 15px; }
  .feedback-form { max-width: 500px; margin: 0 auto; display: flex; flex-direction: column; gap: 12px; }
  .feedback-form input, .feedback-form textarea {
    border: 1px solid var(--border); border-radius: 10px;
    padding: 11px 14px; font-size: 14px; background: white;
    font-family: 'DM Sans', sans-serif; outline: none; color: var(--text);
    transition: border 0.2s;
  }
  .feedback-form input:focus, .feedback-form textarea:focus { border-color: var(--brown-light); }
  .feedback-form textarea { min-height: 90px; resize: vertical; }
  .feedback-btn {
    background: var(--brown); color: white; border: none;
    border-radius: 12px; padding: 13px; font-size: 15px;
    cursor: pointer; font-weight: 500; transition: all 0.2s;
    font-family: 'DM Sans', sans-serif;
  }
  .feedback-btn:hover { background: var(--brown-dark); }

  .page-title { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 600; color: var(--brown-dark); margin-bottom: 28px; }

  .lock-notice {
    background: var(--warm); border: 1px dashed var(--brown-light);
    border-radius: 14px; padding: 20px 24px; margin-bottom: 24px;
    display: flex; align-items: center; gap: 12px; font-size: 14px; color: var(--text-muted);
  }
  .lock-icon { font-size: 22px; }
  .lock-notice a { color: var(--brown); text-decoration: none; font-weight: 500; cursor: pointer; }
  .lock-notice a:hover { text-decoration: underline; }

  .success-screen { text-align: center; padding: 60px 20px; }
  .success-screen .big-icon { font-size: 70px; margin-bottom: 20px; }
  .success-screen h2 { font-family: 'Playfair Display', serif; font-size: 28px; color: var(--brown-dark); margin-bottom: 12px; }
  .success-screen p { font-size: 16px; color: var(--text-muted); margin-bottom: 28px; }
`;

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
    if (!user) { showToast("Войдите, чтобы добавить в корзину"); setPage("auth"); return; }
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
      const updated = prev.map(i => i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i);
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
              {["home", "catalog"].map(p => (
                <button key={p} className={`nav-btn ${page === p ? "active" : ""}`} onClick={() => setPage(p)}>
                  {p === "home" ? "Главная" : "Каталог"}
                </button>
              ))}
            </div>
            <div className="nav-actions">
              <button className="nav-icon-btn" onClick={() => { if (!user) { showToast("Войдите, чтобы открыть корзину"); setPage("auth"); } else setPage("cart"); }}>
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

        {page === "home" && <HomePage setPage={setPage} addToCart={addToCart} addedIds={addedIds} user={user} feedbackSent={feedbackSent} setFeedbackSent={setFeedbackSent} showToast={showToast} />}
        {page === "catalog" && <CatalogPage filtered={filtered} category={category} setCategory={setCategory} addToCart={addToCart} addedIds={addedIds} user={user} setPage={setPage} />}
        {page === "cart" && <CartPage cart={cart} cartTotal={cartTotal} updateQty={updateQty} setCart={setCart} user={user} orders={orders} setOrders={setOrders} showToast={showToast} setPage={setPage} orderSuccess={orderSuccess} setOrderSuccess={setOrderSuccess} />}
        {page === "account" && user && <AccountPage user={user} orders={orders} accountTab={accountTab} setAccountTab={setAccountTab} setUser={setUser} setCart={setCart} setPage={setPage} />}
        {page === "auth" && <AuthPage setUser={setUser} setPage={setPage} showToast={showToast} />}

        <footer className="footer">
          <div className="footer-logo">Sweet<span>Hand</span></div>
          <p style={{ marginTop: 8 }}>г. Владивосток · ул. Пушкинская, 14 · +7 (423) 200-00-00</p>
          <p style={{ marginTop: 4 }}>© 2026 SweetHand — кондитерские изделия ручной работы</p>
        </footer>

        <div className={`toast ${toast.type} ${toast.show ? "show" : ""}`}>{toast.msg}</div>
      </div>
    </>
  );
}

function HomePage({ setPage, addToCart, addedIds, user, feedbackSent, setFeedbackSent, showToast }) {
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
          <button className="nav-btn" onClick={() => setPage("catalog")} style={{ fontSize: 14, color: "#7a4f2e" }}>Весь каталог →</button>
        </div>

        {!user && (
          <div className="lock-notice">
            <span className="lock-icon">🔒</span>
            <div>Чтобы добавлять товары в корзину и оформлять заказы, пожалуйста, <a onClick={() => setPage("auth")}>войдите или зарегистрируйтесь</a>.</div>
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
            <div style={{ color: "#27ae60", fontSize: 16, fontWeight: 500 }}>✅ Ваше сообщение получено! Скоро свяжемся.</div>
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

function ProductCard({ product, onAdd, added }) {
  return (
    <div className="product-card">
      <div className="product-img">
        {product.img}
        {product.badge && <span className={`product-badge ${product.badge === "Новинка" ? "new" : ""}`}>{product.badge}</span>}
      </div>
      <div className="product-body">
        <div className="product-category">{product.category}</div>
        <div className="product-name">{product.name}</div>
        <div className="product-desc">{product.desc}</div>
        <div className="product-weight">⚖️ {product.weight} · Состав: {product.allergens}</div>
        <div className="product-footer">
          <div className="product-price">{product.price.toLocaleString("ru")} <span>₽</span></div>
          <button className={`add-cart-btn ${added ? "added" : ""}`} onClick={() => onAdd(product)}>
            {added ? "✓ Добавлено" : "+ В корзину"}
          </button>
        </div>
      </div>
    </div>
  );
}

function CatalogPage({ filtered, category, setCategory, addToCart, addedIds, user, setPage }) {
  return (
    <div className="page">
      <h1 className="page-title">Каталог</h1>
      {!user && (
        <div className="lock-notice">
          <span className="lock-icon">🔒</span>
          <div>Для оформления заказа необходима <a onClick={() => setPage("auth")}>авторизация</a>. Каталог доступен без входа.</div>
        </div>
      )}
      <div className="filter-bar">
        {CATEGORIES.map(c => (
          <button key={c} className={`filter-chip ${category === c ? "active" : ""}`} onClick={() => setCategory(c)}>{c}</button>
        ))}
      </div>
      <div className="products-grid">
        {filtered.map(p => (
          <ProductCard key={p.id} product={p} onAdd={addToCart} added={!!addedIds[p.id]} />
        ))}
      </div>
    </div>
  );
}

function CartPage({ cart, cartTotal, updateQty, setCart, user, orders, setOrders, showToast, setPage, orderSuccess, setOrderSuccess }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: user?.name || "", phone: "", address: "", delivery: "pickup", comment: "" });

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

  if (orderSuccess) return (
    <div className="page">
      <div className="success-screen">
        <div className="big-icon">🎉</div>
        <h2>Заказ оформлен!</h2>
        <p>Мы уже приступаем к приготовлению. Ожидайте звонка для подтверждения.</p>
        <button className="btn-primary" style={{ background: "#7a4f2e", color: "white", border: "none", borderRadius: 12, padding: "13px 28px", fontSize: 15, cursor: "pointer" }} onClick={() => { setOrderSuccess(false); setPage("account"); }}>Мои заказы</button>
      </div>
    </div>
  );

  if (!cart.length) return (
    <div className="page">
      <h1 className="page-title">Корзина</h1>
      <div className="empty-state">
        <div className="empty-state-icon">🛒</div>
        <h3>Корзина пуста</h3>
        <p>Добавьте что-нибудь вкусное из нашего каталога</p>
        <button className="add-cart-btn" onClick={() => setPage("catalog")}>Перейти в каталог</button>
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
              <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: 20, color: "#3d2010" }}>Оформление заказа</h3>
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

function AccountPage({ user, orders, accountTab, setAccountTab, setUser, setCart, setPage }) {
  const userOrders = orders.filter(o => true);
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
              <button key={k} className={`sidebar-item ${accountTab === k ? "active" : ""}`} onClick={() => setAccountTab(k)}>{l}</button>
            ))}
          </div>
          <button className="logout-btn" onClick={() => { setUser(null); setCart([]); setPage("home"); }}>Выйти из аккаунта</button>
        </div>

        <div>
          {accountTab === "orders" && (
            <div>
              <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 22, color: "#3d2010", marginBottom: 20 }}>История заказов</h2>
              {userOrders.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-state-icon">📦</div>
                  <h3>Заказов пока нет</h3>
                  <p>Сделайте ваш первый заказ!</p>
                  <button className="add-cart-btn" onClick={() => setPage("catalog")}>В каталог</button>
                </div>
              ) : userOrders.map(order => (
                <div className="order-card" key={order.id}>
                  <div className="order-header">
                    <div>
                      <div className="order-id">Заказ {order.id}</div>
                      <div className="order-date">{order.date}</div>
                    </div>
                    <span className={`order-status ${statusClass[order.status]}`}>{statusLabel[order.status]}</span>
                  </div>
                  <div className="order-items-list">
                    {order.items.map(i => <div key={i.id}>{i.img} {i.name} × {i.qty}</div>)}
                  </div>
                  <div className="order-total">Итого: {order.total.toLocaleString("ru")} ₽ · {order.delivery === "delivery" ? "Доставка" : "Самовывоз"}</div>
                </div>
              ))}
            </div>
          )}

          {accountTab === "profile" && (
            <div className="order-card">
              <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 22, color: "#3d2010", marginBottom: 20 }}>Мои данные</h2>
              <div className="form-group" style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 13, color: "#8a6a50", fontWeight: 500 }}>Имя</label>
                <input readOnly value={user.name} style={{ border: "1px solid rgba(122,79,46,0.15)", borderRadius: 10, padding: "10px 14px", fontSize: 14, fontFamily: "DM Sans, sans-serif", width: "100%", color: "#2d2217", background: "#faf7f2" }} />
              </div>
              <div className="form-group">
                <label style={{ fontSize: 13, color: "#8a6a50", fontWeight: 500 }}>Email</label>
                <input readOnly value={user.email} style={{ border: "1px solid rgba(122,79,46,0.15)", borderRadius: 10, padding: "10px 14px", fontSize: 14, fontFamily: "DM Sans, sans-serif", width: "100%", color: "#2d2217", background: "#faf7f2" }} />
              </div>
              <div style={{ marginTop: 16, fontSize: 13, color: "#8a6a50" }}>Зарегистрирован: {user.created}</div>
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

function AuthPage({ setUser, setPage, showToast }) {
  const [tab, setTab] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  const getUsersDb = () => getFromStorage(USERS_DB_KEY, []);
  const saveUsersDb = (users) => setToStorage(USERS_DB_KEY, users);

  const handleLogin = (e) => {
    e.preventDefault();
    setErr("");
    const users = getUsersDb();
    const found = users.find(u => u.email === email && u.pass === pass);
    if (!found) { setErr("Неверный email или пароль"); return; }
    setUser({ name: found.name, email: found.email, created: found.created });
    showToast(`Добро пожаловать, ${found.name}!`, "success");
    setPage("home");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setErr("");
    if (!name || !email || !pass) { setErr("Заполните все поля"); return; }
    if (pass.length < 6) { setErr("Пароль минимум 6 символов"); return; }
    const users = getUsersDb();
    if (users.find(u => u.email === email)) { setErr("Email уже зарегистрирован"); return; }
    const newUser = { name, email, pass, created: new Date().toLocaleDateString("ru") };
    saveUsersDb([...users, newUser]);
    setUser({ name, email, created: newUser.created });
    showToast(`Регистрация успешна! Добро пожаловать, ${name}!`, "success");
    setPage("home");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">Sweet<span>Hand</span></div>
        <div className="auth-subtitle">Кондитерские изделия ручной работы</div>
        <div className="auth-tabs">
          <button className={`auth-tab ${tab === "login" ? "active" : ""}`} onClick={() => { setTab("login"); setErr(""); }}>Войти</button>
          <button className={`auth-tab ${tab === "reg" ? "active" : ""}`} onClick={() => { setTab("reg"); setErr(""); }}>Регистрация</button>
        </div>
        {tab === "login" ? (
          <form className="auth-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required />
            </div>
            <div className="form-group">
              <label>Пароль</label>
              <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="••••••" required />
            </div>
            {err && <div className="auth-err">{err}</div>}
            <button type="submit" className="auth-submit">Войти</button>
            <div style={{ fontSize: 13, textAlign: "center", color: "#8a6a50" }}>Нет аккаунта? <span style={{ color: "#7a4f2e", cursor: "pointer", fontWeight: 500 }} onClick={() => setTab("reg")}>Зарегистрироваться</span></div>
          </form>
        ) : (
          <form className="auth-form" onSubmit={handleRegister}>
            <div className="form-group">
              <label>Имя</label>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Ваше имя" required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required />
            </div>
            <div className="form-group">
              <label>Пароль</label>
              <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="Минимум 6 символов" required />
            </div>
            {err && <div className="auth-err">{err}</div>}
            <button type="submit" className="auth-submit">Создать аккаунт</button>
            <div style={{ fontSize: 13, textAlign: "center", color: "#8a6a50" }}>Уже есть аккаунт? <span style={{ color: "#7a4f2e", cursor: "pointer", fontWeight: 500 }} onClick={() => setTab("login")}>Войти</span></div>
          </form>
        )}
      </div>
    </div>
  );
}
