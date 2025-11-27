# OTP Email Setup Guide

## Gmail App Password Setup (Required)

To send OTP emails, you need to configure Gmail with an App Password.

### Step 1: Enable 2-Step Verification on Gmail

1. Go to your Google Account: https://myaccount.google.com/
2. Click "Security" in the left sidebar
3. Under "How you sign in to Google", click "2-Step Verification"
4. Follow the steps to enable 2-Step Verification

### Step 2: Create App Password

1. Go to: https://myaccount.google.com/apppasswords
2. Select app: "Mail"
3. Select device: "Other (Custom name)"
4. Enter name: "E-Cell Portal"
5. Click "Generate"
6. **Copy the 16-character password** (looks like: `xxxx xxxx xxxx xxxx`)

### Step 3: Add Environment Variables

Add these to your `server/.env` file:

```env
# Existing variables
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

# NEW: Email configuration for OTP
EMAIL_USER=your.email@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx
```

**Important:**
- `EMAIL_USER`: Your Gmail address (the one you created the App Password for)
- `EMAIL_PASS`: The 16-character App Password (NOT your regular Gmail password)
- Remove spaces from the App Password when pasting

### Step 4: Deploy to Render

Add these environment variables in Render dashboard:
1. Go to your Render service
2. Click "Environment"
3. Add:
   - `EMAIL_USER` = your Gmail address
   - `EMAIL_PASS` = your App Password (no spaces)

### Step 5: Install nodemailer

```bash
cd server
npm install nodemailer
```

Or if deploying, just push the updated `package.json` and Render will install it.

## Testing Locally

1. Make sure your `.env` has the email credentials
2. Restart your server: `npm run dev`
3. Go to http://localhost:5173/register
4. Enter a `@vitbhopal.ac.in` email
5. You should receive the OTP email!

## How It Works

### Flow:
1. User fills registration form with `@vitbhopal.ac.in` email
2. Clicks "Continue with OTP"
3. Server validates email, stores user data temporarily in memory
4. Server sends 6-digit OTP via Gmail
5. User enters OTP on verification page
6. Server verifies OTP and creates the user account
7. User is automatically logged in and redirected to dashboard

### Security Features:
- Only `@vitbhopal.ac.in` emails allowed
- OTP expires in 5 minutes
- Maximum 5 verification attempts per OTP
- OTPs stored in memory (auto-cleaned)
- Beautiful HTML email template

## Troubleshooting

### "Failed to send verification email"
- Check EMAIL_USER and EMAIL_PASS in `.env`
- Make sure you're using App Password, not regular password
- Ensure 2-Step Verification is enabled on Gmail

### "Only @vitbhopal.ac.in email addresses are allowed"
- This is intentional! Only VIT Bhopal emails can register

### "OTP expired or not found"
- OTPs expire after 5 minutes
- Click "Resend OTP" to get a new one

### Email going to spam?
- This is normal for new senders
- Users should check their spam folder
- Over time, Gmail will learn and deliver to inbox

## Files Added/Modified

### New Files (Backend):
- `server/utils/otpStore.js` - In-memory OTP storage
- `server/utils/emailService.js` - Nodemailer + Gmail
- `server/controllers/otpController.js` - OTP logic
- `server/routes/otpRoutes.js` - API routes

### New Files (Frontend):
- `client/src/pages/VerifyOTP.jsx` - OTP verification page

### Modified Files (Minimal Changes):
- `server/package.json` - Added nodemailer dependency
- `server/server.js` - Added one line for OTP routes
- `client/src/services/dataService.js` - Added OTP API functions
- `client/src/router/AppRouter.jsx` - Added /verify-otp route
- `client/src/pages/Register.jsx` - Email validation + redirect to OTP

### Unchanged Files:
- Login page ✓
- Dashboard page ✓
- Auth controller ✓
- All other existing functionality ✓

