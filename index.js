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

app.use(express.json());

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
const server = app.listen(PORT, console.log("Server is running.."));

// const io = require("socket.io")(server, {
//     cors: {
//         origin: "*",
//     },
//     pingTimeout: 60000,
// });

// io.on("connection", (socket) => {
//     socket.on("setup", (user) => {
//         socket.join(user.data._id);
//         socket.emit("connected");
//     });

//     socket.on("join chat", (room) => {
//         socket.join(room);
//     });

//     socket.on("new message", (newMessageStatus) => {
//         var chat = newMessageStatus.chat;
//         if(!chat.users) {
//             return console.log("chat.users not defined");
//         }
//         chat.users.forEach((user) => {
//             if(user._id == newMessageStatus.sender._id) return;

//             socket.in(user._id).emit("message received", newMessageReceived);
//         });
//     });
// });