function ensureInteger(value, fieldName) {
    if (!Number.isInteger(value)) {
        throw new Error(`${fieldName} must be integer`);
    }
}

export function menuIdDto(menuId) {
    ensureInteger(menuId, "menuId");
    return { menuId };
}

export function dishIdDto(dishId) {
    ensureInteger(dishId, "dishId");
    return { dishId };
}

export function createMenuDto(body) {
    const { dayOfWeek, variantNum } = body;

    ensureInteger(dayOfWeek, "dayOfWeek");
    ensureInteger(variantNum, "variantNum");

    if (dayOfWeek < 1 || dayOfWeek > 7) {
        throw new Error("dayOfWeek must be between 1 and 7");
    }

    if (variantNum < 1) {
        throw new Error("variantNum must be >= 1");
    }

    return { dayOfWeek, variantNum };
}

export function updateMenuDto(body) {
    const { dayOfWeek, variantNum } = body;

    ensureInteger(dayOfWeek, "dayOfWeek");
    ensureInteger(variantNum, "variantNum");

    if (dayOfWeek < 1 || dayOfWeek > 7) {
        throw new Error("dayOfWeek must be between 1 and 7");
    }

    if (variantNum < 1) {
        throw new Error("variantNum must be >= 1");
    }

    return { dayOfWeek, variantNum };
}

export function addDishToMenuDto(body) {
    const { dishId } = body;
    ensureInteger(dishId, "dishId");
    return { dishId };
}

export function moveDishDto(body) {
    const { newMenuId } = body;
    ensureInteger(newMenuId, "newMenuId");
    return { newMenuId };
}

export function menuDto(menuRow) {
    return {
        id: menuRow.id,
        dayOfWeek: menuRow.day_of_week,
        variantNum: menuRow.variant_num
    };
}

export function dishFromMenuRowDto(row) {
    return {
        id: row.dish_id,
        name: row.dish_name,
        type: {
            id: row.type_id,
            name: row.type_name,
            orderIndex: row.type_order_index
        }
    };
}

export function menuWithDishesDto(rows) {
    if (!rows || rows.length === 0) {
        return null;
    }

    const menu = {
        id: rows[0].menu_id,
        dayOfWeek: rows[0].day_of_week,
        variantNum: rows[0].variant_num,
        dishes: []
    };

    for (const row of rows) {
        if (row.dish_id) {
            menu.dishes.push(dishFromMenuRowDto(row));
        }
    }

    return menu;
}

export function menusWithDishesDto(rows) {
    const menusMap = new Map();

    for (const row of rows) {
        if (!menusMap.has(row.menu_id)) {
            menusMap.set(row.menu_id, {
                id: row.menu_id,
                dayOfWeek: row.day_of_week,
                variantNum: row.variant_num,
                dishes: []
            });
        }

        if (row.dish_id) {
            menusMap.get(row.menu_id).dishes.push(dishFromMenuRowDto(row));
        }
    }

    return Array.from(menusMap.values());
}

export function menuDishesDto(rows) {
    return rows.map(row => dishFromMenuRowDto(row));
}
