const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  await User.create({ email, password: hashed });
  res.json({ message: "User created" });
};
