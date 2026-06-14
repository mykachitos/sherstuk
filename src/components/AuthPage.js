import { useState } from "react";
import { USERS_DB_KEY } from "../constants/data";
import { getFromStorage, setToStorage } from "../utils/storage";

export default function AuthPage({ setUser, setPage, showToast }) {
  const [tab, setTab] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  const getUsersDb = () => getFromStorage(USERS_DB_KEY, []);
  const saveUsersDb = (users) => setToStorage(USERS_DB_KEY, users);

  const handleLogin = (e) => {
    e.preventDefault();
    setErr("");
    const users = getUsersDb();
    const found = users.find(u => u.email === email && u.pass === pass);
    if (!found) { setErr("Неверный email или пароль"); return; }
    setUser({ name: found.name, email: found.email, created: found.created });
    showToast(`Добро пожаловать, ${found.name}!`, "success");
    setPage("home");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setErr("");
    if (!name || !email || !pass) { setErr("Заполните все поля"); return; }
    if (pass.length < 6) { setErr("Пароль минимум 6 символов"); return; }
    const users = getUsersDb();
    if (users.find(u => u.email === email)) { setErr("Email уже зарегистрирован"); return; }
    const newUser = { name, email, pass, created: new Date().toLocaleDateString("ru") };
    saveUsersDb([...users, newUser]);
    setUser({ name, email, created: newUser.created });
    showToast(`Регистрация успешна! Добро пожаловать, ${name}!`, "success");
    setPage("home");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">Sweet<span>Hand</span></div>
        <div className="auth-subtitle">Кондитерские изделия ручной работы</div>
        <div className="auth-tabs">
          <button
            className={`auth-tab ${tab === "login" ? "active" : ""}`}
            onClick={() => { setTab("login"); setErr(""); }}
          >
            Войти
          </button>
          <button
            className={`auth-tab ${tab === "reg" ? "active" : ""}`}
            onClick={() => { setTab("reg"); setErr(""); }}
          >
            Регистрация
          </button>
        </div>

        {tab === "login" ? (
          <form className="auth-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="form-group">
              <label>Пароль</label>
              <input
                type="password"
                value={pass}
                onChange={e => setPass(e.target.value)}
                placeholder="••••••"
                required
              />
            </div>
            {err && <div className="auth-err">{err}</div>}
            <button type="submit" className="auth-submit">Войти</button>
            <div style={{ fontSize: 13, textAlign: "center", color: "#8a6a50" }}>
              Нет аккаунта?{" "}
              <span
                style={{ color: "#7a4f2e", cursor: "pointer", fontWeight: 500 }}
                onClick={() => setTab("reg")}
              >
                Зарегистрироваться
              </span>
            </div>
          </form>
        ) : (
          <form className="auth-form" onSubmit={handleRegister}>
            <div className="form-group">
              <label>Имя</label>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Ваше имя"
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="form-group">
              <label>Пароль</label>
              <input
                type="password"
                value={pass}
                onChange={e => setPass(e.target.value)}
                placeholder="Минимум 6 символов"
                required
              />
            </div>
            {err && <div className="auth-err">{err}</div>}
            <button type="submit" className="auth-submit">Создать аккаунт</button>
            <div style={{ fontSize: 13, textAlign: "center", color: "#8a6a50" }}>
              Уже есть аккаунт?{" "}
              <span
                style={{ color: "#7a4f2e", cursor: "pointer", fontWeight: 500 }}
                onClick={() => setTab("login")}
              >
                Войти
              </span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}