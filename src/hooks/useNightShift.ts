import { useState, useEffect } from 'react';

/**
 * Custom hook to detect if current local time is in Night Shift window
 * Night Shift is active from 9:00 PM (21:00) to 5:00 AM (05:00).
 */
export const useNightShift = (): boolean => {
  const checkIsNight = (): boolean => {
    const hours = new Date().getHours();
    return hours >= 21 || hours < 5;
  };

  const [isNightShift, setIsNightShift] = useState<boolean>(checkIsNight);

  useEffect(() => {
    // Initial check
    setIsNightShift(checkIsNight());

    // Re-check time every 60 seconds to catch transitions smoothly
    const interval = setInterval(() => {
      setIsNightShift(checkIsNight());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return isNightShift;
};
