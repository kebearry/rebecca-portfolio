"use client"; // Ensure client-side rendering

import React, { useState, useEffect, useRef } from 'react';

// Define a type for the trail object
type Trail = {
  x: number;
  y: number;
  id: number;
};

const CustomCursor = () => {
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  const [trail, setTrail] = useState<Trail[]>([]);
  const counterRef = useRef(0);
  const maxTrailLength = 6; // Limit the number of trail steps

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);

      const uniqueId = counterRef.current++;

      setTrail((prevTrail) => {
        const newTrail = [
          ...prevTrail,
          { x: e.clientX, y: e.clientY, id: uniqueId },
        ];

        // Keep only the last `maxTrailLength` steps
        if (newTrail.length > maxTrailLength) {
          newTrail.shift();
        }

        return newTrail;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTrail((prevTrail) => prevTrail.slice(1)); // Remove the first (oldest) trail step
    }, 50); // Update trail every 50ms
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Custom cursor */}
      <div
        className="cursor w-3 h-3 bg-pink-500 fixed rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
        style={{
          left: `${mouseX}px`,
          top: `${mouseY}px`,
          zIndex: 9999, // Ensure it's above other elements
        }}
      ></div>

      {/* Heart-shaped cursor trails */}
      {trail.map((t) => (
        <div
          key={t.id}
          className="cursor-trail fixed pointer-events-none transform -translate-x-1/2 -translate-y-1/2 opacity-75 transition-all duration-200"
          style={{
            left: `${t.x}px`,
            top: `${t.y}px`,
            animation: 'trail 0.3s ease-out forwards',
            zIndex: 9998, // Trails should be below the main cursor
          }}
        >
          {/* Heart-shaped trail */}
          <div
            className="heart-shape w-8 h-8 relative"
            style={{
              width: '16px',
              height: '16px',
              transform: 'rotate(45deg)',
              position: 'absolute',
            }}
          >
            {/* Left lobe */}
            <div
              className="absolute top-0 left-0 w-8 h-8 bg-pink-300 rounded-full"
              style={{
                top: '0px',
                left: '0px',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
              }}
            ></div>
            {/* Right lobe */}
            <div
              className="absolute top-0 right-0 w-8 h-8 bg-pink-300 rounded-full"
              style={{
                top: '0px',
                right: '0px',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
              }}
            ></div>

            {/* Bottom triangle part */}
            <div
              className="absolute bottom-0 left-0 w-8 h-8 bg-pink-300"
              style={{
                width: '8px',
                height: '8px',
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                position: 'absolute',
                top: '50%',
              }}
            ></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CustomCursor;
