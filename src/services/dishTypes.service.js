import * as dishTypesRepo from "../repositories/dishTypes.repo.js";

export async function getDishTypes() {
    const allDishTypes = await dishTypesRepo.findAll();

    return allDishTypes;
}