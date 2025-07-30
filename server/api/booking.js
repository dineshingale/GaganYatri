// server/api/booking.js
import express from 'express';
import { MongoClient } from 'mongodb';
import nodemailer from 'nodemailer';
import { EmailTemplate } from './EmailTemplate.js';

const router = express.Router();

router.post('/', async (req, res) => {
    // --- Configuration is now INSIDE the handler ---
    const uri = process.env.MONGODB_URI;

    // Add a direct check for the URI to be safe
    if (!uri) {
        console.error('FATAL ERROR: MONGODB_URI is not defined in .env file.');
        return res.status(500).json({ error: 'Server configuration error.' });
    }
  
    const client = new MongoClient(uri);

    try {
        // 1. Connect to the database for this specific request
        await client.connect();
        
        const bookingData = req.body;
        const { passengers } = bookingData;
        const leader = passengers.find(p => p.isLeader);

        if (!leader) {
            return res.status(400).json({ error: 'Booking must have a leader.' });
        }

        // 2. Save to Database
        const database = client.db('GaganYatriDB'); // Using the database name from our previous discussion
        const bookings = database.collection('bookings');
        await bookings.insertOne(bookingData);
        console.log("Booking saved to database.");
    
        // 3. Configure and Send Email
        const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
        
        const emailHtml = EmailTemplate(bookingData);
        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: leader.email,
            subject: 'Your Space Adventure Booking Confirmation',
            html: emailHtml,
        });
        console.log(`Confirmation email sent to ${leader.email}.`);
        
        res.status(201).json({ success: true, message: 'Booking confirmed!' });

    } catch (error) {
        console.error('Booking process failed:', error);
        res.status(500).json({ error: 'Failed to complete booking' });
    } finally {
        // 4. IMPORTANT: Ensure the client connection is closed
        await client.close();
    }
});

export default router;