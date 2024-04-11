const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const Chat = require("../models/chatModel");

const sendMessage = asyncHandler(async (req, res) => {
    const { sender_id, content, chat_id } = req.body
    if (!sender_id || !content || !chat_id) {
        res.status(400).json({
            message:"Incomplete details"
        })
        throw new Error(" all fields not present")
    }
    else {
        try {
            let msg = {
              sender: sender_id,
              content: content,
            };
            let msg1 = await Message.create(msg);
            msg1 = await msg1.populate("sender", "-password");
            console.log(msg1);

            let updchat = await Chat.findByIdAndUpdate(
              chat_id,
              {
                $push: { messages: msg1 },
              },
              { new: true }
            );
            console.log(updchat);
            res.status(200).json(msg1)
        } catch (err) {
            console.log(err);
            res.status(400).json({
              message: "some error occured",
            });
            throw new Error("some error occured, could not send message");
            
        }
    }
    
    
})

module.exports = sendMessage