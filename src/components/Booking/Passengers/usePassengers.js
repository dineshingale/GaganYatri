import { useRef, useState } from 'react';

export const usePassengers = (passengers, setPassengers) => {
  const passengerListRef = useRef(null);
  const [currentPassengerIndex, setCurrentPassengerIndex] = useState(0);

  const defaultPassenger = {
    id: passengers.length + 1,
    name: "",
    phone: "",
    age: "",
    gender: "",
    isLeader: false,
    email: "",
    address: ""
  };

  const scrollToPassenger = (index) => {
    if (passengerListRef.current?.children[index]) {
      passengerListRef.current.children[index].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center"
      });
    }
  };

  const addPassenger = () => {
    const newPassenger = {
      ...defaultPassenger,
      id: passengers.length + 1
    };
    setPassengers([...passengers, newPassenger]);
    const newIndex = passengers.length;
    setCurrentPassengerIndex(newIndex);
    setTimeout(() => scrollToPassenger(newIndex), 10);
  };

  const removePassenger = (id) => {
    if (passengers.length <= 1) return;

    const indexToRemove = passengers.findIndex(p => p.id === id);
    const newPassengers = passengers.filter(p => p.id !== id);

    if (passengers.find(p => p.id === id)?.isLeader && newPassengers.length > 0) {
      newPassengers[0].isLeader = true;
    }

    const renumberedPassengers = newPassengers.map((p, idx) => ({
      ...p,
      id: idx + 1
    }));

    setPassengers(renumberedPassengers);

    if (currentPassengerIndex >= indexToRemove) {
      const newIndex = Math.max(0, currentPassengerIndex - 1);
      setCurrentPassengerIndex(newIndex);
    }
  };

  const setLeader = (id) => {
    setPassengers(passengers.map(p => ({
      ...p,
      isLeader: p.id === id
    })));
  };

  const handleInputChange = (id, field, value) => {
    setPassengers(passengers.map(p =>
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  const handleNext = () => {
    const nextIndex = Math.min(currentPassengerIndex + 1, passengers.length - 1);
    setCurrentPassengerIndex(nextIndex);
    scrollToPassenger(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = Math.max(currentPassengerIndex - 1, 0);
    setCurrentPassengerIndex(prevIndex);
    scrollToPassenger(prevIndex);
  };

  const validatePassengers = () => {
    return passengers.every(p => {
      const basicInfoValid = p.name && p.phone && p.age && p.gender;
      const leaderValid = !p.isLeader || (p.email && p.address);
      return basicInfoValid && leaderValid;
    });
  };

  return {
    passengers,
    currentPassengerIndex,
    passengerListRef,
    addPassenger,
    removePassenger,
    setLeader,
    handleInputChange,
    handleNext,
    handlePrev,
    validatePassengers
  };
};
