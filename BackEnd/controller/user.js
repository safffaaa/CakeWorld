const User = require("../schema/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/profile') 
    },
    filename: function (req, file, cb) {
      const filename = Date.now() + '-' + file.fieldname
      cb(null, filename)
    }
  })
  
  const upload = multer({ storage: storage })

const userSignUp = async (req, res) => {

  const { email, password, username } = req.body;

  if (!username ||!email || !password) {
    return res.status(400).json({ message: "Please fill in all fields!" });
  }

  const existUser = await User.findOne({username})
  if (existUser) {
    return res.status(400).json({ message: "Username already exists!" });
  }

  const existEmail = await User.findOne({ email });
  if (existEmail) {
    return res.status(400).json({ message: "Email already exists!" });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    username,
    email,
    password: hashPassword,
  });

  await newUser.save();

  const token = jwt.sign({ email, id: newUser._id }, process.env.JWT_TOKEN, {
    expiresIn: "1hr",
  })
  return res.status(200).json({ token, user:newUser });
};


const userLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "fill in the all fields" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    
    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch) {
        return res.status(400).json({ message: "Invalide credentials!" });
      }
  
      const token = jwt.sign({ email, id: user._id }, process.env.JWT_TOKEN, {
        expiresIn: "1hr",
      });
      return res.status(200).json({ token, user });
};


const getUser = async (req, res) => {
  try {
      const user = await User.findById(req.params.id);
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }
      res.json(user); 
  } catch (error) {
      res.status(500).json({ message: "Server error", error });
  }
};

const uploadProfilePicture = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded!" });
    }

    // Update user profile picture in the database
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profileImage: `/profile/${req.file.filename}` }, // Save only the path
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.json({ message: "Profile picture updated successfully!", user: updatedUser });
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    res.status(500).json({ message: "Server error", error });
  }
};


module.exports = { userSignUp, userLogin, getUser , upload ,uploadProfilePicture};
