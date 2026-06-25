import { useState } from "react";
import { loginUser, registerUser } from "../utils/api";

const ACCOUNT_METRICS = [
  ["15 мин", "среднее подтверждение заказа"],
  ["24/7", "доступ к кабинету и избранному"],
  ["1 клик", "повтор заказа из истории"],
];

const ACCOUNT_BENEFITS = [
  "Сохраняйте понравившиеся десерты и возвращайтесь к ним позже.",
  "Следите за заказами, адресом и контактами в одном месте.",
  "Авторизуйтесь как администратор и управляйте витриной без лишних шагов.",
];

export default function AuthPage({ setUser, setToken, setPage, showToast }) {
  const [tab, setTab] = useState("login");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const isLogin = tab === "login";

  const handleLogin = async event => {
    event.preventDefault();
    setErr("");
    setLoading(true);

    try {
      const data = await loginUser({ email, password: pass });
      setToken(data.token);
      setUser(data.user);
      showToast(`С возвращением, ${data.user.name}!`, "success");
      setPage("home");
    } catch (error) {
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async event => {
    event.preventDefault();
    setErr("");
    setLoading(true);

    try {
      const data = await registerUser({
        name,
        phone,
        email,
        password: pass,
      });
      setToken(data.token);
      setUser(data.user);
      showToast(`Аккаунт создан. Добро пожаловать, ${data.user.name}!`, "success");
      setPage("home");
    } catch (error) {
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-panel auth-cover">
        <div className="auth-cover-content">
          <div className="auth-cover-top">
            <div className="auth-cover-badge">Личный кабинет SweetHand</div>
            <div className="auth-cover-kpis">
              {ACCOUNT_METRICS.map(([value, label]) => (
                <div className="auth-cover-kpi" key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="auth-cover-main">
            <span className="eyebrow light">SweetHand</span>
            <h1>Заказывайте десерты, сохраняйте избранное и управляйте покупками в одном кабинете.</h1>
            <p>
              После входа сайт запомнит ваш профиль, избранные позиции, историю заказов
              и даст доступ к админ-панели, если вы авторизуетесь под аккаунтом администратора.
            </p>

            <div className="auth-cover-list">
              {ACCOUNT_BENEFITS.map(item => (
                <div className="auth-cover-item" key={item}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="auth-panel auth-form-panel">
        <div className="auth-card">
          <div className="auth-form-head">
            <div>
              <div className="auth-logo">
                Sweet<span>Hand</span>
              </div>
              <div className="auth-subtitle">Кондитерская ручной работы</div>
            </div>

            <div className="auth-form-intro">
              <span className="eyebrow">{isLogin ? "С возвращением" : "Быстрый старт"}</span>
              <h2>{isLogin ? "Вход в кабинет" : "Создание аккаунта"}</h2>
              <p>
                {isLogin
                  ? "Авторизуйтесь, чтобы увидеть историю заказов, избранное и личные данные."
                  : "Заполните короткую форму и сразу получите доступ к каталогу, избранному и оформлению заказов."}
              </p>
            </div>
          </div>

          <div className="auth-tabs">
            <button
              type="button"
              className={`auth-tab ${isLogin ? "active" : ""}`}
              onClick={() => {
                setTab("login");
                setErr("");
              }}
            >
              Войти
            </button>
            <button
              type="button"
              className={`auth-tab ${!isLogin ? "active" : ""}`}
              onClick={() => {
                setTab("register");
                setErr("");
              }}
            >
              Регистрация
            </button>
          </div>

          {isLogin ? (
            <form className="auth-form" onSubmit={handleLogin}>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </div>
              <div className="form-group">
                <label>Пароль</label>
                <input
                  type="password"
                  value={pass}
                  onChange={event => setPass(event.target.value)}
                  placeholder="Минимум 6 символов"
                  autoComplete="current-password"
                  required
                />
              </div>
              {err ? <div className="auth-err">{err}</div> : null}
              <div className="auth-submit-row">
                <button type="submit" className="auth-submit" disabled={loading}>
                  {loading ? "Проверяем..." : "Войти"}
                </button>
                <span className="auth-helper-note">
                  После входа можно быстро повторять заказы и хранить избранные позиции.
                </span>
              </div>
            </form>
          ) : (
            <form className="auth-form" onSubmit={handleRegister}>
              <div className="form-group">
                <label>Имя</label>
                <input
                  value={name}
                  onChange={event => setName(event.target.value)}
                  placeholder="Как к вам обращаться"
                  autoComplete="name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Телефон</label>
                <input
                  value={phone}
                  onChange={event => setPhone(event.target.value)}
                  placeholder="+7 (___) ___-__-__"
                  autoComplete="tel"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </div>
              <div className="form-group">
                <label>Пароль</label>
                <input
                  type="password"
                  value={pass}
                  onChange={event => setPass(event.target.value)}
                  placeholder="Минимум 6 символов"
                  autoComplete="new-password"
                  required
                />
              </div>
              {err ? <div className="auth-err">{err}</div> : null}
              <div className="auth-submit-row">
                <button type="submit" className="auth-submit" disabled={loading}>
                  {loading ? "Создаём..." : "Создать аккаунт"}
                </button>
                <span className="auth-helper-note">
                  Регистрация занимает меньше минуты и сразу открывает доступ к кабинету.
                </span>
              </div>
            </form>
          )}

          <div className="auth-demo-note">
            <span>Для проверки админ-панели</span>
            <strong>admin@gmail.com / admin123</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
