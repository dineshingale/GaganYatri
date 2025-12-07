import React from 'react';

const TravelPreview = ({ selectedOptions }) => {
  return (
    <section className="w-full min-h-screen bg-black pt-32 pb-20 px-5 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold uppercase text-white mb-12 text-center">
          Your Travel Configuration
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Adventure Card */}
          {selectedOptions.adventure && (
            <div className="flex flex-col items-center gap-4">
              <div className="w-full h-64 md:h-80 rounded-lg overflow-hidden">
                <img
                  src={selectedOptions.adventure.imageUrl}
                  alt={selectedOptions.adventure.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-bold text-white uppercase">Adventure</h3>
                <p className="text-white/70 mt-2">{selectedOptions.adventure.title}</p>
              </div>
            </div>
          )}

          {/* Spacecraft Card */}
          {selectedOptions.spacecraft && (
            <div className="flex flex-col items-center gap-4">
              <div className="w-full h-64 md:h-80 rounded-lg overflow-hidden">
                <img
                  src={selectedOptions.spacecraft.imageUrl}
                  alt={selectedOptions.spacecraft.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-bold text-white uppercase">Spacecraft</h3>
                <p className="text-white/70 mt-2">{selectedOptions.spacecraft.title}</p>
              </div>
            </div>
          )}

          {/* Launchsite Card */}
          {selectedOptions.launchsite && (
            <div className="flex flex-col items-center gap-4">
              <div className="w-full h-64 md:h-80 rounded-lg overflow-hidden">
                <img
                  src={selectedOptions.launchsite.imageUrl}
                  alt={selectedOptions.launchsite.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-bold text-white uppercase">Launch Site</h3>
                <p className="text-white/70 mt-2">{selectedOptions.launchsite.title}</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-16 p-8 border border-white/20 rounded-lg text-center">
          <p className="text-white/70 text-lg">
            Review your selections above. Click "Next" to proceed with passenger information.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TravelPreview;
