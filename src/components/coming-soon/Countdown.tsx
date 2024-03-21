"use client";
import React, { useState, useEffect } from "react";

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [loading, setLoading] = useState(true);

  const padDate = (unit: number) => (unit < 10 ? `0${unit}` : unit.toString());

  const endDate = new Date("2024-03-31");

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const distance = endDate.getTime() - now.getTime();

      if (distance < 0) {
        setLoading(false);
        return; // Stop the countdown when the end date is passed
      }

      const days = padDate(Math.floor(distance / (1000 * 60 * 60 * 24)));
      const hours = padDate(
        Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      );
      const minutes = padDate(
        Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      );
      const seconds = padDate(Math.floor((distance % (1000 * 60)) / 1000));

      setTimeLeft({ days, hours, minutes, seconds });

      if (loading) setLoading(false);
    };

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []); // Removed `loading` from dependencies

  if (loading) {
    return <div>Loading countdown...</div>;
  }

  return (
    <div className="text-black text-5xl">
      <h1>
        {timeLeft.days} : {timeLeft.hours} : {timeLeft.minutes} :{" "}
        {timeLeft.seconds}
      </h1>
    </div>
  );
};

export default Countdown;
