import * as dishesRepo from "../repositories/dishes.repo.js";

export async function getDishes() {
    const allDishes = await dishesRepo.findAll();

    return allDishes;
}

export async function postDish(reqDTO) {
    const result = await dishesRepo.addNew(reqDTO.name, reqDTO.typeId);

    return result;
}

export async function deleteDish(reqDTO) {
    const result = await dishesRepo.deleteDish(reqDTO.id);

    return result;
}