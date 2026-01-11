import request from "supertest";
import app from "../src/app.js";

describe("POST /api/dishes", () => {

    test("201 — успешно создаёт блюдо", async () => {
        const response = await request(app)
            .post("/api/dishes")
            .send({
                name: "Тестовое блюдо",
                typeId: 1
            });

        expect(response.status).toBe(201);

        expect(response.body).toEqual({
            id: expect.any(Number),
            name: "Тестовое блюдо",
            type: {
                id: 1,
                name: expect.any(String),
                orderIndex: expect.any(Number)
            }
        });
    });

    test("409 — блюдо с таким именем уже существует", async () => {
        // создаём блюдо первый раз
        await request(app)
            .post("/api/dishes")
            .send({
                name: "Дубликат",
                typeId: 1
            });

        // пробуем создать ещё раз
        const response = await request(app)
            .post("/api/dishes")
            .send({
                name: "Дубликат",
                typeId: 2
            });

        expect(response.status).toBe(409);
    });

    test("404 — typeId не существует", async () => {
        const response = await request(app)
            .post("/api/dishes")
            .send({
                name: "Неизвестный тип",
                typeId: 999
            });

        expect(response.status).toBe(404);
    });

    test("400 — отсутствует поле name", async () => {
        const response = await request(app)
            .post("/api/dishes")
            .send({
                typeId: 1
            });

        expect(response.status).toBe(400);
    });

});
