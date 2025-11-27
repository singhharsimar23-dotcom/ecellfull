/**
 * OTP Controller
 * Handles sending and verifying OTPs
 */

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { storeOTP, verifyOTP, hasOTP } = require('../utils/otpStore');
const { sendOTPEmail } = require('../utils/emailService');

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

/**
 * Send OTP to email
 * POST /api/otp/send
 */
exports.sendOTP = async (req, res) => {
  try {
    const { name, email, password, rollNumber } = req.body;

    // Validation
    if (!name || !email || !password || !rollNumber) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Validate @vitbhopal.ac.in email
    if (!email.toLowerCase().endsWith('@vitbhopal.ac.in')) {
      return res.status(400).json({
        success: false,
        message: 'Only @vitbhopal.ac.in email addresses are allowed'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email: email.toLowerCase() }, { rollNumber }] 
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email or roll number already exists'
      });
    }

    // Store OTP with user data
    const otp = storeOTP(email, { name, email, password, rollNumber });

    // Send OTP email
    await sendOTPEmail(email, otp, name);

    res.status(200).json({
      success: true,
      message: 'OTP sent successfully to your email'
    });

  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to send OTP'
    });
  }
};

/**
 * Verify OTP and complete registration
 * POST /api/otp/verify
 */
exports.verifyOTPAndRegister = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Validation
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Email and OTP are required'
      });
    }

    // Verify OTP
    const result = verifyOTP(email, otp);

    if (!result.valid) {
      return res.status(400).json({
        success: false,
        message: result.message
      });
    }

    // OTP is valid - create the user
    const { name, password, rollNumber } = result.userData;

    // Double-check user doesn't exist (race condition prevention)
    const existingUser = await User.findOne({ 
      $or: [{ email: email.toLowerCase() }, { rollNumber }] 
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email or roll number already exists'
      });
    }

    // Create user
    const user = new User({ 
      name, 
      email: email.toLowerCase(), 
      password, 
      rollNumber 
    });
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Email verified and registration successful!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        rollNumber: user.rollNumber,
        memberId: user.memberId
      }
    });

  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Verification failed'
    });
  }
};

/**
 * Resend OTP
 * POST /api/otp/resend
 */
exports.resendOTP = async (req, res) => {
  try {
    const { name, email, password, rollNumber } = req.body;

    // Validation
    if (!name || !email || !password || !rollNumber) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Validate @vitbhopal.ac.in email
    if (!email.toLowerCase().endsWith('@vitbhopal.ac.in')) {
      return res.status(400).json({
        success: false,
        message: 'Only @vitbhopal.ac.in email addresses are allowed'
      });
    }

    // Store new OTP (overwrites existing)
    const otp = storeOTP(email, { name, email, password, rollNumber });

    // Send OTP email
    await sendOTPEmail(email, otp, name);

    res.status(200).json({
      success: true,
      message: 'New OTP sent successfully'
    });

  } catch (error) {
    console.error('Resend OTP error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to resend OTP'
    });
  }
};

