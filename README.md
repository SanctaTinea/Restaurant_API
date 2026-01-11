# Ресторан (ТРВП-008)

Курсовой проект по ТРВП. Цель - создать REST like API для псевдо ресторана

Упор был сделан на серверную часть и архитектуру. Frontend минимальный, чтобы продемонстировать работу

## API
[Смотрите документацию API](/API.md)

## Архитектура

Используется слоистая архитектуры. 
Архитектура серверной части разделена на контроллеры, сервисы и репозитории
Клиентская часть выполняет запросы к API и отображает полученные данные в интерфейсе.

Дерево проекта
```
scr
│   API.md
│   app.js
│   server.js
│   
├───controllers
│       dishes.controller.js
│       dishTypes.controller.js
│       menus.controller.js
│       
├───db
│   │   addTestData.js
│   │   database.sqlite
│   │   db.js
│   │   initDb.js
│   │   
│   └───sql
│           addTestData.sql
│           init.sql
│           
├───dto
│       dishes.dto.js
│       dishTypes.dto.js
│       menus.dto.js
│       
├───repositories
│       dishes.repo.js
│       dishTypes.repo.js
│       menus.repo.js
│       
├───routes
│       dishes.route.js
│       dishTypes.route.js
│       menus.route.js
│       
└───services
    dishes.service.js
    dishTypes.service.js
    errors.js
    menus.service.js
public
    api.js
    app.js
    index.html
    state.js
    styles.css
    ui.js
```

## Тестовая база данных

Просто выполните:
```Bash
node src/db/initDb.js
node src/db/addTestData.js
```

## План разработки проекта

- [x] Анализ предметной области и формирование требований
- [x] Проектирование REST-like API
- [x] Проектирование архитектуры серверной части
- [x] Проектирование структуры базы данных
- [x] Инициализация базы данных и наполнение тестовыми данными
- [x] Реализация серверной части приложения
- [x] Реализация и расширение автоматизированных тестов (выполнено частично)
- [ ] Функциональное тестирование API (выполнено частично)
- [x] Реализация клиентской части (минимальный HTML + JS)
- [ ] Разработка пользовательского интерфейса
- [ ] Визуальное оформление и улучшение UX
