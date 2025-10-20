import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function FloatingParticles({ canvasRef, isInView, motionIntensity }) {
  const sceneRef = useRef<any>(null);
  const rendererRef = useRef<any>(null);
  const particlesRef = useRef<any>(null);
  const animationFrameRef = useRef<any>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    rendererRef.current = renderer;

    // Create floating particles
    const particleCount = 500;
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = (Math.random() - 0.5) * 20;
      positions[i3 + 2] = (Math.random() - 0.5) * 20;

      velocities[i3] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: 0.08,
      color: 0x4f46e5,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    particlesRef.current = { mesh: particles, velocities };
    scene.add(particles);

    // Animation
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      
      if (!isInView && motionIntensity === "LOW") return;

      if (particlesRef.current && motionIntensity !== "LOW") {
        const positions = particlesRef.current.mesh.geometry.attributes.position.array;
        const velocities = particlesRef.current.velocities;

        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          
          positions[i3] += velocities[i3];
          positions[i3 + 1] += velocities[i3 + 1];
          positions[i3 + 2] += velocities[i3 + 2];

          // Boundary check
          if (Math.abs(positions[i3]) > 10) velocities[i3] *= -1;
          if (Math.abs(positions[i3 + 1]) > 10) velocities[i3 + 1] *= -1;
          if (Math.abs(positions[i3 + 2]) > 10) velocities[i3 + 2] *= -1;
        }

        particlesRef.current.mesh.geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [isInView, motionIntensity]);

  return <canvas ref={canvasRef} className="absolute inset-0" />;
}