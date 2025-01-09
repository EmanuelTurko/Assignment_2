import request from "supertest";
import mongoose from "mongoose";
import { Express } from "express";
import appInit from "../server";
import post_model from "../Models/post_model";
import user_model from "../Models/user_model";


let app: Express;


type User = {
    username: string;
    email: string;
    password: string;
    token?: string;
    _id?: string;
}
const testUser: User = {
    username: "emanuel",
    email: "test@test.com",
    password: "123456",
}

beforeAll(async () => {
    app = await appInit();
    await post_model.deleteMany();
    await user_model.deleteMany();
    await request(app).post("/auth/register").send(testUser);
    const response = await request(app).post("/auth/login").send(testUser);
    testUser.token = response.body.token;
    testUser._id = response.body._id;
    console.log("App initialized");
});
afterAll(async () => {
    await mongoose.connection.close();
    console.log("App closed");
});

const baseUrl = "/posts";

type Post = {
    title: string,
    content: string;
    owner: string;
}
let postId = "";
const testPost: Post = {
    title: "First post",
    content: "This is the first post",
    owner: "emanuel",
}

describe("Post test suite", () => {
    test("test No Posts", async () => {
        const response = await request(app).get(baseUrl);
        expect(response.body.length).toBe(0);
        expect(response.statusCode).toBe(200);
    });
    test("Post test creation", async () => {
        const response = await request(app).post(baseUrl).
            set("Authorization", "JWT"+testUser.token)
            .send(testPost);
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe(testPost.title);
        expect(response.body.content).toBe(testPost.content);
        expect(response.body.owner).toBe(testUser.username);
        postId = response.body._id;
        console.log(response.body)
    });
    test("Post invalid Post", async () => {
        const response = await request(app).post(baseUrl).
            set("Authorization", "JWT" + testUser.token)
            .send({ title: "Second post" });
        expect(response.statusCode).not.toBe(200);
    });
    test("Post get all posts after injecting post", async () => {
        const response = await request(app).get(baseUrl);
        expect(response.statusCode).toBe(200);
        console.log(response.body);
    });
    test("Post get all posts by owner", async () => {
        const response = await request(app).get(baseUrl+"?owner="+testUser.username);
        expect(response.statusCode).toBe(200);
        expect(response.body.length).not.toBe(0);
    });
    test("Post get post by id", async () => {
        const response = await request(app).get(baseUrl+"/"+postId);
        console.log(postId);
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe(testPost.title);
    });
    test("Post get post by invalid id", async () => {
        const response = await request(app).get(baseUrl +"/" +"67759d86c45f7a066fb98689");
        expect(response.statusCode).toBe(404);
    });
    test("Post update post", async () => {
        const response = await request(app).put(baseUrl + "/" + postId).
            set("Authorization", "JWT" + testUser.token)
            .send({ title: "Updated post" });
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe("Updated post");
    });
});