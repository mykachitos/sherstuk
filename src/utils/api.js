import { API_BASE_URL } from "../constants/data";
import { resolveProductImage } from "./productImages";

function buildUrl(path, params) {
  const url = new URL(`${API_BASE_URL}${path}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "" && value !== false) {
        url.searchParams.set(key, value);
      }
    });
  }
  return url.toString();
}

async function request(path, { method = "GET", token, body, params } = {}) {
  const response = await fetch(buildUrl(path, params), {
    method,
    headers: {
      ...(token ? { Authorization: `Token ${token}` } : {}),
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json") ? await response.json() : null;

  if (!response.ok) {
    const detail =
      data?.detail ||
      data?.non_field_errors?.[0] ||
      Object.values(data || {}).flat()[0] ||
      "Не удалось выполнить запрос.";
    throw new Error(detail);
  }

  return data;
}

function normalizeProduct(item) {
  return {
    id: item.id,
    slug: item.slug,
    name: item.name,
    description: item.description,
    price: Number(item.price),
    originalPrice: item.original_price ? Number(item.original_price) : null,
    weight: item.weight,
    imageUrl: resolveProductImage(item),
    badge: item.badge,
    badgeLabel: item.badge_label,
    allergens: item.allergens,
    isMonthPick: item.is_month_pick,
    discountPercent: item.discount_percent || 0,
    hasDiscount: item.has_discount,
    isFavorite: item.is_favorite,
    category: item.category,
  };
}

function normalizeOrder(order) {
  return {
    id: order.id,
    number: order.number,
    status: order.status,
    deliveryMethod: order.delivery_method,
    contactName: order.contact_name,
    phone: order.phone,
    address: order.address,
    comment: order.comment,
    subtotal: Number(order.subtotal),
    deliveryPrice: Number(order.delivery_price),
    total: Number(order.total),
    personalDataConsent: order.personal_data_consent,
    createdAt: order.created_at,
    items: order.items.map(item => ({
      id: item.id,
      productId: item.product,
      name: item.product_name,
      price: Number(item.product_price),
      weight: item.product_weight,
      imageUrl: resolveProductImage(item),
      qty: item.quantity,
    })),
  };
}

export async function fetchCategories() {
  return request("/catalog/categories/");
}

export async function fetchProducts(params) {
  const products = await request("/catalog/products/", { params });
  return products.map(normalizeProduct);
}

export async function registerUser(payload) {
  const data = await request("/auth/register/", { method: "POST", body: payload });
  return {
    token: data.token,
    user: data.user,
  };
}

export async function loginUser(payload) {
  const data = await request("/auth/login/", { method: "POST", body: payload });
  return {
    token: data.token,
    user: data.user,
  };
}

export async function logoutUser(token) {
  return request("/auth/logout/", { method: "POST", token });
}

export async function fetchCurrentUser(token) {
  return request("/auth/me/", { token });
}

export async function updateProfile(token, payload) {
  return request("/auth/me/", { method: "PATCH", token, body: payload });
}

export async function fetchFavorites(token) {
  const favorites = await request("/catalog/favorites/", { token });
  return favorites.map(item => normalizeProduct(item.product));
}

export async function addFavorite(token, productId) {
  const favorite = await request("/catalog/favorites/", {
    method: "POST",
    token,
    body: { product_id: productId },
  });
  return normalizeProduct(favorite.product);
}

export async function removeFavorite(token, productId) {
  return request(`/catalog/favorites/${productId}/`, { method: "DELETE", token });
}

export async function fetchOrders(token) {
  const orders = await request("/orders/", { token });
  return orders.map(normalizeOrder);
}

export async function createOrder(token, payload) {
  const order = await request("/orders/", { method: "POST", token, body: payload });
  return normalizeOrder(order);
}

export async function sendFeedback(payload) {
  return request("/feedback/", { method: "POST", body: payload });
}
