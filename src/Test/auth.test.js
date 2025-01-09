"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
const server_1 = __importDefault(require("../server"));
const user_model_1 = __importDefault(require("../Models/user_model"));
let app;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    app = yield (0, server_1.default)();
    yield user_model_1.default.deleteMany();
    console.log("App initialized");
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
    console.log("App closed");
}));
const baseUrl = "/auth";
const testUser = {
    username: "emanuel",
    email: "XXXX@gmail.com",
    password: "123456",
};
describe("Auth test suite", () => {
    test("Auth test registration", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post("/auth/register").send(testUser);
        expect(response.statusCode).toBe(200);
        console.log(response.body);
    }));
    test("Auth test registration no @ in email", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post(baseUrl + "/register").send({
            username: "emanuel",
            email: "sdfsadaf",
            password: "123456",
        });
        expect(response.statusCode).not.toBe(200);
    }));
    test("Auth test registration no password", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post(baseUrl + "/register").send({
            email: "sdfsadaf",
        });
        expect(response.statusCode).not.toBe(200);
    }));
    test("Auth test registration email already exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post(baseUrl + "/register").send(testUser);
        expect(response.statusCode).not.toBe(200);
    }));
    test("Auth test login", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post(baseUrl + "/login").send(testUser);
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
    }));
    test("Auth test login invalid credentials", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post(baseUrl + "/login").send({
            username: "emanuel",
            password: "1234567",
        });
        expect(response.statusCode).not.toBe(200);
    }));
    test("Auth test logout", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post(baseUrl + "/logout").send({
            refreshToken: testUser.refreshToken,
        });
        console.log(response.body);
        expect(response.statusCode).toBe(200);
    }));
    test("Auth test Logout invalidate refresh token", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post(baseUrl + "/logout").send({
            refreshToken: testUser.refreshToken,
        });
        expect(response.statusCode).not.toBe(200);
    }));
});
