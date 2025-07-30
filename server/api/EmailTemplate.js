// server/api/EmailTemplate.js
export const EmailTemplate = ({ selectedOptions = {}, passengers = [] }) => {
  const leader = passengers.find(p => p.isLeader);
  const companions = passengers.filter(p => !p.isLeader);
  const { adventure, spacecraft, launchsite } = selectedOptions;

  return `
    <html>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2c3e50;">Booking Confirmation</h1>

        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
          <h2 style="color: #3498db;">Your Space Adventure Awaits</h2>
          <p>
            You're all set for an exciting journey on the
            <strong>${spacecraft?.title || "spacecraft"}</strong>,
            launching from
            <strong>${launchsite?.title || "your selected site"}</strong>.
          </p>
          <p>
            Get ready to explore
            <strong>${adventure?.title || "your chosen destination"}</strong> —
            an experience that's sure to leave you inspired.
          </p>
        </div>

        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
          <h2 style="color: #3498db;">Leader Details</h2>
          ${
            leader ? `
              <p><strong>Name:</strong> ${leader.name}</p>
              <p><strong>Phone:</strong> ${leader.phone}</p>
              <p><strong>Email:</strong> ${leader.email}</p>
              <p><strong>Address:</strong> ${leader.address}</p>
            ` : `<p>No leader assigned.</p>`
          }

          ${
            companions.length > 0 ? `
              <h2 style="color: #3498db;">Companions</h2>
              <ul>
                ${companions.map(p => `
                  <li>${p.name}, Age ${p.age}, ${p.gender}</li>
                `).join('')}
              </ul>
            ` : ''
          }
        </div>

        <div style="text-align: center; margin-top: 30px;">
          <p>We look forward to welcoming you on your space adventure!</p>
        </div>
      </body>
    </html>
  `;
};