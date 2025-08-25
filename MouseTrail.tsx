"use client";
import React, { useEffect, useRef } from "react";

export default function MouseTrail() {
  const cursorRef = useRef<HTMLDivElement>(null);
  // For trailing effect
  const mouse = useRef({ x: 0, y: 0 });
  const trail = useRef({ x: 0, y: 0 });
  const animationFrame = useRef<number>();

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.opacity = "1";
      }
    };
    const fadeOut = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = "0";
      }
    };
    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseout", fadeOut);
    window.addEventListener("mouseleave", fadeOut);

    // Animation loop for trailing effect
    const animate = () => {
      // Lerp for trailing
      trail.current.x += (mouse.current.x - trail.current.x) * 0.18;
      trail.current.y += (mouse.current.y - trail.current.y) * 0.18;
      if (cursorRef.current) {
        cursorRef.current.style.left = trail.current.x + "px";
        cursorRef.current.style.top = trail.current.y + "px";
      }
      animationFrame.current = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseout", fadeOut);
      window.removeEventListener("mouseleave", fadeOut);
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        opacity: 0,
        position: "fixed",
        zIndex: 9999,
        pointerEvents: "none",
        width: "2.5rem",
        height: "2.5rem",
        borderRadius: "9999px",
        background: "rgba(37, 99, 235, 0.25)", // blue-600
        boxShadow: "0 0 32px 16px rgba(37,99,235,0.25)",
        filter: "blur(2px)",
        transition: "opacity 0.3s cubic-bezier(.4,0,.2,1)",
        transform: "translate(-50%, -50%)",
        willChange: "left, top, opacity"
      }}
    />
  );
} 