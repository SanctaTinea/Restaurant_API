import { query } from "../db/db.js";

export async function findAll() {
    return query(
        "SELECT id AS id, name AS name, order_index AS order_index FROM dish_types"
    );
}
