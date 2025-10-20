import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function FlowingParticles({ canvasRef, isInView }) {
  const sceneRef = useRef<any>(null);
  const rendererRef = useRef<any>(null);
  const particlesRef = useRef<any>(null);
  const animationFrameRef = useRef<any>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

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
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    rendererRef.current = renderer;

    // Create flowing particle system
    const particleCount = 3000;
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      positions[i3] = (Math.random() - 0.5) * 100;
      positions[i3 + 1] = (Math.random() - 0.5) * 100;
      positions[i3 + 2] = (Math.random() - 0.5) * 100;

      velocities[i3] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;

      // Cyan gradient colors
      const color = new THREE.Color();
      color.setHSL(0.5 + Math.random() * 0.1, 0.8, 0.5 + Math.random() * 0.3);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    particlesRef.current = { mesh: particles, velocities };
    scene.add(particles);

    // Create connecting lines
    const lineGeometry = new THREE.BufferGeometry();
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.1,
      blending: THREE.AdditiveBlending
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // Mouse move handler
    const handleMouseMove = (event) => {
      mouseRef.current.targetX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    let time = 0;
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      
      time += 0.01;

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      if (particlesRef.current) {
        const positions = particlesRef.current.mesh.geometry.attributes.position.array;
        const velocities = particlesRef.current.velocities;
        const linePositions: any[] = [];

        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          
          // Mouse attraction
          const dx = mouseRef.current.x * 50 - positions[i3];
          const dy = mouseRef.current.y * 50 - positions[i3 + 1];
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 20) {
            const force = (20 - distance) / 20;
            velocities[i3] += dx * force * 0.001;
            velocities[i3 + 1] += dy * force * 0.001;
          }

          // Apply velocity
          positions[i3] += velocities[i3];
          positions[i3 + 1] += velocities[i3 + 1];
          positions[i3 + 2] += velocities[i3 + 2];

          // Apply flow field
          const flowX = Math.sin(positions[i3 + 1] * 0.01 + time) * 0.02;
          const flowY = Math.cos(positions[i3] * 0.01 + time) * 0.02;
          positions[i3] += flowX;
          positions[i3 + 1] += flowY;

          // Boundary check with wrapping
          if (Math.abs(positions[i3]) > 50) positions[i3] *= -1;
          if (Math.abs(positions[i3 + 1]) > 50) positions[i3 + 1] *= -1;
          if (Math.abs(positions[i3 + 2]) > 50) positions[i3 + 2] *= -1;

          // Damping
          velocities[i3] *= 0.98;
          velocities[i3 + 1] *= 0.98;
          velocities[i3 + 2] *= 0.98;

          // Create connections to nearby particles
          if (i % 10 === 0) {
            for (let j = i + 1; j < Math.min(i + 50, particleCount); j++) {
              const j3 = j * 3;
              const dx = positions[i3] - positions[j3];
              const dy = positions[i3 + 1] - positions[j3 + 1];
              const dz = positions[i3 + 2] - positions[j3 + 2];
              const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
              
              if (dist < 8) {
                linePositions.push(
                  positions[i3], positions[i3 + 1], positions[i3 + 2],
                  positions[j3], positions[j3 + 1], positions[j3 + 2]
                );
              }
            }
          }
        }

        particlesRef.current.mesh.geometry.attributes.position.needsUpdate = true;

        // Update connection lines
        if (linePositions.length > 0) {
          lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
        }
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
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      geometry.dispose();
      material.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, [isInView]);

  return <canvas ref={canvasRef} className="absolute inset-0" />;
}