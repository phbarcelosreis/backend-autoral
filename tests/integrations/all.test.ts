import httpStatus from "http-status";
import supertest from "supertest";
import server, { init } from "../../src/index";
import { cleanDb, generateValidToken } from "../helpers";
import { faker } from "@faker-js/faker";
import { createUser } from "../factories/user-factory";
import * as jwt from "jsonwebtoken"

const api = supertest(server);

beforeAll(async () => {

    await init();
    await cleanDb();

});

describe("POST /registerUser", () => {
    it("should respond with status 400 when body is not given",
        async () => {

            const response = await api.post("/registerUser");

            expect(response.status).toBe(httpStatus.BAD_REQUEST);

        });

    it("should respond with status 400 when body is not valid",
        async () => {
            const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

            const response = await api.post("/registerUser").send(invalidBody);

            expect(response.status).toBe(httpStatus.BAD_REQUEST);
        });

    describe("when body is valid", () => {

        const generateValidBody = () => ({
            name: faker.name.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(1),
        });

        it("should respond with status 400 when password has less than 2 numbers", async () => {
            const body = generateValidBody();

            const response = await api.post("/registerUser").send(body);

            expect(response.status).toBe(httpStatus.BAD_REQUEST);
        });

    });

    it("should respond with status 409 when user is duplicated", async () => {

        const body = {
            email: "pedro2@gmail.com",
            password: "123asddasdsadas"
        };

        await api.post("/registerUser").send(body);

        const response = await api.post("/registerUser").send(body);

        expect(response.status).toBe(httpStatus.BAD_REQUEST);

    });

    it("should respond with status 201 and create user when given email is unique", async () => {

        const body = {
            name: faker.name.firstName(),
            email: "pedroa@gmail.com",
            password: faker.internet.password(6)
        };

        const response = await api.post("/registerUser").send(body);

        expect(response.status).toBe(httpStatus.CREATED);

    });

});

describe("POST /logIn", () => {
    it("should respond with status 400 when body is not given",
        async () => {

            const response = await api.post("/logIn");

            expect(response.status).toBe(httpStatus.BAD_REQUEST);

        });

    it("should respond with status 400 when body is not valid",
        async () => {
            const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

            const response = await api.post("/logIn").send(invalidBody);

            expect(response.status).toBe(httpStatus.BAD_REQUEST);
        });

    describe("when body is valid", () => {

        it("should respond with status 400 when password has less than 2 numbers", async () => {
            const generateValidBody = () => ({
                email: faker.internet.email(),
                password: faker.internet.password(1),
            });

            const body = generateValidBody();

            const response = await api.post("/logIn").send(body);

            expect(response.status).toBe(httpStatus.BAD_REQUEST);
        });

    });

    it("should respond with status 409 when user is duplicated", async () => {

        const body = {
            email: "pedro2@gmail.com",
            password: "123asddasdsadas"
        };

        await api.post("/logIn").send(body);

        const response = await api.post("/logIn").send(body);

        expect(response.status).toBe(httpStatus.BAD_REQUEST);

    });

    it("should respond with status 201 and create user when given email is unique", async () => {

        const body = {
            email: "pedroa@gmail.com",
            password: faker.internet.password(6)
        };

        const response = await api.post("/logIn").send(body);

        expect(response.status).toBe(httpStatus.OK);

    });

});