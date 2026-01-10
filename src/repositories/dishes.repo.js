import { all, get, run } from "../db/db.js";

export async function deleteDish(id) {
    return run("DELETE FROM dishes_catalog WHERE id = ?;", [id]);
}

export async function addNew(name, typeId) {
    return run("INSERT INTO dishes_catalog (name, dish_type_id) VALUES (?, ?)", [
        name,
        typeId
    ]);
}

export async function findAll() {
    return all(
        ` SELECT  dc.id AS id,
                    dc.name AS name,
                    dc.dish_type_id AS dish_type_id,
                    dt.name AS type_name,
                    dt.order_index AS order_index
            FROM dishes_catalog dc
            JOIN dish_types dt ON dt.id = dc.dish_type_id`
    );
}

export async function findById(id) {
    return get(
        ` SELECT  dc.id AS id,
                    dc.name AS name,
                    dc.dish_type_id AS dish_type_id,
                    dt.name AS type_name,
                    dt.order_index AS order_index
            FROM dishes_catalog dc
            JOIN dish_types dt ON dt.id = dc.dish_type_id
            WHERE dc.id = ?`,
        [id]
    );
}

export async function findByName(name) {
    return get(
        ` SELECT dc.id AS id,
                 dc.name AS name,
                 dc.dish_type_id AS dish_type_id
          FROM dishes_catalog dc
          WHERE dc.name = ?`,
        [name]
    );
}

export async function updateDish(id, name, typeId) {
    return run(
        "UPDATE dishes_catalog SET name = ?, dish_type_id = ? WHERE id = ?;",
        [name, typeId, id]
    );
}
