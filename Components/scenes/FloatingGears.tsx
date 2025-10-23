import React, { useEffect, useRef } from "react";
import { motion, useTransform, MotionValue } from "framer-motion";

interface FloatingGearsProps {
  canvasRef?: React.RefObject<HTMLCanvasElement>;
  isInView: boolean;
  scrollProgress?: MotionValue<number>;
}

export default function FloatingGears({ canvasRef, isInView, scrollProgress }: FloatingGearsProps) {
  const localCanvasRef = useRef<HTMLCanvasElement>(null);
  const activeCanvasRef = canvasRef || localCanvasRef;
  const animationFrameId = useRef<number>();
  const gearsRef = useRef<Gear[]>([]);

  interface Gear {
    x: number;
    y: number;
    radius: number;
    teeth: number;
    rotation: number;
    speed: number;
    vx: number;
    vy: number;
    opacity: number;
    color: string;
  }

  useEffect(() => {
    const canvas = activeCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initGears();
    };

    const initGears = () => {
      gearsRef.current = [];
      const numGears = 8;
      const colors = [
        "rgba(34, 211, 238, 0.6)",
        "rgba(6, 182, 212, 0.6)",
        "rgba(22, 189, 202, 0.6)",
        "rgba(14, 165, 233, 0.6)",
      ];

      for (let i = 0; i < numGears; i++) {
        gearsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: 20 + Math.random() * 40,
          teeth: 8 + Math.floor(Math.random() * 8),
          rotation: Math.random() * Math.PI * 2,
          speed: 0.002 + Math.random() * 0.005,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          opacity: 0.4 + Math.random() * 0.4,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const drawGear = (gear: Gear) => {
      if (!ctx) return;

      ctx.save();
      ctx.translate(gear.x, gear.y);
      ctx.rotate(gear.rotation);

      const innerRadius = gear.radius * 0.6;
      const outerRadius = gear.radius * 0.85;
      const toothHeight = gear.radius * 0.3;
      
      ctx.globalAlpha = gear.opacity;

      // Draw teeth
      ctx.fillStyle = gear.color;
      ctx.strokeStyle = gear.color.replace(/[\d.]+\)$/g, "0.8)");
      ctx.lineWidth = 1.5;

      ctx.beginPath();
      for (let i = 0; i < gear.teeth; i++) {
        const angle = (i * 2 * Math.PI) / gear.teeth;
        const nextAngle = ((i + 1) * 2 * Math.PI) / gear.teeth;
        const midAngle = (angle + nextAngle) / 2;
        const toothWidth = (2 * Math.PI) / gear.teeth * 0.35;

        const innerAngle1 = midAngle - toothWidth / 2;
        const innerAngle2 = midAngle + toothWidth / 2;
        const outerAngle1 = midAngle - toothWidth / 3;
        const outerAngle2 = midAngle + toothWidth / 3;

        if (i === 0) {
          ctx.moveTo(
            Math.cos(innerAngle1) * outerRadius,
            Math.sin(innerAngle1) * outerRadius
          );
        }

        ctx.lineTo(
          Math.cos(innerAngle1) * outerRadius,
          Math.sin(innerAngle1) * outerRadius
        );
        ctx.lineTo(
          Math.cos(outerAngle1) * (outerRadius + toothHeight),
          Math.sin(outerAngle1) * (outerRadius + toothHeight)
        );
        ctx.lineTo(
          Math.cos(outerAngle2) * (outerRadius + toothHeight),
          Math.sin(outerAngle2) * (outerRadius + toothHeight)
        );
        ctx.lineTo(
          Math.cos(innerAngle2) * outerRadius,
          Math.sin(innerAngle2) * outerRadius
        );
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Draw main body
      ctx.beginPath();
      ctx.arc(0, 0, outerRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Draw inner circle
      ctx.fillStyle = "rgba(15, 23, 42, 0.6)";
      ctx.strokeStyle = gear.color;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(0, 0, innerRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Draw center hole
      const holeRadius = gear.radius * 0.25;
      ctx.fillStyle = "rgba(15, 23, 42, 0.9)";
      ctx.beginPath();
      ctx.arc(0, 0, holeRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Draw bolt holes
      const numBolts = 6;
      const boltDistance = (innerRadius + holeRadius) / 2;
      const boltRadius = gear.radius * 0.08;
      
      for (let i = 0; i < numBolts; i++) {
        const angle = (i * 2 * Math.PI) / numBolts;
        const x = Math.cos(angle) * boltDistance;
        const y = Math.sin(angle) * boltDistance;
        
        ctx.fillStyle = "rgba(15, 23, 42, 0.8)";
        ctx.beginPath();
        ctx.arc(x, y, boltRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }

      ctx.restore();
    };

    const animate = () => {
      if (!isInView) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      gearsRef.current.forEach((gear) => {
        // Update position
        gear.x += gear.vx;
        gear.y += gear.vy;

        // Bounce off edges
        if (gear.x < -gear.radius * 1.5) gear.x = canvas.width + gear.radius * 1.5;
        if (gear.x > canvas.width + gear.radius * 1.5) gear.x = -gear.radius * 1.5;
        if (gear.y < -gear.radius * 1.5) gear.y = canvas.height + gear.radius * 1.5;
        if (gear.y > canvas.height + gear.radius * 1.5) gear.y = -gear.radius * 1.5;

        // Update rotation based on scroll
        gear.rotation += gear.speed * 5;

        drawGear(gear);
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    if (isInView) {
      animate();
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isInView, activeCanvasRef]);

  // Listen to scroll progress to speed up rotation
  useEffect(() => {
    if (!scrollProgress) return;

    const unsubscribe = scrollProgress.on("change", (latest) => {
      gearsRef.current.forEach((gear) => {
        gear.rotation += gear.speed * 10 * Math.abs(latest);
      });
    });

    return () => unsubscribe();
  }, [scrollProgress]);

  return (
    <canvas
      ref={activeCanvasRef}
      className="w-full h-full"
      style={{ display: "block" }}
    />
  );
}
