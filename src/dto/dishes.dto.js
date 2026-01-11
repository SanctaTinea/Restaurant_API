// GET /api/dishes
export function dishesDto(rows) {
    return rows.map(row => ({
        id: row.id,
        name: row.name,
        type: {
            id: row.dish_type_id,
            name: row.type_name,
            orderIndex: row.order_index
        }
    }));
}

export function dishDto(row) {
    if (!row) {
        return null;
    }

    return {
        id: row.id,
        name: row.name,
        type: {
            id: row.dish_type_id,
            name: row.type_name,
            orderIndex: row.order_index
        }
    };
}

// POST /api/dishes
export function addDishDto(name, typeId) {
    if (typeof name !== "string" || name.trim().length === 0) {
        throw new Error("dish name must be non-empty string");
    }

    if (!Number.isInteger(typeId)) {
        throw new Error("typeId must be integer");
    }

    return {
        name: name.trim(),
        typeId: typeId
    };
}

export function updateDishDto(name, typeId) {
    return addDishDto(name, typeId);
}

export function idDto(id) {
    if (!Number.isInteger(id)) { throw new Error("id must be integer"); }
    return { id: id };
}
