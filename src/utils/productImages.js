const DEFAULT_PRODUCT_IMAGE =
  "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=900&auto=format&fit=crop";

const CATEGORY_IMAGE_MAP = {
  "торты":
    "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=900&auto=format&fit=crop",
  "пирожные":
    "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=900&auto=format&fit=crop",
  "конфеты":
    "https://images.unsplash.com/photo-1548907040-4baa42d10919?w=900&auto=format&fit=crop",
  "печенье":
    "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=900&auto=format&fit=crop",
};

const PRODUCT_IMAGE_MAP = {
  "малиновый сон":
    "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=900&auto=format&fit=crop",
  "три шоколада":
    "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=900&auto=format&fit=crop",
  "чизкейк нью-йорк":
    "https://images.unsplash.com/photo-1567171466295-4afa63d45416?w=900&auto=format&fit=crop",
  "красный бархат":
    "https://images.unsplash.com/photo-1586788680434-30d324ee2991?w=900&auto=format&fit=crop",
  "медовик классический":
    "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=900&auto=format&fit=crop",
  "фисташка и клубника":
    "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=900&auto=format&fit=crop",
  "макаронс ассорти":
    "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=900&auto=format&fit=crop",
  "эклеры шоколадные":
    "https://images.unsplash.com/photo-1612203985729-70726954388c?w=900&auto=format&fit=crop",
  "павлова":
    "https://images.unsplash.com/photo-1488477304112-4944851de03d?w=900&auto=format&fit=crop",
  "лимонный тарт":
    "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=900&auto=format&fit=crop",
  "профитроли ванильные":
    "https://images.unsplash.com/photo-1623246123320-0d6636755796?w=900&auto=format&fit=crop",
  "капкейки ванильные":
    "https://images.unsplash.com/photo-1426869981800-95ebf51ce900?w=900&auto=format&fit=crop",
  "трюфели ручной работы":
    "https://images.unsplash.com/photo-1548907040-4baa42d10919?w=900&auto=format&fit=crop",
  "клубника в шоколаде":
    "https://images.unsplash.com/photo-1572383672419-ab35444a6934?w=900&auto=format&fit=crop",
  "конфеты пралине":
    "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=900&auto=format&fit=crop",
  "шоколадные медальоны":
    "https://images.unsplash.com/photo-1623161122168-9b5c5b1b6e34?w=900&auto=format&fit=crop",
  "рафаэлло домашние":
    "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=900&auto=format&fit=crop",
  "имбирное печенье":
    "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=900&auto=format&fit=crop",
  "печенье с шоколадом":
    "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=900&auto=format&fit=crop",
  "овсяное с клюквой":
    "https://images.unsplash.com/photo-1490567674331-72de84e93f3f?w=900&auto=format&fit=crop",
  "сабле ванильное":
    "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=900&auto=format&fit=crop",
  "меренги цветные":
    "https://images.unsplash.com/photo-1558326567-98ae2405596b?w=900&auto=format&fit=crop",
};

function normalizeValue(value) {
  return String(value || "").trim().toLowerCase();
}

function getCategoryName(category) {
  if (!category) {
    return "";
  }

  if (typeof category === "string") {
    return category;
  }

  return category.name || category.slug || "";
}

export function resolveProductImage(item) {
  const productName = normalizeValue(item?.name || item?.product_name);
  const categoryName = normalizeValue(getCategoryName(item?.category));
  const apiImage = item?.image_url || item?.imageUrl || item?.product_image_url || "";

  return (
    PRODUCT_IMAGE_MAP[productName] ||
    CATEGORY_IMAGE_MAP[categoryName] ||
    apiImage ||
    DEFAULT_PRODUCT_IMAGE
  );
}

export { DEFAULT_PRODUCT_IMAGE };
