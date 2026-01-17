import React from "react";
import { usePassengers } from "./usePassengers";
import { Plus, Trash2, User } from "lucide-react";

const Passengers = ({ onNext, passengers, setPassengers }) => {
  const {
    currentPassengerIndex,
    passengerListRef,
    addPassenger,
    removePassenger,
    setLeader,
    handleInputChange,
    handleNext: handlePassengerNext,
    handlePrev
  } = usePassengers(passengers, setPassengers);

  const currentPassenger = passengers[currentPassengerIndex];


  return (
    <section className="w-full min-h-screen bg-black pt-32 pb-20 px-5 md:px-10 lg:px-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold uppercase text-white mb-12 text-center">
          Passenger Information
        </h2>

        {/* Passenger List */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-white">Passengers</h3>
            <button
              onClick={addPassenger}
              className="group relative inline-flex items-center justify-center py-2 px-4 text-white uppercase text-sm font-semibold tracking-wider border-2 border-white overflow-hidden transition-colors duration-300 ease-in-out hover:text-black cursor-pointer"
            >
              <span className="relative z-10 flex items-center"><Plus size={16} className="mr-2" /> Add Passenger</span>
              <div className="absolute inset-0 bg-white transform scale-y-0 origin-bottom transition-transform duration-300 ease-in-out group-hover:scale-y-100"></div>
            </button>
          </div>

          <div
            ref={passengerListRef}
            className="flex gap-4 overflow-x-auto pb-4 mb-8 scrollbar-hide"
          >
            {passengers.map((passenger, index) => (
              <div
                key={passenger.id}
                onClick={() => handlePassengerNext()}
                className={`flex-shrink-0 w-24 h-24 flex items-center justify-center cursor-pointer transition border-2 ${currentPassengerIndex === index
                  ? "border-white"
                  : "border-white/40"
                  }`}
              >
                <div className="text-center relative z-10">
                  <User size={20} className="mx-auto mb-1 text-white" />
                  <p className="text-xs font-bold text-white">
                    {passenger.name || `P${passenger.id}`}
                  </p>
                  {passenger.isLeader && (
                    <p className="text-xs text-yellow-400">Leader</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Passenger Form */}
        {currentPassenger && (
          <div className="bg-black border border-white p-8 mb-8">
            <h3 className="text-2xl font-bold text-white mb-6">
              {currentPassenger.isLeader ? "Trip Leader" : "Passenger"} #{currentPassengerIndex + 1}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-bold text-white mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={currentPassenger.name}
                  onChange={(e) =>
                    handleInputChange(currentPassenger.id, "name", e.target.value)
                  }
                  className="w-full bg-black border border-white px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white"
                  placeholder="Enter full name"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-bold text-white mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={currentPassenger.phone}
                  onChange={(e) =>
                    handleInputChange(currentPassenger.id, "phone", e.target.value)
                  }
                  className="w-full bg-black border border-white px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white"
                  placeholder="Enter phone number"
                />
              </div>

              {/* Age */}
              <div>
                <label className="block text-sm font-bold text-white mb-2">
                  Age *
                </label>
                <input
                  type="number"
                  value={currentPassenger.age}
                  onChange={(e) =>
                    handleInputChange(currentPassenger.id, "age", e.target.value)
                  }
                  className="w-full bg-black border border-white px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white"
                  placeholder="Enter age"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-bold text-white mb-2">
                  Gender *
                </label>
                <select
                  value={currentPassenger.gender}
                  onChange={(e) =>
                    handleInputChange(currentPassenger.id, "gender", e.target.value)
                  }
                  className="w-full bg-black border border-white px-4 py-2 text-white focus:outline-none focus:border-white"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Leader Fields */}
            {currentPassenger.isLeader && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 p-6 bg-black border border-white">
                <div className="md:col-span-2">
                  <p className="text-sm font-bold text-white mb-4">
                    Leader Information Required
                  </p>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-bold text-white mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={currentPassenger.email}
                    onChange={(e) =>
                      handleInputChange(currentPassenger.id, "email", e.target.value)
                    }
                    className="w-full bg-black border border-white px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white"
                    placeholder="Enter email"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-bold text-white mb-2">
                    Address *
                  </label>
                  <input
                    type="text"
                    value={currentPassenger.address}
                    onChange={(e) =>
                      handleInputChange(currentPassenger.id, "address", e.target.value)
                    }
                    className="w-full bg-black border border-white px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white"
                    placeholder="Enter address"
                  />
                </div>
              </div>
            )}

            {/* Set as Leader Button */}
            {!currentPassenger.isLeader && (
              <button
                onClick={() => setLeader(currentPassenger.id)}
                className="group relative w-full mb-6 inline-flex items-center justify-center py-3 px-4 text-white uppercase text-sm font-semibold tracking-wider border-2 border-white overflow-hidden transition-colors duration-300 ease-in-out hover:text-black cursor-pointer"
              >
                <span className="relative z-10">Set as Trip Leader</span>
                <div className="absolute inset-0 bg-white transform scale-y-0 origin-bottom transition-transform duration-300 ease-in-out group-hover:scale-y-100"></div>
              </button>
            )}

            {/* Remove Passenger Button */}
            {passengers.length > 1 && (
              <button
                onClick={() => removePassenger(currentPassenger.id)}
                className="group relative w-full inline-flex items-center justify-center py-3 px-4 text-red-400 uppercase text-sm font-semibold tracking-wider border-2 border-red-500 overflow-hidden transition-colors duration-300 ease-in-out hover:text-black cursor-pointer"
              >
                <span className="relative z-10 flex items-center"><Trash2 size={16} className="mr-2" /> Remove Passenger</span>
                <div className="absolute inset-0 bg-red-500 transform scale-y-0 origin-bottom transition-transform duration-300 ease-in-out group-hover:scale-y-100"></div>
              </button>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={handlePrev}
            disabled={currentPassengerIndex === 0}
            className={`flex-1 inline-flex items-center justify-center py-3 px-6 text-white uppercase text-sm font-semibold tracking-wider border-2 border-white transition-colors duration-300 ease-in-out cursor-pointer ${currentPassengerIndex === 0
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-white hover:text-black"
              }`}
          >
            Previous Passenger
          </button>
          <button
            onClick={handlePassengerNext}
            disabled={currentPassengerIndex === passengers.length - 1}
            className={`flex-1 inline-flex items-center justify-center py-3 px-6 text-white uppercase text-sm font-semibold tracking-wider border-2 border-white transition-colors duration-300 ease-in-out cursor-pointer ${currentPassengerIndex === passengers.length - 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-white hover:text-black"
              }`}
          >
            Next Passenger
          </button>
        </div>

        {/* Status */}
        <div className="text-center text-white/70 mb-8">
          <p>
            Passenger {currentPassengerIndex + 1} of {passengers.length}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Passengers;
