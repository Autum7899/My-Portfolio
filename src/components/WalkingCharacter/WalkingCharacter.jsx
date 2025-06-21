// WalkingCharacter.js - NO CHANGES REQUIRED

import React, { useState, useEffect, useRef } from "react";
import "./WalkingCharacter.css";
// Note: If you set the background-image in the CSS, you can remove the import here
// and the style prop on the div below for a cleaner separation.
import spriteSheet from "./glasses.png";

const WalkingCharacter = () => {
  const [isWalking, setIsWalking] = useState(false);
  const [faceDirection, setFaceDirection] = useState("right");

  const walkerContainerRef = useRef(null);
  const animationFrameIdRef = useRef(null);
  const currentPositionRef = useRef(0);
  const targetPositionRef = useRef(0);

  useEffect(() => {
    const animate = () => {
      const distance = targetPositionRef.current - currentPositionRef.current;

      if (Math.abs(distance) < 0.1) {
        if (isWalking) setIsWalking(false);
        currentPositionRef.current = targetPositionRef.current;
      } else {
        if (!isWalking) setIsWalking(true);
        currentPositionRef.current += distance * 0.07;
        if (distance > 0) setFaceDirection("right");
        if (distance < 0) setFaceDirection("left");
      }

      if (walkerContainerRef.current) {
        const travelProgress = currentPositionRef.current / 100;
        walkerContainerRef.current.style.left = `calc((100vw - var(--character-width)) * ${travelProgress})`;
      }

      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    animationFrameIdRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameIdRef.current);
  }, [isWalking]);

  useEffect(() => {
    const handleScroll = () => {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent =
        docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      targetPositionRef.current = scrollPercent;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={walkerContainerRef} className="walker-container">
      <div
        className={`walker-sprite ${isWalking ? "is-walking" : "is-idle"}`}
        data-direction={faceDirection}
        // This style prop is now optional if you define the background-image in your CSS file
        style={{ backgroundImage: `url(${spriteSheet})` }}
      ></div>
    </div>
  );
};

export default WalkingCharacter;
