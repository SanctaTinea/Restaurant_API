import * as dishesService from "../services/dishes.service.js";
import {addDishDto, dishesDto, idDto} from "../dto/dishes.dto.js";

export async function getDishes(req, res) {
    try {
        const result = await dishesService.getDishes();
        const resultDTO = dishesDto(result);

        res.status(200).json(resultDTO);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export async function postDish(req, res) {
    try {
        const reqDTO = addDishDto(req.body.name, req.body.typeId);
        const result = await dishesService.postDish(reqDTO);

        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export async function deleteDish(req, res) {
    try {
        const reqDTO = idDto(Number(req.params.dishId));
        const result = await dishesService.deleteDish(reqDTO);

        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}