import request from "supertest";
import app from "../src/app.js";

describe("GET /api/dishes", () => {
    test("200 — показать все блюда", async () => {
        const response = await request(app)
            .get("/api/dishes").query();

        expect(response.status).toBe(200);

        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    type: {
                        id: expect.any(Number),
                        name: expect.any(String),
                        orderIndex: expect.any(Number)
                    }
                })
            ])
        );
    });
})