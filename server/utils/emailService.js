/**
 * Email Service using Resend.com
 * Uses EMAIL_PASS as Resend API key
 */

const { Resend } = require('resend');

const resend = new Resend(process.env.EMAIL_PASS);

/**
 * Send OTP email
 * @param {string} to - Recipient email
 * @param {string} otp - 6-digit OTP
 * @param {string} name - User's name
 */
const sendOTPEmail = async (to, otp, name) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'E-Cell VIT Bhopal <onboarding@resend.dev>',
      to: [to],
      subject: '🔐 Your E-Cell Verification Code',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #1a1a2e;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="100%" style="max-width: 500px;" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 20px; padding: 40px; border: 1px solid rgba(255,255,255,0.2);">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td align="center" style="padding-bottom: 30px;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">
                              <span style="color: #a78bfa;">E</span><span style="color: #14b8a6;">-Cell</span> VIT Bhopal
                            </h1>
                          </td>
                        </tr>
                        <tr>
                          <td align="center" style="padding-bottom: 20px;">
                            <p style="color: rgba(255,255,255,0.9); font-size: 18px; margin: 0;">
                              Hello <strong>${name}</strong>! 👋
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td align="center" style="padding-bottom: 30px;">
                            <p style="color: rgba(255,255,255,0.8); font-size: 16px; margin: 0;">
                              Your verification code is:
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td align="center" style="padding-bottom: 30px;">
                            <div style="background: rgba(255,255,255,0.15); border-radius: 12px; padding: 20px 40px; display: inline-block;">
                              <span style="color: #14b8a6; font-size: 36px; font-weight: 700; letter-spacing: 8px;">
                                ${otp}
                              </span>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td align="center" style="padding-bottom: 20px;">
                            <p style="color: rgba(255,255,255,0.7); font-size: 14px; margin: 0;">
                              This code expires in <strong>5 minutes</strong>.
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td align="center" style="padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1);">
                            <p style="color: rgba(255,255,255,0.5); font-size: 12px; margin: 0;">
                              If you didn't request this code, please ignore this email.
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `
    });

    if (error) {
      console.error('❌ Resend error:', error);
      throw new Error('Failed to send verification email. Please try again.');
    }

    console.log('📧 OTP email sent:', data.id);
    return { success: true, messageId: data.id };
  } catch (error) {
    console.error('❌ Email send error:', error.message);
    throw new Error('Failed to send verification email. Please try again.');
  }
};

module.exports = {
  sendOTPEmail
};
