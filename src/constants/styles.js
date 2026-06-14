const FONT = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');`;

export const css = `
  ${FONT}
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; background: #faf7f2; color: #2d2217; }

  :root {
    --cream: #faf7f2;
    --warm: #f5efe3;
    --brown: #7a4f2e;
    --brown-light: #c8956a;
    --brown-dark: #3d2010;
    --rose: #d4847a;
    --rose-light: #f0c4be;
    --gold: #c9a84c;
    --text: #2d2217;
    --text-muted: #8a6a50;
    --border: rgba(122,79,46,0.15);
    --white: #ffffff;
    --shadow: 0 2px 20px rgba(61,32,16,0.08);
    --shadow-lg: 0 8px 40px rgba(61,32,16,0.12);
  }

  .app { min-height: 100vh; display: flex; flex-direction: column; }

  /* NAV */
  .nav { background: var(--white); border-bottom: 1px solid var(--border); position: sticky; top: 0; z-index: 100; box-shadow: var(--shadow); }
  .nav-inner { max-width: 1200px; margin: 0 auto; display: flex; align-items: center; gap: 24px; padding: 14px 24px; }
  .nav-logo { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: var(--brown-dark); letter-spacing: -0.5px; cursor: pointer; flex: 0 0 auto; }
  .nav-logo span { color: var(--rose); }
  .nav-links { display: flex; gap: 4px; flex: 1; }
  .nav-btn { background: none; border: none; cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 14px; color: var(--text-muted); padding: 8px 14px; border-radius: 8px; transition: all 0.2s; font-weight: 400; }
  .nav-btn:hover { background: var(--warm); color: var(--brown); }
  .nav-btn.active { background: var(--warm); color: var(--brown-dark); font-weight: 500; }
  .nav-actions { display: flex; gap: 8px; align-items: center; margin-left: auto; }
  .nav-icon-btn { background: none; border: 1px solid var(--border); border-radius: 10px; padding: 8px 14px; cursor: pointer; font-size: 14px; display: flex; align-items: center; gap: 6px; color: var(--text-muted); transition: all 0.2s; font-family: 'DM Sans', sans-serif; font-weight: 400; }
  .nav-icon-btn:hover { border-color: var(--brown-light); color: var(--brown); background: var(--warm); }
  .cart-badge { background: var(--rose); color: white; border-radius: 50%; width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 500; }

  /* HERO */
  .hero { background: linear-gradient(135deg, #3d2010 0%, #7a4f2e 50%, #c8956a 100%); color: white; padding: 80px 24px; text-align: center; position: relative; overflow: hidden; }
  .hero::before { content: ''; position: absolute; inset: 0; background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='20'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"); }
  .hero-content { position: relative; max-width: 700px; margin: 0 auto; }
  .hero-eyebrow { font-size: 12px; letter-spacing: 3px; text-transform: uppercase; color: var(--rose-light); margin-bottom: 16px; font-weight: 500; }
  .hero h1 { font-family: 'Playfair Display', serif; font-size: clamp(32px, 5vw, 56px); line-height: 1.15; margin-bottom: 20px; font-weight: 700; }
  .hero h1 em { font-style: italic; color: var(--rose-light); }
  .hero p { font-size: 17px; opacity: 0.85; margin-bottom: 36px; line-height: 1.6; font-weight: 300; }
  .hero-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
  .btn-primary { background: white; color: var(--brown-dark); border: none; border-radius: 12px; padding: 14px 28px; font-size: 15px; cursor: pointer; font-weight: 500; transition: all 0.2s; font-family: 'DM Sans', sans-serif; box-shadow: 0 4px 16px rgba(0,0,0,0.15); }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 6px 24px rgba(0,0,0,0.2); }
  .btn-outline-white { background: transparent; color: white; border: 1px solid rgba(255,255,255,0.4); border-radius: 12px; padding: 14px 28px; font-size: 15px; cursor: pointer; font-weight: 400; transition: all 0.2s; font-family: 'DM Sans', sans-serif; }
  .btn-outline-white:hover { background: rgba(255,255,255,0.1); }
  .hero-stats { display: flex; gap: 40px; justify-content: center; margin-top: 48px; padding-top: 40px; border-top: 1px solid rgba(255,255,255,0.15); }
  .hero-stat { text-align: center; }
  .hero-stat-num { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 700; }
  .hero-stat-label { font-size: 12px; opacity: 0.7; margin-top: 4px; font-weight: 300; }

  /* MAIN LAYOUT */
  .page { max-width: 1200px; margin: 0 auto; padding: 48px 24px; flex: 1; }

  /* CATALOG */
  .section-header { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 32px; }
  .section-title { font-family: 'Playfair Display', serif; font-size: 30px; font-weight: 600; color: var(--brown-dark); }
  .filter-bar { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 32px; }
  .filter-chip { background: var(--white); border: 1px solid var(--border); border-radius: 20px; padding: 8px 18px; font-size: 13px; cursor: pointer; font-weight: 400; color: var(--text-muted); transition: all 0.2s; font-family: 'DM Sans', sans-serif; }
  .filter-chip:hover { border-color: var(--brown-light); color: var(--brown); }
  .filter-chip.active { background: var(--brown); color: white; border-color: var(--brown); }

   .products-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
  }
  @media (max-width: 1100px) {
    .products-grid { grid-template-columns: repeat(3, 1fr); }
  }
  @media (max-width: 800px) {
    .products-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 500px) {
    .products-grid { grid-template-columns: 1fr; }
  }

  .product-card {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
    transition: all 0.25s;
    cursor: default;
    display: flex;
    flex-direction: column;
    max-width: 100%;
  }
  .product-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
    border-color: var(--brown-light);
  }

  .product-img {
    background: var(--warm);
    aspect-ratio: 1 / 1;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }
  .product-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.4s;
  }
  .product-card:hover .product-img img { transform: scale(1.05); }
  .product-emoji { font-size: 64px; }

  .product-card { background: var(--white); border: 1px solid var(--border); border-radius: 16px; overflow: hidden; transition: all 0.25s; cursor: default; display: flex; flex-direction: column; }
  .product-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); border-color: var(--brown-light); }
    .product-img {
    background: var(--warm);
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }
  .product-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.4s;
  }
  .product-card:hover .product-img img {
    transform: scale(1.05);
  }
  .product-emoji {
    font-size: 64px;
  };
  }
  .product-card:hover .product-img img { transform: scale(1.05); }
  .product-badge { position: absolute; top: 12px; right: 12px; background: var(--rose); color: white; font-size: 11px; padding: 4px 10px; border-radius: 20px; font-weight: 500; }
  .product-badge.new { background: var(--gold); }
  .product-body { padding: 16px 18px; flex: 1; display: flex; flex-direction: column; }
  .product-category { font-size: 11px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 6px; font-weight: 500; }
  .product-name { font-family: 'Playfair Display', serif; font-size: 17px; font-weight: 600; color: var(--brown-dark); margin-bottom: 8px; line-height: 1.3; }
  .product-desc { font-size: 13px; color: var(--text-muted); line-height: 1.5; margin-bottom: 12px; flex: 1; }
  .product-weight { font-size: 12px; color: var(--text-muted); margin-bottom: 14px; }
  .product-footer { display: flex; align-items: center; justify-content: space-between; margin-top: auto; }
  .product-price { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: var(--brown); }
  .product-price span { font-size: 13px; font-weight: 400; color: var(--text-muted); font-family: 'DM Sans', sans-serif; }
  .add-cart-btn { background: var(--brown); color: white; border: none; border-radius: 10px; padding: 9px 18px; font-size: 13px; cursor: pointer; font-weight: 500; transition: all 0.2s; font-family: 'DM Sans', sans-serif; display: flex; align-items: center; gap: 6px; }
  .add-cart-btn:hover { background: var(--brown-dark); transform: translateY(-1px); }
  .add-cart-btn.added { background: #6a8a6a; }

  /* CART PAGE */
  .cart-layout { display: grid; grid-template-columns: 1fr 360px; gap: 32px; align-items: start; }
  @media (max-width: 900px) { .cart-layout { grid-template-columns: 1fr; } }
  .cart-items { display: flex; flex-direction: column; gap: 12px; }
  .cart-item { background: var(--white); border: 1px solid var(--border); border-radius: 14px; padding: 16px 18px; display: flex; align-items: center; gap: 16px; }
  .cart-item-emoji { font-size: 40px; width: 60px; height: 60px; background: var(--warm); border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .cart-item-info { flex: 1; }
  .cart-item-name { font-size: 15px; font-weight: 500; color: var(--brown-dark); margin-bottom: 4px; }
  .cart-item-sub { font-size: 13px; color: var(--text-muted); }
  .qty-ctrl { display: flex; align-items: center; gap: 10px; }
  .qty-btn { width: 30px; height: 30px; border-radius: 8px; border: 1px solid var(--border); background: var(--white); cursor: pointer; font-size: 16px; display: flex; align-items: center; justify-content: center; transition: all 0.2s; color: var(--brown); }
  .qty-btn:hover { background: var(--warm); border-color: var(--brown-light); }
  .qty-num { font-size: 15px; font-weight: 500; min-width: 20px; text-align: center; }
  .cart-item-price { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; color: var(--brown); min-width: 90px; text-align: right; }
  .remove-btn { background: none; border: none; cursor: pointer; color: var(--text-muted); padding: 4px; border-radius: 6px; transition: all 0.2s; font-size: 16px; }
  .remove-btn:hover { color: #c0392b; background: #fdf0ee; }

  .cart-summary { background: var(--white); border: 1px solid var(--border); border-radius: 16px; padding: 24px; position: sticky; top: 80px; }
  .cart-summary h3 { font-family: 'Playfair Display', serif; font-size: 20px; margin-bottom: 20px; color: var(--brown-dark); }
  .summary-row { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 14px; color: var(--text-muted); }
  .summary-row.total { font-size: 18px; font-weight: 600; color: var(--brown-dark); border-top: 1px solid var(--border); padding-top: 14px; margin-top: 14px; }
  .checkout-btn { width: 100%; background: var(--brown); color: white; border: none; border-radius: 12px; padding: 14px; font-size: 15px; font-weight: 500; cursor: pointer; transition: all 0.2s; margin-top: 16px; font-family: 'DM Sans', sans-serif; }
  .checkout-btn:hover { background: var(--brown-dark); }
  .checkout-btn:disabled { opacity: 0.5; cursor: default; }

  /* ORDER FORM */
  .order-form { background: var(--white); border: 1px solid var(--border); border-radius: 16px; padding: 28px; display: flex; flex-direction: column; gap: 16px; margin-top: 20px; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .form-group { display: flex; flex-direction: column; gap: 6px; }
  .form-group label { font-size: 13px; font-weight: 500; color: var(--text-muted); }
  .form-group input, .form-group select, .form-group textarea { border: 1px solid var(--border); border-radius: 10px; padding: 10px 14px; font-size: 14px; color: var(--text); background: var(--white); font-family: 'DM Sans', sans-serif; transition: border 0.2s; outline: none; width: 100%; }
  .form-group input:focus, .form-group select:focus, .form-group textarea:focus { border-color: var(--brown-light); box-shadow: 0 0 0 3px rgba(200,149,106,0.12); }
  .form-group textarea { resize: vertical; min-height: 80px; }

  /* ACCOUNT PAGE */
  .account-layout { display: grid; grid-template-columns: 240px 1fr; gap: 32px; align-items: start; }
  @media (max-width: 800px) { .account-layout { grid-template-columns: 1fr; } }
  .account-sidebar { background: var(--white); border: 1px solid var(--border); border-radius: 16px; padding: 24px; position: sticky; top: 80px; }
  .account-avatar { width: 70px; height: 70px; background: var(--warm); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: 'Playfair Display', serif; font-size: 26px; font-weight: 600; color: var(--brown); margin: 0 auto 16px; }
  .account-name { text-align: center; font-weight: 600; font-size: 16px; color: var(--brown-dark); margin-bottom: 4px; }
  .account-email { text-align: center; font-size: 13px; color: var(--text-muted); margin-bottom: 20px; }
  .sidebar-menu { display: flex; flex-direction: column; gap: 4px; }
  .sidebar-item { background: none; border: none; cursor: pointer; text-align: left; padding: 10px 14px; border-radius: 10px; font-size: 14px; color: var(--text-muted); transition: all 0.2s; font-family: 'DM Sans', sans-serif; }
  .sidebar-item:hover { background: var(--warm); color: var(--brown); }
  .sidebar-item.active { background: var(--warm); color: var(--brown-dark); font-weight: 500; }
  .logout-btn { width: 100%; margin-top: 16px; padding: 10px; background: none; border: 1px solid var(--border); border-radius: 10px; cursor: pointer; font-size: 14px; color: var(--text-muted); transition: all 0.2s; font-family: 'DM Sans', sans-serif; }
  .logout-btn:hover { border-color: #c0392b; color: #c0392b; background: #fdf0ee; }

  .order-card { background: var(--white); border: 1px solid var(--border); border-radius: 14px; padding: 20px 22px; margin-bottom: 14px; }
  .order-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
  .order-id { font-weight: 600; font-size: 15px; color: var(--brown-dark); }
  .order-date { font-size: 13px; color: var(--text-muted); }
  .order-status { font-size: 12px; padding: 4px 12px; border-radius: 20px; font-weight: 500; }
  .status-new { background: #fff3cd; color: #856404; }
  .status-cooking { background: #d1ecf1; color: #0c5460; }
  .status-done { background: #d4edda; color: #155724; }
  .order-items-list { font-size: 13px; color: var(--text-muted); line-height: 1.8; }
  .order-total { font-weight: 600; font-size: 15px; color: var(--brown); margin-top: 10px; }

  /* AUTH PAGE */
  .auth-container { max-width: 420px; margin: 60px auto; padding: 0 24px; }
  .auth-card { background: var(--white); border: 1px solid var(--border); border-radius: 20px; padding: 36px; box-shadow: var(--shadow); }
  .auth-logo { font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 700; color: var(--brown-dark); text-align: center; margin-bottom: 6px; }
  .auth-logo span { color: var(--rose); }
  .auth-subtitle { text-align: center; font-size: 14px; color: var(--text-muted); margin-bottom: 28px; }
  .auth-tabs { display: flex; background: var(--warm); border-radius: 10px; padding: 4px; margin-bottom: 24px; }
  .auth-tab { flex: 1; padding: 9px; border: none; background: none; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 400; color: var(--text-muted); transition: all 0.2s; font-family: 'DM Sans', sans-serif; }
    .auth-tab.active { background: white; color: var(--brown-dark); font-weight: 500; box-shadow: 0 1px 6px rgba(0,0,0,0.06); }
  .auth-form { display: flex; flex-direction: column; gap: 14px; }
  .auth-submit { width: 100%; padding: 13px; background: var(--brown); color: white; border: none; border-radius: 12px; font-size: 15px; font-weight: 500; cursor: pointer; transition: all 0.2s; margin-top: 4px; font-family: 'DM Sans', sans-serif; }
  .auth-submit:hover { background: var(--brown-dark); }
  .auth-err { color: #c0392b; font-size: 13px; text-align: center; }
  .auth-ok { color: #27ae60; font-size: 13px; text-align: center; }

  /* TOAST */
  .toast { position: fixed; bottom: 24px; right: 24px; background: var(--brown-dark); color: white; padding: 12px 20px; border-radius: 12px; font-size: 14px; font-weight: 500; z-index: 9999; opacity: 0; transform: translateY(10px); transition: all 0.3s; pointer-events: none; }
  .toast.show { opacity: 1; transform: translateY(0); }
  .toast.success { background: #27ae60; }

    /* ABOUT PAGE */
  .about-hero {
    background: linear-gradient(135deg, #3d2010 0%, #7a4f2e 100%);
    color: white; padding: 100px 24px 80px; text-align: center;
    position: relative; overflow: hidden;
  }
  .about-hero::before {
    content: ''; position: absolute; inset: 0;
    background: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Ccircle cx='40' cy='40' r='2'/%3E%3C/g%3E%3C/svg%3E");
  }
  .about-hero-content { position: relative; max-width: 720px; margin: 0 auto; }
  .about-hero h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(32px, 5vw, 52px); line-height: 1.15;
    margin-bottom: 20px; font-weight: 700;
  }
  .about-hero h1 em { font-style: italic; color: var(--rose-light); }
  .about-hero p { font-size: 17px; opacity: 0.85; line-height: 1.6; font-weight: 300; }

  .about-section { margin-bottom: 80px; }
  .about-eyebrow {
    font-size: 12px; letter-spacing: 3px; text-transform: uppercase;
    color: var(--rose); font-weight: 500; margin-bottom: 12px;
  }
  .about-eyebrow.center { text-align: center; }
  .about-h2 {
    font-family: 'Playfair Display', serif;
    font-size: 34px; font-weight: 600; color: var(--brown-dark);
    margin-bottom: 40px; line-height: 1.2;
  }
  .about-h2.center { text-align: center; }

  .about-story {
    display: grid; grid-template-columns: 1.2fr 1fr;
    gap: 60px; align-items: center;
  }
  @media (max-width: 800px) { .about-story { grid-template-columns: 1fr; gap: 30px; } }
  .about-story-text p {
    font-size: 16px; color: var(--text-muted);
    line-height: 1.7; margin-bottom: 16px;
  }
  .about-story-text strong { color: var(--brown-dark); }
  .about-btn { margin-top: 20px; background: var(--brown); color: white; }
  .about-btn:hover { background: var(--brown-dark); }
  .about-story-img {
    background: linear-gradient(135deg, var(--warm), var(--rose-light));
    border-radius: 24px; aspect-ratio: 1;
    display: flex; align-items: center; justify-content: center;
    box-shadow: var(--shadow-lg);
  }
  .about-emoji-big { font-size: 160px; }

  .values-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 20px;
  }
  .value-card {
    background: var(--white); border: 1px solid var(--border);
    border-radius: 16px; padding: 28px 24px; text-align: center;
    transition: all 0.25s;
  }
  .value-card:hover {
    transform: translateY(-4px); box-shadow: var(--shadow-lg);
    border-color: var(--brown-light);
  }
  .value-icon { font-size: 44px; margin-bottom: 16px; }
  .value-card h3 {
    font-family: 'Playfair Display', serif;
    font-size: 18px; color: var(--brown-dark);
    margin-bottom: 10px; font-weight: 600;
  }
  .value-card p { font-size: 14px; color: var(--text-muted); line-height: 1.6; }
    .product-img {
    background: var(--warm);
    height: 200px; display: flex;
    align-items: center; justify-content: center;
    position: relative; overflow: hidden;
  }
  .product-img img {
    width: 100%; height: 100%; object-fit: cover;
    transition: transform 0.4s;
  }
  .product-card:hover .product-img img { transform: scale(1.05); }

  .timeline {
    max-width: 700px; margin: 0 auto;
    position: relative; padding-left: 40px;
  }
  .timeline::before {
    content: ''; position: absolute; left: 12px; top: 8px; bottom: 8px;
    width: 2px; background: var(--border);
  }
  .timeline-item {
    position: relative; padding-bottom: 36px;
  }
  .timeline-item:last-child { padding-bottom: 0; }
  .timeline-dot {
    position: absolute; left: -34px; top: 6px;
    width: 14px; height: 14px; border-radius: 50%;
    background: var(--brown); border: 3px solid var(--cream);
    box-shadow: 0 0 0 2px var(--brown-light);
  }
  .timeline-year {
    font-family: 'Playfair Display', serif;
    font-size: 22px; font-weight: 700; color: var(--rose);
    margin-bottom: 6px;
  }
  .timeline-content h3 {
    font-family: 'Playfair Display', serif;
    font-size: 18px; color: var(--brown-dark);
    margin-bottom: 6px; font-weight: 600;
  }
  .timeline-content p { font-size: 14px; color: var(--text-muted); line-height: 1.6; }

  .team-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 24px;
  }
  .team-card {
    background: var(--white); border: 1px solid var(--border);
    border-radius: 18px; padding: 32px 24px; text-align: center;
    transition: all 0.25s;
  }
  .team-card:hover {
    transform: translateY(-4px); box-shadow: var(--shadow-lg);
    border-color: var(--brown-light);
  }
  .team-avatar {
    width: 100px; height: 100px; margin: 0 auto 16px;
    background: linear-gradient(135deg, var(--warm), var(--rose-light));
    border-radius: 50%; display: flex; align-items: center; justify-content: center;
    font-size: 50px;
  }
  .team-name {
    font-family: 'Playfair Display', serif;
    font-size: 18px; font-weight: 600; color: var(--brown-dark);
    margin-bottom: 4px;
  }
  .team-role {
    font-size: 12px; text-transform: uppercase;
    letter-spacing: 1.5px; color: var(--rose);
    font-weight: 500; margin-bottom: 12px;
  }
  .team-desc { font-size: 13px; color: var(--text-muted); line-height: 1.6; }

  .about-stats {
    background: linear-gradient(135deg, var(--brown-dark), var(--brown));
    border-radius: 24px; padding: 50px 30px; color: white;
    margin-bottom: 80px;
  }
  .about-stats-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 30px; text-align: center;
  }
  .about-stat-num {
    font-family: 'Playfair Display', serif;
    font-size: 38px; font-weight: 700;
    color: var(--rose-light);
  }
  .about-stat-label {
    font-size: 13px; opacity: 0.85;
    margin-top: 6px; font-weight: 300;
  }

  .about-cta {
    text-align: center; padding: 60px 30px;
    background: var(--warm); border-radius: 24px;
  }
  .about-cta h2 {
    font-family: 'Playfair Display', serif;
    font-size: 30px; color: var(--brown-dark);
    margin-bottom: 12px; font-weight: 600;
  }
  .about-cta p { font-size: 16px; color: var(--text-muted); margin-bottom: 28px; }

  /* EMPTY */
  .empty-state { text-align: center; padding: 60px 20px; color: var(--text-muted); }
  .empty-state-icon { font-size: 56px; margin-bottom: 16px; }
  .empty-state h3 { font-family: 'Playfair Display', serif; font-size: 22px; color: var(--brown-dark); margin-bottom: 8px; }
  .empty-state p { font-size: 15px; margin-bottom: 24px; }

  /* FOOTER */
  .footer { background: var(--brown-dark); color: rgba(255,255,255,0.7); padding: 40px 24px; text-align: center; font-size: 13px; }
  .footer-logo { font-family: 'Playfair Display', serif; font-size: 20px; color: white; margin-bottom: 8px; }
  .footer-logo span { color: var(--rose-light); }

  /* FEEDBACK FORM */
  .feedback-section { background: var(--warm); border-radius: 20px; padding: 40px; text-align: center; margin-top: 40px; }
  .feedback-section h2 { font-family: 'Playfair Display', serif; font-size: 26px; color: var(--brown-dark); margin-bottom: 8px; }
  .feedback-section p { color: var(--text-muted); margin-bottom: 24px; font-size: 15px; }
  .feedback-form { max-width: 500px; margin: 0 auto; display: flex; flex-direction: column; gap: 12px; }
  .feedback-form input, .feedback-form textarea { border: 1px solid var(--border); border-radius: 10px; padding: 11px 14px; font-size: 14px; background: white; font-family: 'DM Sans', sans-serif; outline: none; color: var(--text); transition: border 0.2s; }
  .feedback-form input:focus, .feedback-form textarea:focus { border-color: var(--brown-light); }
  .feedback-form textarea { min-height: 90px; resize: vertical; }
  .feedback-btn { background: var(--brown); color: white; border: none; border-radius: 12px; padding: 13px; font-size: 15px; cursor: pointer; font-weight: 500; transition: all 0.2s; font-family: 'DM Sans', sans-serif; }
  .feedback-btn:hover { background: var(--brown-dark); }

  .page-title { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 600; color: var(--brown-dark); margin-bottom: 28px; }

  .lock-notice { background: var(--warm); border: 1px dashed var(--brown-light); border-radius: 14px; padding: 20px 24px; margin-bottom: 24px; display: flex; align-items: center; gap: 12px; font-size: 14px; color: var(--text-muted); }
  .lock-icon { font-size: 22px; }
  .lock-notice a { color: var(--brown); text-decoration: none; font-weight: 500; cursor: pointer; }
  .lock-notice a:hover { text-decoration: underline; }

  .success-screen { text-align: center; padding: 60px 20px; }
  .success-screen .big-icon { font-size: 70px; margin-bottom: 20px; }
  .success-screen h2 { font-family: 'Playfair Display', serif; font-size: 28px; color: var(--brown-dark); margin-bottom: 12px; }
  .success-screen p { font-size: 16px; color: var(--text-muted); margin-bottom: 28px; }
`



;
