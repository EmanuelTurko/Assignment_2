import request from "supertest";
import mongoose from "mongoose";
import { Express } from "express";
import appInit from "../server";
import comment_model from "../Models/comment_model";
import post_model from "../Models/post_model";
import user_model from "../Models/user_model";

let app : Express;

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
const testPost ={
    title: "First post",
    content: "This is the first post",
    owner: "emanuel",
}
let post_id ="";
const testComment = {
    content: "This is a comment",
    owner: "emanuel",
    postId: post_id,
}
let commentId = "";
beforeAll(async () => {
    app = await appInit();
    await comment_model.deleteMany();
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

describe("Comment test suite", () => {
    test("Comment empty comments test", async () => {
        const responsePost = await request(app).post("/posts")
            .set("Authorization", "jwt "+testUser.token)
            .send(testPost)
        post_id = responsePost.body._id;
        const response = await request(app)
            .get("/posts/"+post_id+"/comments");
        expect(response.body.length).toBe(0);
        expect(response.statusCode).toBe(200);
    });
    test("Comment creation", async () => {
        testComment.postId = post_id;
        const response = await request(app).post("/posts/"+post_id+"/comments")
            .send(testComment);
        console.log(response.body);
        console.log(testComment.postId);
        expect(response.statusCode).toBe(200);
        expect(response.body.content).toBe(testComment.content);
        expect(response.body.owner).toBe(testComment.owner);
        commentId = response.body._id;
        console.log(response.body);
    });
    test("Comment get all comments", async () => {
        const response = await request(app).get("/posts/"+post_id+"/comments");
        expect(response.body.length).toBe(1);
        expect(response.statusCode).toBe(200);
    });
    test("Comment invalid comment", async () => {
        const response = await request(app).post("/posts/"+post_id+"/comments")
            .send({
                owner: "emanuel",
            });
        expect(response.statusCode).not.toBe(200);
    });
    test("Comment update comment", async () => {
        const response = await request(app).put("/posts/"+post_id+"/comments/"+commentId)
            .send({
                content: "This is a comment updated",
            });
        expect(response.statusCode).toBe(200);
        expect(response.body.content).toBe("This is a comment updated");
    });
    test("Comment delete comment", async () => {
        const response = await request(app).delete("/posts/"+post_id+"/comments/"+commentId);
        expect(response.statusCode).toBe(200);
        const response2 = await request(app).get("/posts/"+post_id+"/comments");
        expect(response2.body.length).toBe(0);
    });
});