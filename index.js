const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");

const app = express();

app.use(
    cors({
        origin: "*",
    })
);

dotenv.config();

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log("Server is connected to database");
    } catch (err) {
        console.log("Server is not connect to the database", err.message);
    }
}

connectDB();
app.use(express.json());
app.get("/", (req, res) => {
    res.send("API is running543..")
});

app.use("/user", userRoutes);
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("Server is running.."));