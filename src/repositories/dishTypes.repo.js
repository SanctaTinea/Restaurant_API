import { all, get } from "../db/db.js";

export async function findAll() {
    return all(
        "SELECT id AS id, name AS name, order_index AS order_index FROM dish_types"
    );
}

export async function findById(id) {
    return get(
        "SELECT id AS id, name AS name, order_index AS order_index FROM dish_types WHERE id = ?",
        [id]
    );
}
