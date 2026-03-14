const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

let pendingUsers = {}; // temporary storage


// REGISTER USER (SEND OTP)
const registerUser = async (req, res) => {

  try {

    const { username, name, email, password, bio } = req.body;

    // USERNAME VALIDATION
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;

    if (!usernameRegex.test(username)) {
      return res.status(400).json({
        message: "Username must be 3-20 characters and contain only letters, numbers or _"
      });
    }

    // PASSWORD VALIDATION
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be 8+ characters with uppercase, lowercase, number and special character"
      });
    }

    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return res.status(400).json({
        message: "Email already registered"
      });
    }

    const usernameExists = await User.findOne({ username });

    if (usernameExists) {
      return res.status(400).json({
        message: "Username already taken"
      });
    }

    // HASH PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // GENERATE OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    pendingUsers[email] = {
      username,
      name,
      email,
      password: hashedPassword,
      bio,
      otp,
      otpExpires: Date.now() + 10 * 60 * 1000
    };

    await sendEmail(
      email,
      "Hidden Hunt Email Verification",
      `Your verification OTP is: ${otp}`
    );

    res.status(200).json({
      message: "OTP sent to email",
      email
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};


// VERIFY OTP AND CREATE USER
const verifyOtp = async (req, res) => {

  try {

    const { email, otp } = req.body;

    const pendingUser = pendingUsers[email];

    if (!pendingUser) {
      return res.status(400).json({
        message: "Signup session expired. Please signup again."
      });
    }

    if (
      pendingUser.otp !== otp ||
      pendingUser.otpExpires < Date.now()
    ) {
      return res.status(400).json({
        message: "Invalid or expired OTP"
      });
    }

    const newUser = await User.create({
      username: pendingUser.username,
      name: pendingUser.name,
      email: pendingUser.email,
      password: pendingUser.password,
      bio: pendingUser.bio,
      isVerified: true
    });

    delete pendingUsers[email];

    res.json({
      message: "Email verified successfully",
      userId: newUser._id
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};


// RESEND OTP
const resendOtp = async (req, res) => {

  try {

    const { email } = req.body;

    const pendingUser = pendingUsers[email];

    if (!pendingUser) {
      return res.status(400).json({
        message: "Signup session expired"
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    pendingUser.otp = otp;
    pendingUser.otpExpires = Date.now() + 10 * 60 * 1000;

    await sendEmail(
      email,
      "Hidden Hunt Email Verification",
      `Your new OTP is: ${otp}`
    );

    res.json({
      message: "OTP resent successfully"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};


// LOGIN USER
const loginUser = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};


module.exports = {
  registerUser,
  verifyOtp,
  resendOtp,
  loginUser
};