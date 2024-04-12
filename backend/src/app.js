const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("../Utils/connectDB");
const { Signinuser, Loginuser } = require("../Controllers/Usercontroller");
const SeachUsers = require("../Controllers/SearchController");
const {
  GetAllChats,
  getorCreateChat,
  createGroupChat,
  getAllMesages,
} = require("../Controllers/ChatController");
const sendMessage = require("../Controllers/MessagesController");

dotenv.config({path:'../.env'});
console.log(process.env.PORT)
connectDB();
const app = express();

app.use(cors());
app.use(express.json());

app.post("/user/signup", Signinuser);
app.post("/user/login", Loginuser);
app.get("/search", SeachUsers);
// app.post("/chat/create", CreateChat)
app.post("/chat/allchats", GetAllChats); // gets all chats for a user
app.post("/chat/getorCreateChat", getorCreateChat); //gets the chat between two users, and if not present,creates one
app.post("/chat/createGroup", createGroupChat);
app.get("/chat/getAllMessages/:chatId", getAllMesages);
app.post("/message/send", sendMessage);

//--------DEPLOYMENT---------
const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "./frontend/build")));
  app.get("*", (req, res) => {
    // console.log(__dirname1)
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("The api is running seccessfully");
  });
}
//--------DEPLOYMENT---------

let port_no = process.env.PORT;
const server = app.listen(port_no, () => {
  console.log(`Example app listening on port 3001`);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    // origin: "http://localhost:3000",
    origin: "*"
  },
  connectionStateRecovery: {},
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");

  socket.on("setup", (userData) => {
    // console.log(userData)
    socket.join(userData._id);
    console.log("user setup", userData._id);
    socket.emit("connected");
  });
  // socket.off("setup", (userData) => {
  //   console.log("USER DISCONNECTED");
  //   socket.leave(userData._id);
  // });
  socket.on("disconnect", () => {
    // socket.leave(socket.id);
    socket.disconnect();
    console.log(socket.id);
    console.log("USER DISCONNECTED IN DISCONNECT");
  });
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("user joined the room", room);
  });

  socket.on("new message", (msgs) => {
    // console.log("msgs:",msgs)
    let newMessage = msgs.newMessage;
    var chattarget = msgs.chat;

    if (!chattarget.users) {
      return console.log("chat.users is not defined");
    }

    chattarget.users.forEach((user) => {
      console.log("user_id", user._id);
      if (user._id === newMessage.sender._id) {
        return;
      } else {
        socket.in(user._id).emit("new message recieved", msgs);
      }
    });
    // console.log("recieved objects", msg.newMessage, msg.chat)
  });
});
