import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function AnimatedGrid({ canvasRef }) {
  const sceneRef = useRef<any>(null);
  const rendererRef = useRef<any>(null);
  const gridRef = useRef<any>(null);
  const particlesRef = useRef<any>(null);
  const animationFrameRef = useRef<any>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 8, 20);
    camera.lookAt(0, -2, 0);

    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    // Create interactive grid that extends beyond viewport edges
    const gridSize = 80;
    const gridDivisions = 120;
    const geometry = new THREE.PlaneGeometry(gridSize, gridSize, gridDivisions, gridDivisions);
    
    const material = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });

    const grid = new THREE.Mesh(geometry, material);
    grid.rotation.x = -Math.PI / 2.5;
    grid.position.y = -2;
    gridRef.current = grid;
    scene.add(grid);

    // Add interactive floating particles - randomly distributed
    const particlesCount = 600;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);
    const velocities = new Float32Array(particlesCount * 3);
    
    // Randomly distribute particles in 3D space
    for (let i = 0; i < particlesCount; i++) {
      // Random spherical distribution for more natural spread
      const radius = Math.random() * 25 + 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = Math.random() * 12 + 2; // Keep in view
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
      
      // Random initial velocities
      velocities[i * 3] = (Math.random() - 0.5) * 0.04;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.04;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.04;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x22d3ee,
      size: 0.15,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    particlesRef.current = particles;
    scene.add(particles);

    // Smooth mouse tracking
    const handleMouseMove = (event) => {
      mouseRef.current.targetX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let time = 0;
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      
      time += 0.015;

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Animate grid with mouse interaction
      if (gridRef.current) {
        const positions = gridRef.current.geometry.attributes.position;
        const originalPositions = new THREE.PlaneGeometry(gridSize, gridSize, gridDivisions, gridDivisions).attributes.position;
        
        for (let i = 0; i < positions.count; i++) {
          const x = originalPositions.getX(i);
          const y = originalPositions.getY(i);
          
          // Enhanced mouse influence with smooth falloff
          const mouseDistance = Math.sqrt(
            Math.pow(x - mouseRef.current.x * 25, 2) + 
            Math.pow(y - mouseRef.current.y * 25, 2)
          );
          const mouseInfluence = Math.max(0, 1 - mouseDistance / 18) * 4;
          
          // Multi-layered wave patterns
          const wave1 = Math.sin(x * 0.3 + time) * Math.cos(y * 0.3 + time) * 0.6;
          const wave2 = Math.sin(x * 0.15 - time * 0.5) * 0.3;
          const wave3 = Math.cos(y * 0.2 + time * 0.7) * 0.3;
          
          positions.setZ(i, wave1 + wave2 + wave3 + mouseInfluence);
        }
        positions.needsUpdate = true;
      }

      // Animate particles with mouse repulsion and movement
      if (particlesRef.current) {
        const particlePositions = particlesRef.current.geometry.attributes.position;
        const velocities = particlesRef.current.geometry.attributes.velocity;
        
        for (let i = 0; i < particlesCount; i++) {
          const i3 = i * 3;
          
          // Mouse repulsion force - stronger when mouse passes through
          const mouseX = mouseRef.current.x * 20;
          const mouseY = mouseRef.current.y * 10 + 7; // Map to particle space
          const mouseZ = 0; // Mouse is at screen depth
          
          const dx = particlePositions.array[i3] - mouseX;
          const dy = particlePositions.array[i3 + 1] - mouseY;
          const dz = particlePositions.array[i3 + 2] - mouseZ;
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
          
          // Strong repulsion when mouse is near
          if (distance < 10) {
            const force = (10 - distance) / 10;
            const repulsionStrength = force * force * 0.3; // Quadratic falloff for stronger effect
            velocities.array[i3] += (dx / distance) * repulsionStrength;
            velocities.array[i3 + 1] += (dy / distance) * repulsionStrength;
            velocities.array[i3 + 2] += (dz / distance) * repulsionStrength;
          }
          
          // Apply velocity with damping
          particlePositions.array[i3] += velocities.array[i3];
          particlePositions.array[i3 + 1] += velocities.array[i3 + 1];
          particlePositions.array[i3 + 2] += velocities.array[i3 + 2];
          
          velocities.array[i3] *= 0.92; // Less damping for more movement
          velocities.array[i3 + 1] *= 0.92;
          velocities.array[i3 + 2] *= 0.92;
          
          // Floating motion
          particlePositions.array[i3 + 1] += Math.sin(time + i * 0.1) * 0.02;
          
          // Boundary wrapping - larger area
          if (particlePositions.array[i3] < -30) particlePositions.array[i3] = 30;
          if (particlePositions.array[i3] > 30) particlePositions.array[i3] = -30;
          if (particlePositions.array[i3 + 1] < 0) particlePositions.array[i3 + 1] = 14;
          if (particlePositions.array[i3 + 1] > 14) particlePositions.array[i3 + 1] = 0;
          if (particlePositions.array[i3 + 2] < -30) particlePositions.array[i3 + 2] = 30;
          if (particlePositions.array[i3 + 2] > 30) particlePositions.array[i3 + 2] = -30;
        }
        particlePositions.needsUpdate = true;
      }

      // Subtle camera movement based on mouse
      camera.position.x = mouseRef.current.x * 1.5;
      camera.position.y = 8 + mouseRef.current.y * 1;
      camera.lookAt(0, -2, 0);

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
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ display: 'block' }} />;
}