import { formatMoney } from "../utils/format";

export default function ProductCard({
  product,
  onAdd,
  added,
  isFavorite = false,
  onToggleFavorite,
}) {
  return (
    <article className="product-card">
      <div className="product-media">
        <img src={product.imageUrl} alt={product.name} loading="lazy" />
        <button
          type="button"
          className={`favorite-btn ${isFavorite ? "active" : ""}`}
          onClick={() => onToggleFavorite?.(product)}
          aria-label={isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
        >
          {isFavorite ? "♥" : "♡"}
        </button>
        <div className="product-flags">
          {product.badgeLabel && <span className="product-flag">{product.badgeLabel}</span>}
          {product.isMonthPick && <span className="product-flag warm">Товар месяца</span>}
          {product.hasDiscount && (
            <span className="product-flag accent">-{product.discountPercent}%</span>
          )}
        </div>
      </div>

      <div className="product-body">
        <div className="product-category">{product.category?.name}</div>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc">{product.description}</p>

        <div className="product-meta">
          <span>{product.weight}</span>
          <span>{product.allergens}</span>
        </div>

        <div className="product-footer">
          <div className="product-pricing">
            <strong>{formatMoney(product.price)}</strong>
            {product.hasDiscount && product.originalPrice ? (
              <span>{formatMoney(product.originalPrice)}</span>
            ) : null}
          </div>
          <button
            type="button"
            className={`add-cart-btn ${added ? "added" : ""}`}
            onClick={() => onAdd(product)}
          >
            {added ? "Добавлено" : "В корзину"}
          </button>
        </div>
      </div>
    </article>
  );
}
