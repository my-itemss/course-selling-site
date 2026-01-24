require("dotenv-flow").config();

const express = require("express");
const path = require("path");

const connectDB = require("./config/db");

const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");
const courseRoutes = require("./routes/course");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/course", courseRoutes);

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("Server worksss");
  });
});
