"use client";
import React, { useState, useEffect } from "react";

const Countdown = ({ color }: { color: string }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [loading, setLoading] = useState(true);

  const padDate = (unit: number) => (unit < 10 ? `0${unit}` : unit.toString());

  const endDate = new Date("2024-03-26T13:00:00");

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const distance = endDate.getTime() - now.getTime();

      if (distance < 0) {
        setLoading(false);
        return;
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
  }, []);

  if (loading) {
    return <div className={`text-${color}`}>Loading countdown...</div>;
  }

  return (
    <div className={`text-${color} text-4xl`}>
      <h1>
        {timeLeft.days} : {timeLeft.hours} : {timeLeft.minutes} :{" "}
        {timeLeft.seconds}
      </h1>
    </div>
  );
};

export default Countdown;
