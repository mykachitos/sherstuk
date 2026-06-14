import { CATEGORIES } from "../constants/data";
import ProductCard from "./ProductCard";

export default function CatalogPage({ filtered, category, setCategory, addToCart, addedIds, user, setPage }) {
  return (
    <div className="page">
      <h1 className="page-title">Каталог</h1>
      {!user && (
        <div className="lock-notice">
          <span className="lock-icon">🔒</span>
          <div>
            Для оформления заказа необходима{" "}
            <a onClick={() => setPage("auth")}>авторизация</a>. Каталог доступен без входа.
          </div>
        </div>
      )}
      <div className="filter-bar">
        {CATEGORIES.map(c => (
          <button
            key={c}
            className={`filter-chip ${category === c ? "active" : ""}`}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="products-grid">
        {filtered.map(p => (
          <ProductCard key={p.id} product={p} onAdd={addToCart} added={!!addedIds[p.id]} />
        ))}
      </div>
    </div>
  );
}