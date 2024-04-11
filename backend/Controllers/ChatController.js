const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/UserModel");

// const CreateChat = asyncHandler(async (req, res) => {
//   const { cid, uid } = req.body;
//   let chat = {
//     name: "ONEONONECHAT",
//     isGrouChat: false,
//     users: [cid, uid],
//   };

//   let resp = await Chat.create(chat);
//   console.log(resp);
// });

const GetAllChats = asyncHandler(async (req, res) => {
    const { cid } = req.body;

    if (!cid) {
        res.status(400).json({
            message: "please enter complete details",
        });
        throw new Error("Incomplete details");
    } else { 
        try {
            let chats = await Chat.find({
                users: { $elemMatch: { $eq: cid } },
            })
                .populate("users", "-password")
                .populate("admin_id").populate("messages").sort({updatedAt: -1});
            // chats = await chats
          // console.log(chats);
          
            res.status(200).json(chats);
        } catch (err) {
            console.log(err)
            res.status(400).json({
              message: "some error occured",
            });
            throw new Error("some error occured");
        }
}
});

//getspecific chat

const getorCreateChat = asyncHandler(async (req, res) => {
  const { cid, uid } = req.body;
  if (!cid || !uid) {
    res.status(400).json({
      message: "please enter complete details",
    });
    throw new Error("Incomplete details");
  } else {
    try {
      let isChat = await Chat.find({
        isGroupChat: false,
        $or: [
          {
            users: {
              $eq: [cid, uid],
            },
          },
          {
            users: {
              $eq: [uid, cid],
            },
          },
        ],
      }).populate("users", "-password");
        // console.log("isChat line 70",isChat);

      if (isChat.length > 0) {
        res.status(200).json(isChat[0]);
      } else {
        let chat = {
          name: "ONEONONECHAT",
          isGrouChat: false,
          users: [cid, uid],
        };

        isChat = await Chat.create(chat);
          isChat = await isChat.populate("users", "-password");
        // console.log("isChat line 83", isChat);
          
        res.status(200).json(isChat);
      }
    } catch (err) {
        console.log(err)
      res.status(400).json({
        message: "some error occured",
      });
      throw new Error("some error occured");
    }
  }
});

const createGroupChat = asyncHandler(async(req, res)=> {
  const { cid, uids, name } = req.body
  if (!cid || !uids||!name) {
    res.status(400).json({
      message:"Incomplete details",
    })
    throw new Error("Incomplete details")
  }
  else if (uids.length <= 1) {
    res.status(400).json({
      message: "More than 2 people required for a group chat",
    });
  
    throw new Error("More than 2 people required for a group chat");

  }  
  else {
    try {
      let isChat = {
        name:name,
        isGroupChat: true,
        users: [cid, ...uids],
        admin_id: cid,
      }

      let savedChat = await Chat.create(isChat)
      savedChat = await savedChat.populate("users", "-password")
      savedChat = await savedChat.populate("admin_id", "-password")
      // console.log("saved chat", savedChat)
      res.status(200).json(savedChat)
      
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: "some error occured",
      });
      throw new Error("some error occured");
      
    }
  }

})

const getAllMesages = asyncHandler(async (req, res) => {
  let chat_id = req.params.chatId
  if (!chat_id) {
    res.status(400).json({
      message: "no chat selected"
    })
    throw new Error("chat_id not accessible")
  } else {
    try {
      let target_chat = await Chat.findById(chat_id)
      target_chat = await target_chat.populate("messages")
      target_chat = await User.populate(target_chat, {
        path: "messages.sender",
        select:"-password",
      })
      let allMessages = target_chat.messages
      // console.log("allmessages", allMessages)
      // res.send("success")
      res.status(200).json(allMessages)
      
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: "some error occured",
      });
      throw new Error("some error occured, cold not fetch all messages");
      
    }
  }

  // console.log(chat_id)

  // res.send("revc")
})

module.exports = {
  // CreateChat,
  GetAllChats,
  getorCreateChat,
  createGroupChat,
  getAllMesages,
};
