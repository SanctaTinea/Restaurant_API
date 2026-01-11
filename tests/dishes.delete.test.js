import request from "supertest";
import app from "../src/app.js";

describe("DELETE /api/dishes:dishId", () => {

    test("204 — блюдо успешно создано, затем удалено", async () => {
        const createResponse = await request(app)
            .post("/api/dishes")
            .send({
                name: "Тестовое блюдо2",
                typeId: 1
            });

        expect(createResponse.status).toBe(201);

        const dishId = createResponse.body.id;

        const deleteResponse = await request(app)
            .delete(`/api/dishes/${dishId}`);

        expect(deleteResponse.status).toBe(204);
        expect(deleteResponse.body).toEqual({});
    });

    test("404 — блюдо не найдено", async () => {
        const response = await request(app)
            .delete("/api/dishes/999999");

        expect(response.status).toBe(404);
    });

    test("400 — некорректный dishId", async () => {
        const response = await request(app)
            .delete("/api/dishes/abc");

        expect(response.status).toBe(400);
    });
});
