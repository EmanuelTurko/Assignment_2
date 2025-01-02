import appInit from './server';
const port = process.env.PORT;

const Run = async () => {
    const app = await appInit();
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};
Run().then(() => console.log("Server started")).catch(err => console.error(err));

//TODO Create users model,controller and routes
//TODO create auth-tests using jest
//TODO create jwt token for authentication
//TODO document the api using swagger