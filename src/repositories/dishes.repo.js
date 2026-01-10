import { query } from "../db/db.js";

export async function deleteDish(id) {
    return query(
        "DELETE FROM dishes_catalog WHERE id = ?;",
        [id]
    );
}

export async function addNew(name, typeId) {
    return query(
        "INSERT INTO dishes_catalog (name, dish_type_id) VALUES (?, ?)",
        [name, typeId]
    );
}

export async function findAll() {
    return query(
        ` SELECT  dc.id AS id,
                    dc.name AS name,
                    dc.dish_type_id AS dish_type_id,
                    dt.name AS type_name,
                    dt.order_index AS order_index 
            FROM dishes_catalog dc
            JOIN dish_types dt ON dt.id = dc.dish_type_id`
    );
}
