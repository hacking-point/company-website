const User = require("../models/user");
const { formatOfError } = require("../utils/valdation");
const { newToken } = require("../utils/token");
const sendOtp = require("./otp"); // 💥 Change this (assuming you export sendOtp separately)
const OtpSchema = require("../models/otp");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Register = async (req, res) => {
  try {
    let existingUser = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }]
    });

    if (existingUser) {
      const field = existingUser.email === req.body.email ? "email" : "username";
      return res.status(409).json({ message: `${field} already exists` });
    }

    let user;
    if (req.originalUrl === "/admin/auth/register") {
      user = await User.create({ ...req.body, isAdmin: true });
    } else {
      user = await User.create(req.body);
    }
    return res.status(201).json(user);
  } catch (err) {
    return formatOfError(err, res);
  }
};

const Login = async (req, res) => {
  try {
    let user = await User.findOne({ $or: [{ email: req.body.email }, { username: req.body.username }] });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Password incorrect" });
    }
    const mail = await sendOtp(user.email); // 🛠 Use sendOtp here
    return res.status(200).send(mail);
  } catch (err) {
    return formatOfError(err, res);
  }
};

const OtpVerification = async (req, res) => {
  try {
    const { id } = req.params;
    const { otp: userOtp } = req.body;
    const otpData = await OtpSchema.findOne({ userId: new mongoose.Types.ObjectId(id) }).sort({ createdAt: -1 });

    if (!otpData) {
      return res.status(404).json({ message: "No OTP found for this user." });
    }

    const { otp: hashOtp, expiresAt } = otpData;

    if (new Date(expiresAt).getTime() < new Date().getTime()) {
      await OtpSchema.deleteMany({ userId: new mongoose.Types.ObjectId(id) });
      return res.status(401).json({ message: "OTP expired" });
    }

    const isOtpValid = await bcrypt.compare(userOtp, hashOtp); // ✅ Correct way
    if (!isOtpValid) {
      return res.status(404).json({ message: "OTP is incorrect" });
    }

    await OtpSchema.deleteMany({ userId: new mongoose.Types.ObjectId(id) });
    const user = await User.findByIdAndUpdate(id, { isVerified: true }, { new: true });

    const token = newToken(user);

    const safeUser = {
      _id: user._id,
      email: user.email,
      username: user.username,
      isAdmin: user.isAdmin,
      isVerified: user.isVerified,
    };

    return res.status(200).json({ message: "Your OTP verification was successful.", user: safeUser, token });
  } catch (err) {
    return formatOfError(err, res);
  }
};

const ResendOtp = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const mail = await sendOtp(user.email); // 🛠 Use sendOtp here
    return res.status(200).json(mail);
  } catch (err) {
    return formatOfError(err, res);
  }
};

const ForgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ $or: [{ email: req.body.email }, { username: req.body.username }] }).lean().exec();
    if (!user) {
      return res.status(404).json({ message: "User not Found" });
    }
    const mail = await sendOtp(user.email); // 🛠 Use sendOtp here
    return res.status(200).json(mail);
  } catch (err) {
    return formatOfError(err, res);
  }
};

const ResetPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).lean().exec();
    if (!user) {
      return res.status(404).json({ message: "User not Found" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10); // ✅ Hashing added
    await User.findByIdAndUpdate(id, { password: hashedPassword });
    return res.status(200).send({ message: "Password reset successfully" });
  } catch (err) {
    return formatOfError(err, res);
  }
};

module.exports = { Register, Login, OtpVerification, ResendOtp, ForgotPassword, ResetPassword };
