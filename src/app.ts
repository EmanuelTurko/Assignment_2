import appInit from './server';
const port = process.env.PORT;

const Run = async () => {
    const app = await appInit();
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};
Run().then(() => console.log("Server started")).catch(err => console.error(err));

//TODO Create users model,auth controller and routes ✅ - refresh left
//TODO create jwt token for authentication ✅
//TODO create auth-tests using jest - refresh tests and global coverage ✅
//TODO create post-tests using jest ✅
//TODO create comment-tests using jest
//TODO document the api using swagger