import { DEFAULT_PRODUCT_IMAGE, resolveProductImage } from "./productImages";

test("returns a cookie image for cookie products", () => {
  const image = resolveProductImage({
    name: "Печенье с шоколадом",
    category: { name: "Печенье" },
  });

  expect(image).toContain("1499636136210-6f4ee915583e");
});

test("falls back to the category image when product is unknown", () => {
  const image = resolveProductImage({
    name: "Фирменное печенье",
    category: { name: "Печенье" },
    image_url: "https://example.com/not-cookie.jpg",
  });

  expect(image).toContain("1499636136210-6f4ee915583e");
});

test("uses a default image when neither product nor category are known", () => {
  const image = resolveProductImage({
    name: "Сюрприз дня",
  });

  expect(image).toBe(DEFAULT_PRODUCT_IMAGE);
});
