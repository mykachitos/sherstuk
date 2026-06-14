export const PRODUCTS = [
  // ===== ТОРТЫ (15) =====
  { id: 1, name: "Торт «Малиновый сон»", category: "Торты", price: 2800, weight: "1.2 кг", img: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&auto=format&fit=crop", desc: "Нежный бисквит с малиновым конфитюром и сливочным кремом.", badge: "Хит", allergens: "Глютен, молоко, яйца" },
  { id: 2, name: "Медовик классический", category: "Торты", price: 2200, weight: "1.0 кг", img: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=600&auto=format&fit=crop", desc: "Традиционный медовик с заварным кремом и цветочным мёдом.", badge: null, allergens: "Глютен, молоко, яйца" },
  { id: 3, name: "Торт «Три шоколада»", category: "Торты", price: 3400, weight: "1.4 кг", img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop", desc: "Три слоя мусса — тёмный, молочный и белый шоколад. Без муки.", badge: "Новинка", allergens: "Молоко, яйца" },
  { id: 4, name: "Торт «Птичье молоко»", category: "Торты", price: 2600, weight: "1.1 кг", img: "https://images.unsplash.com/photo-1565808229224-264b6b6f0c8e?w=600&auto=format&fit=crop", desc: "Воздушное суфле с шоколадной глазурью. Нежнее нежного.", badge: null, allergens: "Молоко, яйца, желатин" },
  { id: 5, name: "Чизкейк Нью-Йорк", category: "Торты", price: 2400, weight: "1.0 кг", img: "https://images.unsplash.com/photo-1567171466295-4afa63d45416?w=600&auto=format&fit=crop", desc: "Классический чизкейк на песочной основе.", badge: "Хит", allergens: "Глютен, молоко, яйца" },
  { id: 6, name: "Торт «Красный бархат»", category: "Торты", price: 2900, weight: "1.2 кг", img: "https://images.unsplash.com/photo-1586788680434-30d324ee2991?w=600&auto=format&fit=crop", desc: "Яркие красные коржи с крем-чизом. Лёгкая текстура.", badge: null, allergens: "Глютен, молоко, яйца" },
  { id: 7, name: "Морковный торт", category: "Торты", price: 2300, weight: "1.1 кг", img: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=600&auto=format&fit=crop", desc: "Пряный морковный торт с грецкими орехами и крем-чизом.", badge: null, allergens: "Глютен, молоко, яйца, орехи" },
  { id: 8, name: "Торт «Наполеон»", category: "Торты", price: 2500, weight: "1.2 кг", img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&auto=format&fit=crop", desc: "Слоёные коржи с нежнейшим заварным кремом.", badge: null, allergens: "Глютен, молоко, яйца" },
  { id: 9, name: "Торт «Захер»", category: "Торты", price: 3100, weight: "1.3 кг", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop", desc: "Венский шоколадный торт с абрикосовым джемом.", badge: "Новинка", allergens: "Глютен, молоко, яйца" },
  { id: 10, name: "Торт «Тирамису»", category: "Торты", price: 2700, weight: "1.0 кг", img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&auto=format&fit=crop", desc: "Итальянский десерт с маскарпоне, кофе и какао.", badge: null, allergens: "Глютен, молоко, яйца" },
  { id: 11, name: "Торт «Эстерхази»", category: "Торты", price: 3200, weight: "1.3 кг", img: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=600&auto=format&fit=crop", desc: "Венгерский торт с миндальными коржами и кремом пралине.", badge: null, allergens: "Глютен, миндаль, яйца" },
  { id: 12, name: "Торт «Прага»", category: "Торты", price: 2650, weight: "1.1 кг", img: "https://images.unsplash.com/photo-1542124948-dc391252a940?w=600&auto=format&fit=crop", desc: "Шоколадный торт с абрикосовым джемом и глазурью.", badge: null, allergens: "Глютен, молоко, яйца" },
  { id: 13, name: "Торт «Сметанник»", category: "Торты", price: 2100, weight: "1.0 кг", img: "https://images.unsplash.com/photo-1562440499-64c9a111f713?w=600&auto=format&fit=crop", desc: "Нежные коржи с воздушным сметанным кремом.", badge: null, allergens: "Глютен, молоко, яйца" },
  { id: 14, name: "Торт «Графские развалины»", category: "Торты", price: 2850, weight: "1.2 кг", img: "https://images.unsplash.com/photo-1606890658317-7d14490b76fd?w=600&auto=format&fit=crop", desc: "Шоколадно-сливочный торт с безе и грецкими орехами.", badge: "Хит", allergens: "Глютен, молоко, яйца, орехи" },
  { id: 15, name: "Торт «Сникерс»", category: "Торты", price: 3000, weight: "1.3 кг", img: "https://images.unsplash.com/photo-1565828995965-29c8c3a4adcd?w=600&auto=format&fit=crop", desc: "Шоколадные коржи, карамель, арахис и нуга.", badge: "Новинка", allergens: "Глютен, молоко, яйца, арахис" },

  // ===== ПИРОЖНЫЕ (15) =====
  { id: 16, name: "Макаронс ассорти", category: "Пирожные", price: 980, weight: "12 шт", img: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=600&auto=format&fit=crop", desc: "Французские макаронс с разными начинками.", badge: "Хит", allergens: "Глютен, миндаль, яйца" },
  { id: 17, name: "Эклеры шоколадные", category: "Пирожные", price: 650, weight: "6 шт", img: "https://images.unsplash.com/photo-1612203985729-70726954388c?w=600&auto=format&fit=crop", desc: "Классические эклеры с заварным кремом.", badge: null, allergens: "Глютен, молоко, яйца" },
  { id: 18, name: "Пирожное «Картошка»", category: "Пирожные", price: 480, weight: "6 шт", img: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=600&auto=format&fit=crop", desc: "Домашнее пирожное с какао и сгущённым молоком.", badge: null, allergens: "Глютен, молоко" },
  { id: 19, name: "Профитроли", category: "Пирожные", price: 720, weight: "10 шт", img: "https://images.unsplash.com/photo-1623246123320-0d6636755796?w=600&auto=format&fit=crop", desc: "Воздушные шарики из заварного теста с кремом.", badge: null, allergens: "Глютен, молоко, яйца" },
  { id: 20, name: "Корзиночки с ягодами", category: "Пирожные", price: 850, weight: "8 шт", img: "https://images.unsplash.com/photo-1464195244916-405fa0a82545?w=600&auto=format&fit=crop", desc: "Песочные корзиночки с заварным кремом и ягодами.", badge: "Хит", allergens: "Глютен, молоко, яйца" },
  { id: 21, name: "Мильфей", category: "Пирожные", price: 590, weight: "4 шт", img: "https://images.unsplash.com/photo-1519869325930-281384150729?w=600&auto=format&fit=crop", desc: "Слоёное тесто с ванильным кремом и сахарной пудрой.", badge: null, allergens: "Глютен, молоко, яйца" },
  { id: 22, name: "Канноли по-сицилийски", category: "Пирожные", price: 780, weight: "6 шт", img: "https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=600&auto=format&fit=crop", desc: "Хрустящие трубочки с кремом из рикотты.", badge: "Новинка", allergens: "Глютен, молоко, яйца" },
  { id: 23, name: "Тарт лимонный", category: "Пирожные", price: 690, weight: "4 шт", img: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=600&auto=format&fit=crop", desc: "Песочное тесто с лимонным курдом и меренгой.", badge: null, allergens: "Глютен, молоко, яйца" },
  { id: 24, name: "Брауни шоколадный", category: "Пирожные", price: 520, weight: "6 шт", img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop", desc: "Влажный шоколадный брауни с орехами.", badge: null, allergens: "Глютен, молоко, яйца, орехи" },
  { id: 25, name: "Чизкейк-стаканчики", category: "Пирожные", price: 620, weight: "4 шт", img: "https://images.unsplash.com/photo-1551404973-761c5a5fb47f?w=600&auto=format&fit=crop", desc: "Порционные чизкейки в стаканчиках с ягодным соусом.", badge: null, allergens: "Глютен, молоко, яйца" },
  { id: 26, name: "Тарталетки фруктовые", category: "Пирожные", price: 870, weight: "6 шт", img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&auto=format&fit=crop", desc: "Хрустящие тарталетки с кремом и фруктами.", badge: null, allergens: "Глютен, молоко, яйца" },
  { id: 27, name: "Шу с кремом", category: "Пирожные", price: 740, weight: "8 шт", img: "https://images.unsplash.com/photo-1582563899220-6c1abf8e0e8b?w=600&auto=format&fit=crop", desc: "Заварные пирожные с кракелюром и сливочным кремом.", badge: "Хит", allergens: "Глютен, молоко, яйца" },
  { id: 28, name: "Пирожное «Павлова»", category: "Пирожные", price: 810, weight: "4 шт", img: "https://images.unsplash.com/photo-1488477304112-4944851de03d?w=600&auto=format&fit=crop", desc: "Хрустящая меренга с кремом и свежими ягодами.", badge: "Новинка", allergens: "Молоко, яйца" },
  { id: 29, name: "Капкейки ванильные", category: "Пирожные", price: 660, weight: "6 шт", img: "https://images.unsplash.com/photo-1426869981800-95ebf51ce900?w=600&auto=format&fit=crop", desc: "Нежные ванильные капкейки с кремом крем-чиз.", badge: null, allergens: "Глютен, молоко, яйца" },
  { id: 30, name: "Чурросы с шоколадом", category: "Пирожные", price: 540, weight: "8 шт", img: "https://images.unsplash.com/photo-1624371414361-e670edf4898d?w=600&auto=format&fit=crop", desc: "Испанские чурросы с шоколадным соусом.", badge: null, allergens: "Глютен, молоко, яйца" },

  // ===== КОНФЕТЫ (15) =====
  { id: 31, name: "Трюфели ручной работы", category: "Конфеты", price: 890, weight: "200 г", img: "https://images.unsplash.com/photo-1548907040-4baa42d10919?w=600&auto=format&fit=crop", desc: "Бельгийский шоколад 72%, сливки, ваниль.", badge: "Хит", allergens: "Молоко" },
  { id: 32, name: "Шоколадные медальоны", category: "Конфеты", price: 760, weight: "150 г", img: "https://images.unsplash.com/photo-1623161122168-9b5c5b1b6e34?w=600&auto=format&fit=crop", desc: "Шоколад с сублимированными ягодами и орехами.", badge: null, allergens: "Молоко, орехи" },
  { id: 33, name: "Марципановые фигурки", category: "Конфеты", price: 1100, weight: "180 г", img: "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=600&auto=format&fit=crop", desc: "Фигурки из миндального марципана с росписью.", badge: "Новинка", allergens: "Миндаль" },
  { id: 34, name: "Конфеты пралине", category: "Конфеты", price: 950, weight: "200 г", img: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=600&auto=format&fit=crop", desc: "Конфеты с начинкой из фундучного пралине.", badge: null, allergens: "Молоко, орехи" },
  { id: 35, name: "Клубника в шоколаде", category: "Конфеты", price: 1290, weight: "12 шт", img: "https://images.unsplash.com/photo-1572383672419-ab35444a6934?w=600&auto=format&fit=crop", desc: "Свежая клубника в бельгийском шоколаде.", badge: "Хит", allergens: "Молоко" },
  { id: 36, name: "Шоколадные плитки крафт", category: "Конфеты", price: 590, weight: "100 г", img: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=600&auto=format&fit=crop", desc: "Тёмный шоколад 70% с морской солью и орехами.", badge: null, allergens: "Молоко, орехи" },
  { id: 37, name: "Конфеты с орехами и мёдом", category: "Конфеты", price: 820, weight: "180 г", img: "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=600&auto=format&fit=crop", desc: "Грецкие орехи и фундук в мёде с шоколадом.", badge: null, allergens: "Молоко, орехи" },
  { id: 38, name: "Шоколадные сердечки", category: "Конфеты", price: 1050, weight: "16 шт", img: "https://images.unsplash.com/photo-1581798459219-318e76aecc7b?w=600&auto=format&fit=crop", desc: "Конфеты-сердца с разными начинками.", badge: "Новинка", allergens: "Молоко, орехи" },
  { id: 39, name: "Чернослив в шоколаде", category: "Конфеты", price: 680, weight: "200 г", img: "https://images.unsplash.com/photo-1548907040-4baa42d10919?w=600&auto=format&fit=crop", desc: "Сочный чернослив с грецким орехом в шоколаде.", badge: null, allergens: "Молоко, орехи" },
  { id: 40, name: "Драже из ягод", category: "Конфеты", price: 740, weight: "150 г", img: "https://images.unsplash.com/photo-1623161122168-9b5c5b1b6e34?w=600&auto=format&fit=crop", desc: "Сублимированная клубника и малина в шоколаде.", badge: null, allergens: "Молоко" },
  { id: 41, name: "Конфеты «Рафаэлло»", category: "Конфеты", price: 920, weight: "180 г", img: "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=600&auto=format&fit=crop", desc: "Нежные кокосовые конфеты с миндалём внутри.", badge: null, allergens: "Молоко, миндаль, кокос" },
  { id: 42, name: "Шоколадные камни", category: "Конфеты", price: 780, weight: "200 г", img: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=600&auto=format&fit=crop", desc: "Миндаль в тёмном шоколаде с какао-пудрой.", badge: null, allergens: "Молоко, миндаль" },
  { id: 43, name: "Желейные конфеты", category: "Конфеты", price: 540, weight: "200 г", img: "https://images.unsplash.com/photo-1581798459219-318e76aecc7b?w=600&auto=format&fit=crop", desc: "Натуральные желейные конфеты из фруктовых соков.", badge: "Хит", allergens: "Желатин" },
  { id: 44, name: "Имбирные шарики", category: "Конфеты", price: 690, weight: "150 г", img: "https://images.unsplash.com/photo-1548907040-4baa42d10919?w=600&auto=format&fit=crop", desc: "Сухофрукты и орехи с имбирём в шоколаде.", badge: null, allergens: "Молоко, орехи" },
  { id: 45, name: "Конфеты «Грильяж»", category: "Конфеты", price: 870, weight: "200 г", img: "https://images.unsplash.com/photo-1623161122168-9b5c5b1b6e34?w=600&auto=format&fit=crop", desc: "Карамелизированные орехи в тёмном шоколаде.", badge: "Новинка", allergens: "Молоко, орехи" },

  // ===== ПЕЧЕНЬЕ (15) =====
  { id: 46, name: "Имбирное печенье", category: "Печенье", price: 420, weight: "300 г", img: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=600&auto=format&fit=crop", desc: "Ароматное имбирное печенье с расписной глазурью.", badge: null, allergens: "Глютен, яйца" },
  { id: 47, name: "Овсяное печенье", category: "Печенье", price: 380, weight: "250 г", img: "https://images.unsplash.com/photo-1490567674331-72de84e93f3f?w=600&auto=format&fit=crop", desc: "Домашнее овсяное печенье с изюмом и корицей.", badge: null, allergens: "Глютен, молоко" },
  { id: 48, name: "Печенье с шоколадом", category: "Печенье", price: 450, weight: "300 г", img: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&auto=format&fit=crop", desc: "Американское cookies с кусочками тёмного шоколада.", badge: "Хит", allergens: "Глютен, молоко, яйца" },
  { id: 49, name: "Курабье восточное", category: "Печенье", price: 390, weight: "250 г", img: "https://images.unsplash.com/photo-1568051243851-f9b136146e97?w=600&auto=format&fit=crop", desc: "Песочное печенье с джемом по восточному рецепту.", badge: null, allergens: "Глютен, молоко, яйца" },
  { id: 50, name: "Бискотти миндальные", category: "Печенье", price: 520, weight: "200 г", img: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&auto=format&fit=crop", desc: "Итальянское хрустящее печенье с миндалём.", badge: null, allergens: "Глютен, миндаль, яйца" },
  { id: 51, name: "Песочное печенье", category: "Печенье", price: 350, weight: "300 г", img: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&auto=format&fit=crop", desc: "Рассыпчатое печенье разных форм с сахарной посыпкой.", badge: null, allergens: "Глютен, молоко, яйца" },
  { id: 52, name: "Сабле французское", category: "Печенье", price: 480, weight: "200 г", img: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=600&auto=format&fit=crop", desc: "Тающее во рту масляное печенье с ванилью.", badge: "Новинка", allergens: "Глютен, молоко, яйца" },
  { id: 53, name: "Печенье «Мадлен»", category: "Печенье", price: 560, weight: "12 шт", img: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=600&auto=format&fit=crop", desc: "Французское печенье в форме ракушек с ванилью.", badge: null, allergens: "Глютен, молоко, яйца" },
  { id: 54, name: "Меренги цветные", category: "Печенье", price: 410, weight: "200 г", img: "https://images.unsplash.com/photo-1558326567-98ae2405596b?w=600&auto=format&fit=crop", desc: "Хрустящие меренги разных цветов и вкусов.", badge: null, allergens: "Яйца" },
  { id: 55, name: "Печенье «Снежки»", category: "Печенье", price: 470, weight: "250 г", img: "https://images.unsplash.com/photo-1551879400-111a9087cd86?w=600&auto=format&fit=crop", desc: "Песочное печенье с орехами в сахарной пудре.", badge: null, allergens: "Глютен, молоко, орехи" },
  { id: 56, name: "Пряники медовые", category: "Печенье", price: 440, weight: "300 г", img: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=600&auto=format&fit=crop", desc: "Мягкие медовые пряники с пряностями и глазурью.", badge: "Хит", allergens: "Глютен, молоко, яйца" },
  { id: 57, name: "Флорентины", category: "Печенье", price: 620, weight: "200 г", img: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&auto=format&fit=crop", desc: "Хрустящие печенья с миндалём и карамелью.", badge: null, allergens: "Глютен, миндаль, молоко" },
    { id: 58, name: "Печенье «Линцер»", category: "Печенье", price: 540, weight: "250 г", img: "https://images.unsplash.com/photo-1568051243851-f9b136146e97?w=600&auto=format&fit=crop", desc: "Австрийское песочное печенье с малиновым джемом.", badge: "Новинка", allergens: "Глютен, молоко, орехи" },
  { id: 59, name: "Кантуччи с орехами", category: "Печенье", price: 580, weight: "200 г", img: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&auto=format&fit=crop", desc: "Тосканское печенье с фундуком и миндалём.", badge: null, allergens: "Глютен, орехи, яйца" },
  { id: 60, name: "Печенье с клюквой", category: "Печенье", price: 460, weight: "250 г", img: "https://images.unsplash.com/photo-1490567674331-72de84e93f3f?w=600&auto=format&fit=crop", desc: "Овсяное печенье с сушёной клюквой и белым шоколадом.", badge: null, allergens: "Глютен, молоко, яйца" },
];

export const CATEGORIES = ["Все", "Торты", "Пирожные", "Конфеты", "Печенье"];

export const ORDERS_KEY = "sweethand_orders";
export const USER_KEY = "sweethand_user";
export const CART_KEY = "sweethand_cart";
export const USERS_DB_KEY = "sweethand_users_db";

// Районы Владивостока для доставки
export const DISTRICTS = [
  { name: "Центр", price: 200 },
  { name: "Первая Речка", price: 300 },
  { name: "Вторая Речка", price: 350 },
  { name: "Чуркин", price: 400 },
  { name: "Эгершельд", price: 350 },
  { name: "Тихая", price: 400 },
  { name: "БАМ", price: 450 },
  { name: "Снеговая Падь", price: 500 },
  { name: "Седанка", price: 550 },
  { name: "Чайка", price: 600 },
];

// Доступные временные слоты доставки
export const TIME_SLOTS = [
  "10:00 — 12:00",
  "12:00 — 14:00",
  "14:00 — 16:00",
  "16:00 — 18:00",
  "18:00 — 20:00",
];