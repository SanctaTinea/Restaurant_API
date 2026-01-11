import * as menusRepo from "../repositories/menus.repo.js";
import * as dishesRepo from "../repositories/dishes.repo.js";
import { createHttpError } from "./errors.js";

export async function getMenusWithDishes() {
    return menusRepo.findAllWithDishes();
}

export async function getMenuDishes(menuId) {
    const menu = await menusRepo.findMenuById(menuId);
    if (!menu) {
        throw createHttpError(404, "Menu not found");
    }

    return menusRepo.findMenuDishes(menuId);
}

export async function createMenu(dayOfWeek, variantNum) {
    const existing = await menusRepo.findMenuByDayVariant(dayOfWeek, variantNum);
    if (existing) {
        throw createHttpError(409, "Menu variant already exists");
    }

    const result = await menusRepo.addMenu(dayOfWeek, variantNum);
    return menusRepo.findMenuById(result.lastID);
}

export async function updateMenu(menuId, dayOfWeek, variantNum) {
    const menu = await menusRepo.findMenuById(menuId);
    if (!menu) {
        throw createHttpError(404, "Menu not found");
    }

    const existing = await menusRepo.findMenuByDayVariant(dayOfWeek, variantNum);
    if (existing && existing.id !== menuId) {
        throw createHttpError(409, "Menu variant already exists");
    }

    await menusRepo.updateMenu(menuId, dayOfWeek, variantNum);
    return menusRepo.findMenuWithDishes(menuId);
}

export async function deleteMenu(menuId) {
    const menu = await menusRepo.findMenuById(menuId);
    if (!menu) {
        throw createHttpError(404, "Menu not found");
    }

    await menusRepo.deleteMenu(menuId);
    return null;
}

export async function addDishToMenu(menuId, dishId) {
    const menu = await menusRepo.findMenuById(menuId);
    if (!menu) {
        throw createHttpError(404, "Menu not found");
    }

    const dish = await dishesRepo.findById(dishId);
    if (!dish) {
        throw createHttpError(404, "Dish not found");
    }

    const conflict = await menusRepo.findMenuDishByType(
        menuId,
        dish.dish_type_id
    );
    if (conflict) {
        throw createHttpError(409, "Dish type already exists in menu");
    }

    await menusRepo.addDishToMenu(menuId, dishId, dish.dish_type_id);
    return dish;
}

export async function moveDishToMenu(menuId, dishId, newMenuId) {
    const menu = await menusRepo.findMenuById(menuId);
    if (!menu) {
        throw createHttpError(404, "Menu not found");
    }

    const newMenu = await menusRepo.findMenuById(newMenuId);
    if (!newMenu) {
        throw createHttpError(404, "Menu not found");
    }

    const dish = await dishesRepo.findById(dishId);
    if (!dish) {
        throw createHttpError(404, "Dish not found");
    }

    const menuDish = await menusRepo.findMenuDishLink(menuId, dishId);
    if (!menuDish) {
        throw createHttpError(404, "Dish not found in menu");
    }

    if (newMenuId !== menuId) {
        const conflict = await menusRepo.findMenuDishByType(
            newMenuId,
            dish.dish_type_id
        );
        if (conflict) {
            throw createHttpError(409, "Dish type already exists in menu");
        }

        await menusRepo.moveDishToMenu(menuId, dishId, newMenuId);
    }

    return menusRepo.findMenuWithDishes(newMenuId);
}

export async function deleteDishFromMenu(menuId, dishId) {
    const menu = await menusRepo.findMenuById(menuId);
    if (!menu) {
        throw createHttpError(404, "Menu not found");
    }

    const dish = await dishesRepo.findById(dishId);
    if (!dish) {
        throw createHttpError(404, "Dish not found");
    }

    const menuDish = await menusRepo.findMenuDishLink(menuId, dishId);
    if (!menuDish) {
        throw createHttpError(404, "Dish not found in menu");
    }

    await menusRepo.deleteMenuDish(menuId, dishId);
    return null;
}
