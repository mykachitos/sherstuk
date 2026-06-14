import { useState } from "react";

export default function ProductCard({ product, onAdd, added }) {
  const [imgError, setImgError] = useState(false);
  const isUrl = typeof product.img === "string" && product.img.startsWith("http");

  return (
    <div className="product-card">
      <div className="product-img">
        {isUrl && !imgError ? (
          <img
            src={product.img}
            alt={product.name}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="product-emoji">🍰</span>
        )}
        {product.badge && (
          <span className={`product-badge ${product.badge === "Новинка" ? "new" : ""}`}>
            {product.badge}
          </span>
        )}
      </div>
      <div className="product-body">
        <div className="product-category">{product.category}</div>
        <div className="product-name">{product.name}</div>
        <div className="product-desc">{product.desc}</div>
        <div className="product-weight">⚖️ {product.weight} · Состав: {product.allergens}</div>
        <div className="product-footer">
          <div className="product-price">
            {product.price.toLocaleString("ru")} <span>₽</span>
          </div>
          <button
            className={`add-cart-btn ${added ? "added" : ""}`}
            onClick={() => onAdd(product)}
          >
            {added ? "✓ Добавлено" : "+ В корзину"}
          </button>
        </div>
      </div>
    </div>
  );
}