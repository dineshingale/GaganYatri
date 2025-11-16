// server/server.js

import dotenv from 'dotenv';
// Load environment variables BEFORE any other code runs
dotenv.config();

import express from 'express';
import cors from 'cors';
import bookingRouter from './api/booking.js';
import sgMail from '@sendgrid/mail'; // **NEW IMPORT**

// **NEW: Set SendGrid API Key after environment variables are loaded**
if (process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    console.log("SendGrid API Key set successfully.");
} else {
    console.error("FATAL ERROR: SENDGRID_API_KEY is not defined.");
}

// Create the Express app
const app = express();

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- API Routes ---
app.use('/api/booking', bookingRouter);

// --- Start the Server ---
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running successfully on port ${PORT}`);
});