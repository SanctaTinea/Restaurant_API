import * as dishesRepo from "../repositories/dishes.repo.js";
import * as dishTypesRepo from "../repositories/dishTypes.repo.js";
import { createHttpError } from "./errors.js";

export async function getDishes() {
    const allDishes = await dishesRepo.findAll();

    return allDishes;
}

export async function postDish(reqDTO) {
    const existing = await dishesRepo.findByName(reqDTO.name);
    if (existing) {
        throw createHttpError(409, "Dish with this name already exists");
    }

    const type = await dishTypesRepo.findById(reqDTO.typeId);
    if (!type) {
        throw createHttpError(404, "Dish type not found");
    }

    const insertResult = await dishesRepo.addNew(reqDTO.name, reqDTO.typeId);
    const created = await dishesRepo.findById(insertResult.lastID);
    return created;
}

export async function deleteDish(reqDTO) {
    const dish = await dishesRepo.findById(reqDTO.id);
    if (!dish) {
        throw createHttpError(404, "Dish not found");
    }

    await dishesRepo.deleteDish(reqDTO.id);
    return null;
}

export async function updateDish(reqDTO) {
    const dish = await dishesRepo.findById(reqDTO.id);
    if (!dish) {
        throw createHttpError(404, "Dish not found");
    }

    const type = await dishTypesRepo.findById(reqDTO.typeId);
    if (!type) {
        throw createHttpError(404, "Dish type not found");
    }

    const existing = await dishesRepo.findByName(reqDTO.name);
    if (existing && existing.id !== reqDTO.id) {
        throw createHttpError(409, "Dish with this name already exists");
    }

    await dishesRepo.updateDish(reqDTO.id, reqDTO.name, reqDTO.typeId);
    return dishesRepo.findById(reqDTO.id);
}
