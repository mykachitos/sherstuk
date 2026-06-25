import catalogSeed from "../data/catalogSeed.json";

const categories = catalogSeed.categories;

const categoryBySlug = Object.fromEntries(categories.map(category => [category.slug, category]));

function product({
  id,
  slug,
  name,
  description,
  price,
  originalPrice,
  weight,
  imageUrl,
  badge = "",
  badgeLabel = "",
  allergens,
  isMonthPick = false,
  categorySlug,
}) {
  const discountPercent =
    originalPrice && originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

  return {
    id,
    slug,
    name,
    description,
    price,
    originalPrice: originalPrice || null,
    weight,
    imageUrl,
    badge,
    badgeLabel,
    allergens,
    isMonthPick,
    discountPercent,
    hasDiscount: discountPercent > 0,
    isFavorite: false,
    category: categoryBySlug[categorySlug],
  };
}

export const LOCAL_CATEGORIES = categories;
export const LOCAL_PRODUCTS = catalogSeed.products.map(product);
