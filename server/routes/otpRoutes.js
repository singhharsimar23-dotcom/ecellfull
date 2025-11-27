/**
 * OTP Routes
 * /api/otp
 */

const express = require('express');
const router = express.Router();
const { sendOTP, verifyOTPAndRegister, resendOTP } = require('../controllers/otpController');

// POST /api/otp/send - Send OTP to email
router.post('/send', sendOTP);

// POST /api/otp/verify - Verify OTP and complete registration
router.post('/verify', verifyOTPAndRegister);

// POST /api/otp/resend - Resend OTP
router.post('/resend', resendOTP);

module.exports = router;

