import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function AnimatedGrid({ canvasRef }) {
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const gridRef = useRef(null);
  const animationFrameRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

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
    camera.position.set(0, 8, 12);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    rendererRef.current = renderer;

    // Create massive expanded animated grid
    const gridSize = 100;
    const gridDivisions = 80;
    const geometry = new THREE.PlaneGeometry(gridSize, gridSize, gridDivisions, gridDivisions);
    
    const material = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });

    const grid = new THREE.Mesh(geometry, material);
    grid.rotation.x = -Math.PI / 2;
    grid.position.y = -2;
    gridRef.current = grid;
    scene.add(grid);

    // Add glow points spread across entire grid
    const pointsGeometry = new THREE.BufferGeometry();
    const pointsCount = 600;
    const positions = new Float32Array(pointsCount * 3);
    
    for (let i = 0; i < pointsCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * gridSize * 0.9;
      positions[i * 3 + 1] = Math.random() * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * gridSize * 0.9;
    }
    
    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const pointsMaterial = new THREE.PointsMaterial({
      color: 0x22d3ee,
      size: 0.12,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });
    
    const points = new THREE.Points(pointsGeometry, pointsMaterial);
    scene.add(points);

    // Mouse move handler
    const handleMouseMove = (event) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    let time = 0;
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      
      time += 0.01;

      if (gridRef.current) {
        const positions = gridRef.current.geometry.attributes.position;
        const originalPositions = new THREE.PlaneGeometry(gridSize, gridSize, gridDivisions, gridDivisions).attributes.position;
        
        for (let i = 0; i < positions.count; i++) {
          const x = originalPositions.getX(i);
          const y = originalPositions.getY(i);
          
          // Mouse influence with larger radius
          const mouseDistance = Math.sqrt(
            Math.pow(x - mouseRef.current.x * 20, 2) + 
            Math.pow(y - mouseRef.current.y * 20, 2)
          );
          const mouseInfluence = Math.max(0, 1 - mouseDistance / 15) * 2.5;
          
          const wave = Math.sin(x * 0.5 + time) * Math.cos(y * 0.5 + time) * 0.5;
          positions.setZ(i, wave + mouseInfluence);
        }
        positions.needsUpdate = true;
      }

      // Animate floating points
      const pointPositions = points.geometry.attributes.position;
      for (let i = 0; i < pointsCount; i++) {
        const i3 = i * 3;
        pointPositions.array[i3 + 1] += Math.sin(time + i) * 0.01;
        
        if (pointPositions.array[i3 + 1] > 10) {
          pointPositions.array[i3 + 1] = 0;
        }
      }
      pointPositions.needsUpdate = true;

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
      pointsGeometry.dispose();
      pointsMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0" />;
}