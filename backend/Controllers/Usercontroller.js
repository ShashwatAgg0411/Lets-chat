const asyncHandler = require("express-async-handler")
const User = require("../models/UserModel");
const generateToken = require("../Utils/generateToken");

const Signinuser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("please enter all the fields");
  }

  let userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    res.json({
      message: "User already exists",
    });
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email, password });

  if (user) {
    console.log("user registered succesfully")
    res.status(201).json({
      user: {
      _id: user._id,
      name: user.name,
      email: user.email
    },
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    res.json({
      message: "Some error Occured",
    });
    throw new Error("Some error Occured");
  }
})  ;

const Loginuser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email })
  
  if (!user) {
    res.status(400);
    res.json({
      message: "User doesn't exists",
    });
    throw new Error("User doesn't exists")
  }

  if (user.password === password) {
    console.log("user logged in successfully")
    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token: generateToken(user._id)
    })
  } else {
    res.status(400);
    res.json({
      message: "Incorrect Password",
    });
    throw new Error("Incorrect Password")
  }
})

module.exports = {Signinuser, Loginuser};
