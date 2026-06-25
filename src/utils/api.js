import { API_BASE_URL } from "../constants/data";

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function toCamelCaseKey(key) {
  return key.replace(/_([a-z])/g, (_, char) => char.toUpperCase());
}

function toSnakeCaseKey(key) {
  return key.replace(/[A-Z]/g, char => `_${char.toLowerCase()}`);
}

function mapKeysDeep(value, keyMapper) {
  if (Array.isArray(value)) {
    return value.map(item => mapKeysDeep(item, keyMapper));
  }

  if (!isPlainObject(value)) {
    return value;
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, itemValue]) => [
      keyMapper(key),
      mapKeysDeep(itemValue, keyMapper),
    ])
  );
}

function toCamelCase(value) {
  return mapKeysDeep(value, toCamelCaseKey);
}

function toSnakeCase(value) {
  return mapKeysDeep(value, toSnakeCaseKey);
}

function toNumber(value) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const parsed = Number(value);
  return Number.isNaN(parsed) ? value : parsed;
}

function normalizeProduct(product) {
  if (!product) {
    return product;
  }

  return {
    ...product,
    price: toNumber(product.price),
    originalPrice: toNumber(product.originalPrice),
  };
}

function normalizeFavorite(item) {
  return normalizeProduct(item?.product || item);
}

function normalizeOrderItem(item) {
  return {
    ...item,
    name: item.productName,
    price: toNumber(item.productPrice),
    qty: item.quantity,
    weight: item.productWeight,
    imageUrl: item.productImageUrl,
  };
}

function normalizeOrder(order) {
  if (!order) {
    return order;
  }

  return {
    ...order,
    subtotal: toNumber(order.subtotal),
    deliveryPrice: toNumber(order.deliveryPrice),
    total: toNumber(order.total),
    items: (order.items || []).map(normalizeOrderItem),
  };
}

function normalizeAdminDashboard(dashboard) {
  if (!dashboard) {
    return dashboard;
  }

  return {
    ...dashboard,
    categories: dashboard.categories || [],
    products: (dashboard.products || []).map(normalizeProduct),
    users: dashboard.users || [],
    orders: (dashboard.orders || []).map(normalizeOrder),
    feedback: dashboard.feedback || [],
  };
}

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
    body: body ? JSON.stringify(toSnakeCase(body)) : undefined,
  });

  const contentType = response.headers.get("content-type") || "";
  const rawData = contentType.includes("application/json") ? await response.json() : null;
  const data = toCamelCase(rawData);

  if (!response.ok) {
    const detail =
      data?.detail ||
      data?.nonFieldErrors?.[0] ||
      Object.values(data || {}).flat()[0] ||
      "Не удалось выполнить запрос.";

    throw new Error(detail);
  }

  return data;
}

export function fetchCategories() {
  return request("/catalog/categories/").then(data => data.map(category => category));
}

export function fetchProducts(params) {
  return request("/catalog/products/", { params }).then(data => data.map(normalizeProduct));
}

export function registerUser(payload) {
  return request("/auth/register/", { method: "POST", body: payload });
}

export function loginUser(payload) {
  return request("/auth/login/", { method: "POST", body: payload });
}

export function logoutUser(token) {
  return request("/auth/logout/", { method: "POST", token });
}

export function fetchCurrentUser(token) {
  return request("/auth/me/", { token });
}

export function updateProfile(token, payload) {
  return request("/auth/me/", { method: "PATCH", token, body: payload });
}

export function fetchFavorites(token) {
  return request("/catalog/favorites/", { token }).then(data => data.map(normalizeFavorite));
}

export function addFavorite(token, productId) {
  return request("/catalog/favorites/", {
    method: "POST",
    token,
    body: { productId },
  }).then(normalizeFavorite);
}

export function removeFavorite(token, productId) {
  return request(`/catalog/favorites/${productId}/`, {
    method: "DELETE",
    token,
  });
}

export function fetchOrders(token) {
  return request("/orders/", { token }).then(data => data.map(normalizeOrder));
}

export function createOrder(token, payload) {
  return request("/orders/", {
    method: "POST",
    token,
    body: payload,
  }).then(normalizeOrder);
}

export function sendFeedback(payload) {
  return request("/feedback/", {
    method: "POST",
    body: payload,
  });
}

export function fetchAdminDashboard(token) {
  return request("/admin/dashboard/", { token }).then(normalizeAdminDashboard);
}

export function saveAdminProduct(token, payload) {
  return request("/admin/products/", {
    method: "POST",
    token,
    body: payload,
  }).then(normalizeProduct);
}

export function deleteAdminProduct(token, productId) {
  return request(`/admin/products/${productId}/`, {
    method: "DELETE",
    token,
  });
}

export function saveAdminUser(token, payload) {
  return request(`/admin/users/${payload.id}/`, {
    method: "PUT",
    token,
    body: payload,
  });
}

export function deleteAdminUser(token, userId) {
  return request(`/admin/users/${userId}/`, {
    method: "DELETE",
    token,
  });
}

export function updateAdminOrderStatus(token, userId, orderId, status) {
  return request(`/admin/orders/${userId}/${orderId}/`, {
    method: "PATCH",
    token,
    body: { status },
  }).then(normalizeOrder);
}
