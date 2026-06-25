const DEFAULT_PRODUCT_IMAGE =
  "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=900&auto=format&fit=crop";

const CATEGORY_IMAGE_MAP = {
  cakes:
    "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=900&auto=format&fit=crop",
  pastries:
    "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=900&auto=format&fit=crop",
  candies:
    "https://images.unsplash.com/photo-1548907040-4baa42d10919?w=900&auto=format&fit=crop",
  cookies:
    "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=900&auto=format&fit=crop",
};

const PRODUCT_IMAGE_MAP = {
  "malinovyj-son":
    "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=900&auto=format&fit=crop",
  "tri-shokolada":
    "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=900&auto=format&fit=crop",
  "chizkejk-nyu-jork":
    "https://images.unsplash.com/photo-1567171466295-4afa63d45416?w=900&auto=format&fit=crop",
  "fistashka-i-klubnika":
    "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=900&auto=format&fit=crop",
  "makarons-assorti":
    "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=900&auto=format&fit=crop",
  "eklery-shokoladnye":
    "https://images.unsplash.com/photo-1612203985729-70726954388c?w=900&auto=format&fit=crop",
  pavlova:
    "https://images.unsplash.com/photo-1488477304112-4944851de03d?w=900&auto=format&fit=crop",
  "limonnyj-tart":
    "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=900&auto=format&fit=crop",
  "tryufeli-ruchnoj-raboty":
    "https://images.unsplash.com/photo-1548907040-4baa42d10919?w=900&auto=format&fit=crop",
  "klubnika-v-shokolade":
    "https://images.unsplash.com/photo-1572383672419-ab35444a6934?w=900&auto=format&fit=crop",
  "konfety-praline":
    "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=900&auto=format&fit=crop",
  "rafaello-domashnie":
    "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=900&auto=format&fit=crop",
  "imbirnoe-pechene":
    "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=900&auto=format&fit=crop",
  "pechene-s-shokoladom":
    "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=900&auto=format&fit=crop",
  "ovsyanoe-s-klyukvoj":
    "https://images.unsplash.com/photo-1490567674331-72de84e93f3f?w=900&auto=format&fit=crop",
  "merengi-cvetnye":
    "https://images.unsplash.com/photo-1558326567-98ae2405596b?w=900&auto=format&fit=crop",
};

const CATEGORY_NAME_TO_SLUG = {
  торты: "cakes",
  пирожные: "pastries",
  конфеты: "candies",
  печенье: "cookies",
};

const PRODUCT_NAME_TO_SLUG = {
  "малиновый сон": "malinovyj-son",
  "три шоколада": "tri-shokolada",
  "чизкейк нью-йорк": "chizkejk-nyu-jork",
  "фисташка и клубника": "fistashka-i-klubnika",
  "макаронс ассорти": "makarons-assorti",
  "эклеры шоколадные": "eklery-shokoladnye",
  павлова: "pavlova",
  "лимонный тарт": "limonnyj-tart",
  "трюфели ручной работы": "tryufeli-ruchnoj-raboty",
  "клубника в шоколаде": "klubnika-v-shokolade",
  "конфеты пралине": "konfety-praline",
  "рафаэлло домашние": "rafaello-domashnie",
  "имбирное печенье": "imbirnoe-pechene",
  "печенье с шоколадом": "pechene-s-shokoladom",
  "овсяное с клюквой": "ovsyanoe-s-klyukvoj",
  "меренги цветные": "merengi-cvetnye",
};

function normalizeValue(value) {
  return String(value || "").trim().toLowerCase();
}

function getCategorySlug(category) {
  if (!category) {
    return "";
  }

  if (typeof category === "string") {
    return category;
  }

  return category.slug || category.name || "";
}

export function resolveProductImage(item) {
  const rawProductSlug =
    normalizeValue(item?.slug || item?.product_slug) ||
    normalizeValue(item?.name || item?.product_name);
  const rawCategorySlug = normalizeValue(getCategorySlug(item?.category));
  const productSlug = PRODUCT_IMAGE_MAP[rawProductSlug]
    ? rawProductSlug
    : PRODUCT_NAME_TO_SLUG[rawProductSlug] || "";
  const categorySlug = CATEGORY_IMAGE_MAP[rawCategorySlug]
    ? rawCategorySlug
    : CATEGORY_NAME_TO_SLUG[rawCategorySlug] || "";
  const apiImage = item?.image_url || item?.imageUrl || item?.product_image_url || "";

  return (
    PRODUCT_IMAGE_MAP[productSlug] ||
    CATEGORY_IMAGE_MAP[categorySlug] ||
    apiImage ||
    DEFAULT_PRODUCT_IMAGE
  );
}

export { DEFAULT_PRODUCT_IMAGE };
