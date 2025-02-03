require("dotenv").config();
const express = require("express");
const app = express();
const authRoute = require("./router/auth-router");
const serviceRoute = require("./router/service-router")
const contactRoute = require("./router/contact-router")
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");
const cors = require("cors")

const corsOption = {
    origin : "http://localhost:5173",
    methods : "GET,POST,PUT,PATCH,HEAD",
    credentials : true,
}
app.use(cors(corsOption));

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);

app.use(errorMiddleware);


const PORT = process.env.PORT ||3000;

connectDb().then(() => {
    app.listen(PORT, () =>{
        console.log(`server is running at port ${PORT}`)
    });
})


