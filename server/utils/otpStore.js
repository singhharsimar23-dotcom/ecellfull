/**
 * In-memory OTP Store
 * Stores OTPs with expiration (5 minutes)
 * No database required
 */

const otpStore = new Map();
const OTP_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Generate a 6-digit OTP
 */
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Store OTP for an email with user data
 * @param {string} email 
 * @param {object} userData - { name, email, password, rollNumber }
 */
const storeOTP = (email, userData) => {
  const otp = generateOTP();
  const expiresAt = Date.now() + OTP_EXPIRY_MS;
  
  otpStore.set(email.toLowerCase(), {
    otp,
    userData,
    expiresAt,
    attempts: 0
  });
  
  // Auto-cleanup after expiry
  setTimeout(() => {
    otpStore.delete(email.toLowerCase());
  }, OTP_EXPIRY_MS + 1000);
  
  return otp;
};

/**
 * Verify OTP for an email
 * @param {string} email 
 * @param {string} otp 
 * @returns {object} { valid: boolean, userData?: object, message?: string }
 */
const verifyOTP = (email, otp) => {
  const record = otpStore.get(email.toLowerCase());
  
  if (!record) {
    return { valid: false, message: 'OTP expired or not found. Please request a new one.' };
  }
  
  if (Date.now() > record.expiresAt) {
    otpStore.delete(email.toLowerCase());
    return { valid: false, message: 'OTP has expired. Please request a new one.' };
  }
  
  record.attempts += 1;
  
  if (record.attempts > 5) {
    otpStore.delete(email.toLowerCase());
    return { valid: false, message: 'Too many attempts. Please request a new OTP.' };
  }
  
  if (record.otp !== otp) {
    return { valid: false, message: 'Invalid OTP. Please try again.' };
  }
  
  // OTP is valid - get user data and delete the record
  const userData = record.userData;
  otpStore.delete(email.toLowerCase());
  
  return { valid: true, userData };
};

/**
 * Check if OTP exists for email (for resend logic)
 */
const hasOTP = (email) => {
  return otpStore.has(email.toLowerCase());
};

/**
 * Delete OTP for email
 */
const deleteOTP = (email) => {
  otpStore.delete(email.toLowerCase());
};

module.exports = {
  generateOTP,
  storeOTP,
  verifyOTP,
  hasOTP,
  deleteOTP
};

