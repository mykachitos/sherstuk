# SweetHand

Интернет-витрина кондитерской с рабочим frontend на React и локальным backend на Express.

## Что уже есть

- регистрация и вход в аккаунт
- личный кабинет с историей заказов и избранным
- оформление заказов
- форма обратной связи для клиента
- админ-панель для товаров, пользователей, заказов и входящих сообщений
- сохранение данных на backend в `server/data/db.json`

## Запуск

```bash
npm install
npm start
```

`npm start` поднимает сразу два процесса:

- frontend: `http://localhost:3000`
- backend: `http://127.0.0.1:8000/api`

Если нужно запускать по отдельности:

```bash
npm run server
npm run client
```

## Демо-админ

- email: `admin@sweethand.local`
- пароль: `admin123`

## Сборка

```bash
npm run build
```
