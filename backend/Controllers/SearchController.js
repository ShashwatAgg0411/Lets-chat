const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");

const SeachUsers = asyncHandler(async (req, res) => {
  let searchQuery = req.query.q;
  let c_id = req.query.id;
  let resp;
  if (!searchQuery || !c_id) {
    res.status(400)
    res.json({
      message: "please enter something to search"
    })
    throw new Error("please enter something to search")
  }
    try {
        resp = await User.find({
          $or: [
            {
              name: {
                $regex: searchQuery,
                $options: "i",
              },
            },
            {
              email: {
                $regex: searchQuery,
                $options: "i",
              },
            },
          ],
        }).select("-password");
      resp = resp.filter((u)=>(u._id!=c_id))
    } catch (err) {
          res.status(400);
          res.json({
            message: "Some error occured, please try again",
          });
          throw new Error("Some error occured, please try again");
    }
    // console.log("search re", resp)

  res.status(200).json(resp);
});

module.exports = SeachUsers;
