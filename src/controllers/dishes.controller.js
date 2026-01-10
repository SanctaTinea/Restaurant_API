import * as dishesService from "../services/dishes.service.js";
import { addDishDto, dishDto, dishesDto, idDto, updateDishDto } from "../dto/dishes.dto.js";

export async function getDishes(req, res) {
    try {
        const result = await dishesService.getDishes();
        const resultDTO = dishesDto(result);

        res.status(200).json(resultDTO);
    } catch (err) {
        res.status(err.status || 400).json({ message: err.message });
    }
}

export async function postDish(req, res) {
    try {
        const reqDTO = addDishDto(req.body.name, req.body.typeId);
        const result = await dishesService.postDish(reqDTO);
        const resultDTO = dishDto(result);

        res.status(201).json(resultDTO);
    } catch (err) {
        res.status(err.status || 400).json({ message: err.message });
    }
}

export async function deleteDish(req, res) {
    try {
        const reqDTO = idDto(Number(req.params.dishId));
        await dishesService.deleteDish(reqDTO);

        res.status(204).send();
    } catch (err) {
        res.status(err.status || 400).json({ message: err.message });
    }
}

export async function putDish(req, res) {
    try {
        const reqId = idDto(Number(req.params.dishId));
        const reqBody = updateDishDto(req.body.name, req.body.typeId);
        const result = await dishesService.updateDish({
            id: reqId.id,
            name: reqBody.name,
            typeId: reqBody.typeId
        });
        const resultDTO = dishDto(result);

        res.status(200).json(resultDTO);
    } catch (err) {
        res.status(err.status || 400).json({ message: err.message });
    }
}
