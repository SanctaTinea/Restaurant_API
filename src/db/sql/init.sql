-- PRAGMA foreign_keys = ON;

CREATE TABLE menu_variants (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    day_of_week INTEGER NOT NULL,
    variant_num INTEGER NOT NULL,
    UNIQUE (day_of_week, variant_num),
    CHECK (day_of_week BETWEEN 1 AND 7),
    CHECK (variant_num >= 1)
);

CREATE TABLE dish_types (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT        NOT NULL UNIQUE,
    order_index INTEGER     NOT NULL
);

-- this is constant values, so they are insert on initializing
INSERT INTO dish_types (name, order_index)
VALUES ('Салат', 1),
       ('Первое', 2),
       ('Второе', 3),
       ('Напиток', 4),
       ('Десерт', 5);

CREATE TABLE dishes_catalog (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    name         TEXT NOT NULL COLLATE NOCASE  UNIQUE,
    dish_type_id INTEGER NOT NULL,

    FOREIGN KEY (dish_type_id) REFERENCES dish_types(id)
);

CREATE TABLE menu_dishes (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    menu_id      INTEGER NOT NULL,
    dish_id      INTEGER NOT NULL,
    dish_type_id INTEGER NOT NULL,

    FOREIGN KEY (menu_id) REFERENCES menu_variants (id)  ON DELETE CASCADE,
    FOREIGN KEY (dish_id) REFERENCES dishes_catalog (id) ON DELETE CASCADE,
    FOREIGN KEY (dish_type_id) REFERENCES dish_types (id),

    UNIQUE (menu_id, dish_type_id)
);

-- triggers here for provide guarantee what dish_type_id in menu_dishes and dish_type_id in dishes_catalog the same for dish
CREATE TRIGGER menu_dishes_check_type
    BEFORE INSERT ON menu_dishes
BEGIN
    SELECT
        CASE
            WHEN NOT EXISTS (
                SELECT 1
                FROM dishes_catalog dc
                WHERE dc.id = NEW.dish_id
                  AND dc.dish_type_id = NEW.dish_type_id
            )
                THEN RAISE(ABORT, 'dish_type_id does not match dish_id')
            END;
END;
CREATE TRIGGER menu_dishes_check_type_update
    BEFORE UPDATE ON menu_dishes
BEGIN
    SELECT
        CASE
            WHEN NOT EXISTS (
                SELECT 1
                FROM dishes_catalog dc
                WHERE dc.id = NEW.dish_id
                  AND dc.dish_type_id = NEW.dish_type_id
            )
                THEN RAISE(ABORT, 'dish_type_id does not match dish_id')
            END;
END;
