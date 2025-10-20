import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function LiquidOrb({ canvasRef, mousePos, motionIntensity }) {
  const sceneRef = useRef<any>(null);
  const rendererRef = useRef<any>(null);
  const orbRef = useRef<any>(null);
  const animationFrameRef = useRef<any>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    rendererRef.current = renderer;

    // Create liquid orb
    const geometry = new THREE.IcosahedronGeometry(2, 4);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x4f46e5,
      metalness: 0.1,
      roughness: 0.2,
      transmission: 0.9,
      transparent: true,
      opacity: 0.8,
      thickness: 1.5,
      envMapIntensity: 1.5,
      clearcoat: 1,
      clearcoatRoughness: 0.1
    });

    const orb = new THREE.Mesh(geometry, material);
    orbRef.current = orb;
    scene.add(orb);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x4f46e5, 1);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x6366f1, 0.8);
    pointLight2.position.set(-5, -5, -5);
    scene.add(pointLight2);

    // Animation
    let time = 0;
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      
      if (!orbRef.current) return;

      time += 0.01;

      // Morph animation
      const positions = orbRef.current.geometry.attributes.position;
      const originalPositions = geometry.attributes.position.array;
      
      for (let i = 0; i < positions.count; i++) {
        const i3 = i * 3;
        const x = originalPositions[i3];
        const y = originalPositions[i3 + 1];
        const z = originalPositions[i3 + 2];
        
        const amplitude = motionIntensity === "HIGH" ? 0.045 : motionIntensity === "MED" ? 0.025 : 0.01;
        const noise = Math.sin(x * 2 + time) * Math.cos(y * 2 + time) * amplitude;
        
        positions.setXYZ(
          i,
          x * (1 + noise),
          y * (1 + noise),
          z * (1 + noise)
        );
      }
      positions.needsUpdate = true;

      // Mouse interaction
      if (motionIntensity !== "LOW") {
        const parallaxStrength = motionIntensity === "HIGH" ? 0.45 : 0.28;
        orbRef.current.rotation.x += (mousePos.y * parallaxStrength - orbRef.current.rotation.x) * 0.08;
        orbRef.current.rotation.y += (mousePos.x * parallaxStrength - orbRef.current.rotation.y) * 0.08;
      }

      orbRef.current.rotation.z += 0.001;

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
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
  }, [motionIntensity]);

  return <canvas ref={canvasRef} className="absolute inset-0" />;
}