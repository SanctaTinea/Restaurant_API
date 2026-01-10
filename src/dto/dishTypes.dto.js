// GET /api/dish-types
export function dishTypesDto(rows) {
    return rows.map(row => ({
        id: row.id,
        name: row.name,
        orderIndex: row.order_index
    }));
}