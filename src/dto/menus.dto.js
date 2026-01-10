// GET /api/menus
export function menusWithDishesResponseDto(rows) {
    const menusMap = new Map();

    for (const row of rows) {
        if (!menusMap.has(row.menu_id)) {
            menusMap.set(row.menu_id, {
                menuId: row.menu_id,
                dayOfWeek: row.day_of_week,
                variantNum: row.variant_num,
                dishes: []
            });
        }

        if (row.menu_dish_id) {
            menusMap.get(row.menu_id).dishes.push({
                menuDishId: row.menu_dish_id,
                dishId: row.dish_id,
                name: row.dish_name,
                type: {
                    typeId: row.type_id,
                    name: row.type_name,
                    orderIndex: row.order_index
                }
            });
        }
    }

    return Array.from(menusMap.values());
}

// GET /api/menus/:menuId/dishes
export function getMenuDishDto(row) {
    return {
        menuDishId: row.menu_dish_id,
        dishId: row.dish_id,
        name: row.dish_name,
        type: {
            typeId: row.type_id,
            name: row.type_name,
            orderIndex: row.order_index
        }
    };
}

// POST /api/menus
export function postMenuDto(body) {
    const { dayOfWeek, variantNum } = body;

    if (!Number.isInteger(dayOfWeek) || dayOfWeek < 1 || dayOfWeek > 7) {
        throw new Error("dayOfWeek must be integer from 1 to 7");
    }

    if (!Number.isInteger(variantNum) || variantNum < 1) {
        throw new Error("variantNum must be integer >= 1");
    }

    return {
        dayOfWeek,
        variantNum
    };
}

// POST /api/menus/:menuId/dishes
export function postDishToMenuDto(body) {
    const { dishId } = body;

    if (!Number.isInteger(dishId)) {
        throw new Error("dishId must be integer");
    }

    return {
        dishId
    };
}

// PUT /api/menus/:menuId
export function putMenuDto(body) {
    const { dayOfWeek, variantNum } = body;

    if (dayOfWeek !== undefined) {
        if (!Number.isInteger(dayOfWeek) || dayOfWeek < 1 || dayOfWeek > 7) {
            throw new Error("dayOfWeek must be integer from 1 to 7");
        }
    }

    if (variantNum !== undefined) {
        if (!Number.isInteger(variantNum) || variantNum < 1) {
            throw new Error("variantNum must be integer >= 1");
        }
    }

    return {
        dayOfWeek,
        variantNum
    };
}

// PATCH /api/menus/:menuId/dishes/:menuDishId
export function patchMenuDishDto(body) {
    const { newMenuId } = body;

    if (!Number.isInteger(newMenuId)) {
        throw new Error("newMenuId must be integer");
    }

    return {
        newMenuId
    };
}

