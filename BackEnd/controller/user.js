const User = require("../schema/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSignUp = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill in all fields!" });
  }
  const existEmail = await User.findOne({ email });
  if (existEmail) {
    return res.status(400).json({ message: "Email already exists!" });
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
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
    const userId = await User.findById(req.params.id)
    res.json({email:userId.email}) 
};

module.exports = { userSignUp, userLogin, getUser };
