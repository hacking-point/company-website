const Otp = require("../models/otp");
const User = require("../models/user");
const mail = require("../utils/mail");
const {formatOfError}=require("..//utils/valdation")

module.exports = async (email) => {
  try {
    const user = await User.findOne({ email }).lean().exec();
    if (!user) {
      throw new Error("User not found");
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    
    const otpData = await Otp.create({
      otp: otp,
      userId: user._id,
      expiresAt: new Date(Date.now() + 600000)
    });

    const {message} = await mail(user, otp);
  

    return {
      
      message,
      userId: otpData.userId,
    };
    
  } catch (error) {
    throw new Error(`Failed to send email: ${formatOfError(error)}`);
  }
};