const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const otpSchema = new mongoose.Schema({
  otp: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[0-9]{4}$/.test(v); // ✅ exactly 4 digits
      },
      message: (props) => `OTP should be exactly 4 digits. You entered ${props.value}`,
    },
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true,
  versionKey: false,
});

otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

otpSchema.pre("save", async function (next) {
  if (!this.isModified('otp')) return next();
  try {
    this.otp = await bcrypt.hash(this.otp, 10);
    next();
  } catch (error) {
    next(error);
  }
});

otpSchema.methods.compareOtp = async function (otp) {
  return await bcrypt.compare(otp, this.otp);
};

module.exports = mongoose.model("Otp", otpSchema);
