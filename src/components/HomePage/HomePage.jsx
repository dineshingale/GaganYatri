import React from 'react';
import Navbar from './Navbar/Navbar';
import HeroSection from './HeroSection/HeroSection';
import Slider from './Slider/Slider';
import Footer from './Footer/Footer';

// Adventure Images
import adventure1 from '../../assets/Adventure 1.webp';
import adventure2 from '../../assets/Adventure 2.webp';
import adventure3 from '../../assets/Adventure 3.webp';
import adventure4 from '../../assets/Adventure 4.webp';
import adventure5 from '../../assets/Adventure 5.webp';
import adventure6 from '../../assets/Adventure 6.webp';

// Rockets & Spacecraft
import falcon from '../../assets/falcon.jpg';
import starship from '../../assets/starship.jpg';
import gaganyan from '../../assets/gaganyan.jpg';

// Launch Sites
import launchsiteChennai from '../../assets/launchsite Chennai.webp';
import launchsiteMonaco from '../../assets/launchsite Monaco.webp';
import launchsiteSF from '../../assets/launchsite SF.webp';
import launchsiteTokyo from '../../assets/launchsite Tokyo.webp';


// Data for our reusable Slider component
const starshipSlides = [
  {
    imageUrl: adventure1,
    title: 'View from Above',
    subtitle: 'Service to Earth Orbit, Moon, Mars and Beyond'
  },
  {
    imageUrl: adventure2,
    title: 'Space Parks',
    subtitle: 'The Most Powerful Launch Vehicle Ever Developed'
  },
  {
    imageUrl: adventure3,
    title: 'Moon',
    subtitle: 'The Most Powerful Launch Vehicle Ever Developed'
  },
  {
    imageUrl: adventure4,
    title: 'Mars',
    subtitle: 'The Most Powerful Launch Vehicle Ever Developed'
  },
  {
    imageUrl: adventure5,
    title: 'Europa',
    subtitle: 'The Most Powerful Launch Vehicle Ever Developed'
  },
  {
    imageUrl: adventure6,
    title: 'Titan',
    subtitle: 'The Most Powerful Launch Vehicle Ever Developed'
  }
];

const dragonSlides = [
  {
    imageUrl: falcon,
    title: 'Falcon',
    subtitle: 'Precision landings for science and exploration'
  },
  {
    imageUrl: gaganyan,
    title: 'Gaganyaan',
    subtitle: 'Comfortable cabins for deep space journeys'
  },
  {
    imageUrl: starship,
    title: 'Starship',
    subtitle: 'Heavy payload delivery across the solar system'
  }
];

const falconSlides = [
  {
    imageUrl: launchsiteChennai,
    title: 'Chennai, India',
    subtitle: 'Rapid Earth transport with orbital hops'
  },
  {
    imageUrl: launchsiteMonaco,
    title: 'Monaco, Europe',
    subtitle: 'Multi-orbit insertion with reusable stages'
  },
  {
    imageUrl: launchsiteSF,
    title: 'San Francisco, USA',
    subtitle: 'Building the logistics chain for colonies'
  },
  {
    imageUrl: launchsiteTokyo,
    title: 'Tokyo, Japan',
    subtitle: 'Building the logistics chain for colonies'
  }
];


function App() {
  const adventureRef = React.useRef(null);

  const handleScrollToAdventure = () => {
    adventureRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-black">
      <Navbar />
      <main>
        <HeroSection onExplore={handleScrollToAdventure} />
        {/* Here we reuse the Slider component with different data */}
        <div ref={adventureRef}>
          <Slider slides={starshipSlides} />
        </div>
        <Slider slides={dragonSlides} />
        <Slider slides={falconSlides} />
      </main>
      <Footer />
    </div>
  );
}

export default App;