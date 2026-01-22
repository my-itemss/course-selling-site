const express = require("express");
const mongoose = require("mongoose");
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");

const app = express();

app.use("/api/v1/user" , userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/0/admin", adminRouter);

async function main(){
await mongoose.connect("mongodb+srv://arijit123roy098_db_user:arijit123roy098_db_user@cluster0.g1habdp.mongodb.net/courseapp")
app.listen(3000);
console.log("connected to")

}

main()