"use client";

import React, { useState, useEffect } from "react";

interface CountDownProps {
  targetDate: Date;
}

const CountDown: React.FC<CountDownProps> = ({ targetDate }) => {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance <= 0) {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeRemaining({ days, hours, minutes, seconds });

      if (distance < 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const isToday = () => {
    const today = new Date();
    return (
      targetDate.getFullYear() === today.getFullYear() &&
      targetDate.getMonth() === today.getMonth() &&
      targetDate.getDate() === today.getDate()
    );
  };

  //if the event date is today and time remaining is 0, show the event is live
  if (
    isToday() &&
    timeRemaining.days === 0 &&
    timeRemaining.hours === 0 &&
    timeRemaining.minutes === 0 &&
    timeRemaining.seconds === 0
  ) {
    return (
      <div className="flex justify-center space-x-4">
        <div className="p-4 bg-purple rounded-lg neon-border glassmorphism w-fit">
          <div className="flex text-xl font-bold">
             <span className="text-green-500 ml-2"> Happening Now</span>
            <span className="relative flex h-3 w-3 ml-2 my-auto">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-green-400"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center space-x-4">
      <div className="p-4 bg-purple rounded-lg neon-border glassmorphism w-22">
        <div className="text-2xl font-bold">{timeRemaining.days}</div>
        <div className="text-sm">Days</div>
      </div>
      <div className="p-4 bg-purple rounded-lg neon-border glassmorphism w-22">
        <div className="text-2xl font-bold">{timeRemaining.hours}</div>
        <div className="text-sm">Hours</div>
      </div>
      <div className="p-4 bg-purple rounded-lg neon-border glassmorphism w-22">
        <div className="text-2xl font-bold">{timeRemaining.minutes}</div>
        <div className="text-sm">Minutes</div>
      </div>
      <div className="p-4 bg-purple rounded-lg neon-border glassmorphism w-22">
        <div className="text-2xl font-bold">{timeRemaining.seconds}</div>
        <div className="text-sm">Seconds</div>
      </div>
    </div>
  );
};

export default CountDown;