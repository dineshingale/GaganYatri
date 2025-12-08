import React from "react";
import { Check, Rocket, MapPin, User, Mail } from "lucide-react";

const BookingConfirmation = ({ selectedOptions = {}, passengers = [] }) => {
  const leader = passengers.find(p => p.isLeader);
  const companions = passengers.filter(p => !p.isLeader);
  const { adventure, spacecraft, launchsite } = selectedOptions;

  return (
    <section className="w-full min-h-screen bg-black pt-32 pb-20 px-5 md:px-10 lg:px-20">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-12">
          <Check className="w-16 h-16 text-white mx-auto mb-4" />
          <h1 className="text-4xl md:text-6xl font-bold uppercase text-white mb-4">
            Booking Confirmed!
          </h1>
          <p className="text-white/70 text-lg">
            Your space adventure awaits. Check your email for confirmation details.
          </p>
        </div>

        {/* Trip Details */}
        <div className="bg-black border border-white p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Rocket className="text-white" /> Your Space Adventure
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Adventure */}
            {adventure && (
              <div className="text-center">
                <div className="w-full h-48 overflow-hidden mb-4">
                  <img
                    src={adventure.imageUrl}
                    alt={adventure.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm text-white/70 mb-1">Destination</p>
                <p className="text-lg font-bold text-white">{adventure.title}</p>
              </div>
            )}

            {/* Spacecraft */}
            {spacecraft && (
              <div className="text-center">
                <div className="w-full h-48 overflow-hidden mb-4">
                  <img
                    src={spacecraft.imageUrl}
                    alt={spacecraft.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm text-white/70 mb-1">Spacecraft</p>
                <p className="text-lg font-bold text-white">{spacecraft.title}</p>
              </div>
            )}

            {/* Launchsite */}
            {launchsite && (
              <div className="text-center">
                <div className="w-full h-48 overflow-hidden mb-4">
                  <img
                    src={launchsite.imageUrl}
                    alt={launchsite.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm text-white/70 mb-1">Launch Site</p>
                <p className="text-lg font-bold text-white">{launchsite.title}</p>
              </div>
            )}
          </div>

          <p className="text-white/70 text-center">
            You're all set for an exciting journey on the <strong>{spacecraft?.title}</strong>,
            launching from <strong>{launchsite?.title}</strong>. Get ready to explore{" "}
            <strong>{adventure?.title}</strong>!
          </p>
        </div>

        {/* Passenger Details */}
        <div className="bg-black border border-white p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <User className="text-white" /> Passenger Information
          </h2>

          {/* Trip Leader */}
          {leader && (
            <div className="mb-8 p-6 bg-black border border-white">
              <p className="text-sm font-bold text-yellow-400 mb-4 uppercase">Trip Leader</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-white/70">Name</p>
                  <p className="text-lg font-bold text-white">{leader.name}</p>
                </div>
                <div>
                  <p className="text-sm text-white/70">Age</p>
                  <p className="text-lg font-bold text-white">{leader.age} years</p>
                </div>
                <div>
                  <p className="text-sm text-white/70">Phone</p>
                  <p className="text-lg font-bold text-white">{leader.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-white/70">Gender</p>
                  <p className="text-lg font-bold text-white">{leader.gender}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-white/70">Email</p>
                  <p className="text-lg font-bold text-white flex items-center gap-2">
                    <Mail size={16} /> {leader.email}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-white/70">Address</p>
                  <p className="text-lg font-bold text-white">{leader.address}</p>
                </div>
              </div>
            </div>
          )}

          {/* Companions */}
          {companions.length > 0 && (
            <div>
              <p className="text-sm font-bold text-white/70 mb-4 uppercase">Companions</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {companions.map((companion, index) => (
                  <div key={index} className="p-4 bg-black border border-white">
                    <p className="text-sm text-white/70">Companion {index + 1}</p>
                    <p className="text-lg font-bold text-white">{companion.name}</p>
                    <p className="text-sm text-white/70 mt-2">
                      {companion.age} years, {companion.gender}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Confirmation Message */}
        <div className="bg-black border border-white p-8 text-center">
          <p className="text-white mb-4">
            A confirmation email has been sent to <strong>{leader?.email}</strong>
          </p>
          <p className="text-white">
            Thank you for choosing GaganYatri! Get ready for your incredible journey through space! 🚀
          </p>
        </div>
      </div>
    </section>
  );
};

export default BookingConfirmation;
