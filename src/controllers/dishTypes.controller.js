import * as dish_typesService from "../services/dishTypes.service.js";
import {dishTypesDto} from "../dto/dishTypes.dto.js";

export async function getDishTypes(req, res) {
    try {
        const result = await dish_typesService.getDishTypes();
        const resultDTO = dishTypesDto(result);

        res.status(200).json(resultDTO);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}