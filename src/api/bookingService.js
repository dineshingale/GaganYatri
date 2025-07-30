// src/api/bookingService.js
const API = process.env.API_URL;
export const saveBookingToDatabase = async (bookingData) => {
  try {
    // The endpoint should match your server's router setup.
    // Assuming your server uses this file for the '/api/booking' route.
    const response = await fetch(`${API}/api/booking`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to save booking');
    }
    return await response.json();
  } catch (error) {
    console.error('Database save error:', error);
    throw error;
  }
};
