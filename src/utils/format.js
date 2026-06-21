export function formatMoney(value) {
  return `${new Intl.NumberFormat("ru-RU").format(Math.round(Number(value) || 0))} ₽`;
}

export function formatDate(value) {
  if (!value) {
    return "—";
  }
  return new Date(value).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
