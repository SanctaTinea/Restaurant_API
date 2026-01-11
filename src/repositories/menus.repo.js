import { all, get, run } from "../db/db.js";

export async function findAllWithDishes() {
    return all(
        ` SELECT  mv.id AS menu_id,
                  mv.day_of_week AS day_of_week,
                  mv.variant_num AS variant_num,
                  dc.id AS dish_id,
                  dc.name AS dish_name,
                  dt.id AS type_id,
                  dt.name AS type_name,
                  dt.order_index AS type_order_index
          FROM menu_variants mv
          LEFT JOIN menu_dishes md ON mv.id = md.menu_id
          LEFT JOIN dishes_catalog dc ON md.dish_id = dc.id
          LEFT JOIN dish_types dt ON dc.dish_type_id = dt.id
          ORDER BY mv.id, dt.order_index`
    );
}

export async function findMenuWithDishes(menuId) {
    return all(
        ` SELECT  mv.id AS menu_id,
                  mv.day_of_week AS day_of_week,
                  mv.variant_num AS variant_num,
                  dc.id AS dish_id,
                  dc.name AS dish_name,
                  dt.id AS type_id,
                  dt.name AS type_name,
                  dt.order_index AS type_order_index
          FROM menu_variants mv
          LEFT JOIN menu_dishes md ON mv.id = md.menu_id
          LEFT JOIN dishes_catalog dc ON md.dish_id = dc.id
          LEFT JOIN dish_types dt ON dc.dish_type_id = dt.id
          WHERE mv.id = ?
          ORDER BY dt.order_index`,
        [menuId]
    );
}

export async function findMenuById(id) {
    return get(
        "SELECT id AS id, day_of_week AS day_of_week, variant_num AS variant_num FROM menu_variants WHERE id = ?",
        [id]
    );
}

export async function findMenuByDayVariant(dayOfWeek, variantNum) {
    return get(
        "SELECT id AS id FROM menu_variants WHERE day_of_week = ? AND variant_num = ?",
        [dayOfWeek, variantNum]
    );
}

export async function addMenu(dayOfWeek, variantNum) {
    return run(
        "INSERT INTO menu_variants (day_of_week, variant_num) VALUES (?, ?)",
        [dayOfWeek, variantNum]
    );
}

export async function updateMenu(id, dayOfWeek, variantNum) {
    return run(
        "UPDATE menu_variants SET day_of_week = ?, variant_num = ? WHERE id = ?",
        [dayOfWeek, variantNum, id]
    );
}

export async function deleteMenu(id) {
    return run("DELETE FROM menu_variants WHERE id = ?", [id]);
}

export async function findMenuDishes(menuId) {
    return all(
        ` SELECT  dc.id AS dish_id,
                  dc.name AS dish_name,
                  dt.id AS type_id,
                  dt.name AS type_name,
                  dt.order_index AS type_order_index
          FROM menu_dishes md
          JOIN dishes_catalog dc ON md.dish_id = dc.id
          JOIN dish_types dt ON dc.dish_type_id = dt.id
          WHERE md.menu_id = ?
          ORDER BY dt.order_index`,
        [menuId]
    );
}

export async function findMenuDishLink(menuId, dishId) {
    return get(
        "SELECT id AS id, dish_type_id AS dish_type_id FROM menu_dishes WHERE menu_id = ? AND dish_id = ?",
        [menuId, dishId]
    );
}

export async function findMenuDishByType(menuId, dishTypeId) {
    return get(
        "SELECT id AS id FROM menu_dishes WHERE menu_id = ? AND dish_type_id = ?",
        [menuId, dishTypeId]
    );
}

export async function addDishToMenu(menuId, dishId, dishTypeId) {
    return run(
        "INSERT INTO menu_dishes (menu_id, dish_id, dish_type_id) VALUES (?, ?, ?)",
        [menuId, dishId, dishTypeId]
    );
}

export async function moveDishToMenu(menuId, dishId, newMenuId) {
    return run(
        "UPDATE menu_dishes SET menu_id = ? WHERE menu_id = ? AND dish_id = ?",
        [newMenuId, menuId, dishId]
    );
}

export async function deleteMenuDish(menuId, dishId) {
    return run("DELETE FROM menu_dishes WHERE menu_id = ? AND dish_id = ?", [
        menuId,
        dishId
    ]);
}
