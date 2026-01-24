const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateOtp = require("../utils/generateOtp");

exports.signup = async (req, res) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  await Admin.create({ email, password: hashed });
  res.json({ message: "Admin created" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });

  if (!admin) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const ok = await bcrypt.compare(password, admin.password);
  if (!ok) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
    expiresIn: "1d"
  });

  res.json({ message: "Login successful", token });
};

/* -------- OTP -------- */

exports.sendOtp = async (req, res) => {
  const { email } = req.body;
  const admin = await Admin.findOne({ email });

  if (!admin) {
    return res.status(404).json({ message: "User not found" });
  }

  const otp = generateOtp();
  admin.otp = otp;
  admin.otpExpiresAt = Date.now() + 5 * 60 * 1000;
  await admin.save();

  console.log("OTP:", otp);
  res.json({ message: "OTP sent" });
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const admin = await Admin.findOne({ email });

  if (
    !admin ||
    admin.otp !== otp ||
    admin.otpExpiresAt < Date.now()
  ) {
    return res.status(401).json({ message: "Invalid or expired OTP" });
  }

  admin.otp = null;
  admin.otpExpiresAt = null;
  admin.isVerified = true;
  await admin.save();

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
    expiresIn: "1d"
  });

  res.json({ message: "OTP verified", token });
};
