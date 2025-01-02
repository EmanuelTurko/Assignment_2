import request from 'supertest';
import mongoose from 'mongoose';
import {Express} from 'express';
import appInit from "../server";
import user_model from "../Models/user_model";

let app: Express;

beforeAll(async () => {
    app = await appInit();
    await user_model.deleteMany();
    console.log("App initialized");
});
afterAll(async () => {
    await mongoose.connection.close();
     console.log("App closed");
});

const baseUrl = "/auth";

type User={
    username: string,
    email: string;
    password: string;
    accessToken?: string;
    refreshToken?: string;
    _id?: string;
}
const testUser : User = {
    username : "emanuel",
    email : "XXXX@gmail.com",
    password : "123456",
}

describe("Auth test suite", () => {

    test("Auth test registration", async () => {
     const response = await request(app).post("/auth/register").send(testUser);
        expect(response.statusCode).toBe(200);
        console.log(response.body);
    });
  test("Auth test registration no @ in email", async () => {
        const response = await request(app).post(baseUrl+"/register").send({
            username: "emanuel",
            email: "sdfsadaf",
            password: "123456",
        });
        expect(response.statusCode).not.toBe(200);
    });

    test("Auth test registration no password", async () => {
        const response = await request(app).post(baseUrl + "/register").send({
            email: "sdfsadaf",
        });
        expect(response.statusCode).not.toBe(200);
    });

    test("Auth test registration email already exist", async () => {
        const response = await request(app).post(baseUrl + "/register").send(testUser);
        expect(response.statusCode).not.toBe(200);
    });

    test("Auth test login", async () => {
        const response = await request(app).post(baseUrl + "/login").send(testUser);
        expect(response.statusCode).toBe(200);
        const accessToken = response.body.accessToken;
        const refreshToken = response.body.refreshToken;
        const _id = response.body._id;
        expect(accessToken).toBeDefined();
        expect(refreshToken).toBeDefined();
        expect(_id).toBeDefined();
        testUser.accessToken = accessToken;
        testUser.refreshToken = refreshToken;
        testUser._id = _id;
    });
    test("Auth test login invalid credentials", async () => {
        const response = await request(app).post(baseUrl + "/login").send({
            username: "emanuel",
            password: "1234567",
        });
        expect(response.statusCode).not.toBe(200);
    });
    test("Auth test logout", async () => {
        const response = await request(app).post(baseUrl + "/logout").send({
                refreshToken: testUser.refreshToken,
            }
        );
        console.log(response.body);
        expect(response.statusCode).toBe(200);
    });
    test("Auth test Logout invalidate refresh token", async () => {
        const response = await request(app).post(baseUrl + "/logout").send({
            refreshToken: testUser.refreshToken,
        });
        expect(response.statusCode).not.toBe(200);
    });
});