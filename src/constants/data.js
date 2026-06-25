export const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000/api";

export const CART_KEY = "sweethand_cart";
export const COOKIE_CONSENT_KEY = "sweethand_cookie_consent";
export const TOKEN_KEY = "sweethand_token";

export const NAV_PAGES = [
  ["home", "Главная"],
  ["catalog", "Каталог"],
  ["about", "О нас"],
];

export const ORDER_STATUS_LABELS = {
  new: "Новый",
  cooking: "Готовится",
  done: "Выполнен",
  canceled: "Отменен",
};

export const PRODUCT_BADGE_LABELS = {
  hit: "Хит",
  new: "Новинка",
};
