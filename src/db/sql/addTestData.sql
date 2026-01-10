
INSERT INTO menu_variants (day_of_week, variant_num)
VALUES
    (1, 1), -- Понедельник, вариант 1
    (1, 2), -- Понедельник, вариант 2
    (2, 1), -- Вторник, вариант 1
    (2, 2); -- Вторник, вариант 2

INSERT INTO dishes_catalog (name, dish_type_id)
VALUES
    ('Салат Цезарь', 1),
    ('Оливье', 1),
    ('Борщ', 2),
    ('Куриный суп', 2),
    ('Котлета с пюре', 3),
    ('Паста Болоньезе', 3),
    ('Компот', 4),
    ('Чай', 4),
    ('Морс', 4),
    ('Наполеон', 5),
    ('Чизкейк', 5);

-- menu_id = 1
INSERT INTO menu_dishes (menu_id, dish_id, dish_type_id)
VALUES
    (1, 1, 1),  -- Салат Цезарь
    (1, 3, 2),  -- Борщ
    (1, 5, 3),  -- Котлета с пюре
    (1, 7, 4),  -- Компот
    (1, 10, 5); -- Наполеон

-- menu_id = 2
INSERT INTO menu_dishes (menu_id, dish_id, dish_type_id)
VALUES
    (2, 2, 1),  -- Оливье
    (2, 4, 2),  -- Куриный суп
    (2, 6, 3),  -- Паста Болоньезе
    (2, 8, 4),  -- Чай
    (2, 11, 5); -- Чизкейк

-- menu_id = 3
INSERT INTO menu_dishes (menu_id, dish_id, dish_type_id)
VALUES
    (3, 1, 1),  -- Салат Цезарь
    (3, 3, 2),  -- Борщ
    (3, 6, 3),  -- Паста Болоньезе
    (3, 9, 4),  -- Морс
    (3, 10, 5); -- Наполеон

-- menu_id = 4
INSERT INTO menu_dishes (menu_id, dish_id, dish_type_id)
VALUES
    (4, 2, 1),  -- Оливье
    (4, 4, 2),  -- Куриный суп
    (4, 5, 3),  -- Котлета с пюре
    (4, 8, 4),  -- Чай
    (4, 11, 5); -- Чизкейк
