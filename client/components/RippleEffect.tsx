import React, { MouseEvent, ReactNode, useState } from 'react';
import { StaticImageData } from 'next/image';

const RippleEffect = ({
  children,
  image,
  onClick,
}: {
  children: ReactNode;
  image: string | StaticImageData;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
}) => {
  const [ripples, setRipples] = useState<
    { x: number; y: number; id: number }[]
  >([]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const tiltX = (0.5 - y / rect.height) * 30;
    const tiltY = (x / rect.width - 0.5) * 30;
    card.style.transform = `perspective(1200px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(-20px)`;

    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);
  };

  const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform =
      'perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
  };

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipples = [{ x, y, id: Date.now() }];
    setRipples(newRipples);

    setTimeout(() => {
      setRipples((prev) => [...prev, { x, y, id: Date.now() + 1 }]);
    }, 200);

    setTimeout(() => {
      setRipples([]);
    }, 900);

    if (onClick) onClick(e);
  };

  return (
    <div
      className="relative group rounded-xl overflow-hidden shadow-lg 
        bg-gray-800/80 dark:bg-gray-900/80 transition-all duration-300"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        transition: 'transform 0.4s ease-out, box-shadow 0.3s ease-in-out',
        boxShadow: `
          0 4px 6px rgba(0, 0, 0, 0.1), 
          inset 0 0 12px 4px rgba(0, 0, 0, 0.6) 
        `,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
    >
      <div className="absolute inset-0 backdrop-blur-md bg-gray-800/60 dark:bg-gray-900/60" />

      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{
          background: `radial-gradient(circle 100px at var(--x, 50%) var(--y, 50%), rgba(255, 255, 255, 0.2), transparent)`,
        }}
      />

      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 animate-ripple pointer-events-none"
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
            width: '10px',
            height: '10px',
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
          }}
        />
      ))}

      {children}
    </div>
  );
};

export default RippleEffect;
