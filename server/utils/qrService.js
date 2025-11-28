/**
 * QR Code Service
 * Generates QR codes and signs payloads with HMAC SHA256
 */

const crypto = require('crypto');
const QRCode = require('qrcode');

/**
 * Generate HMAC SHA256 signature for ticket payload
 * @param {object} payload - Ticket data
 * @returns {string} - Signature
 */
const generateSignature = (payload) => {
  const secret = process.env.QR_SECRET;
  if (!secret) {
    throw new Error('QR_SECRET environment variable is not set');
  }

  // Create string from sorted keys for consistent signing
  const payloadString = JSON.stringify(payload, Object.keys(payload).sort());
  const signature = crypto.createHmac('sha256', secret)
    .update(payloadString)
    .digest('hex');
  
  return signature;
};

/**
 * Verify signature for ticket payload
 * @param {object} payload - Ticket data
 * @param {string} providedSignature - Signature to verify
 * @returns {boolean} - True if valid
 */
const verifySignature = (payload, providedSignature) => {
  try {
    const expectedSignature = generateSignature(payload);
    return crypto.timingSafeEqual(
      Buffer.from(expectedSignature),
      Buffer.from(providedSignature)
    );
  } catch (error) {
    return false;
  }
};

/**
 * Generate QR code data URL from payload
 * @param {object} payload - Ticket payload to encode
 * @returns {Promise<string>} - Base64 data URL of QR code
 */
const generateQRCode = async (payload) => {
  try {
    const payloadString = JSON.stringify(payload);
    const qrDataURL = await QRCode.toDataURL(payloadString, {
      errorCorrectionLevel: 'M',
      type: 'image/png',
      quality: 0.92,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      },
      width: 400
    });
    return qrDataURL;
  } catch (error) {
    throw new Error('Failed to generate QR code: ' + error.message);
  }
};

/**
 * Create signed ticket payload
 * @param {string} ticketId - Ticket ID
 * @param {string} email - Email
 * @param {Date} createdAt - Creation timestamp
 * @returns {object} - Signed payload
 */
const createSignedPayload = (ticketId, email, createdAt) => {
  const payload = {
    ticketId,
    email,
    createdAt: createdAt.toISOString()
  };
  
  const signature = generateSignature(payload);
  
  return {
    ...payload,
    signature
  };
};

module.exports = {
  generateSignature,
  verifySignature,
  generateQRCode,
  createSignedPayload
};

