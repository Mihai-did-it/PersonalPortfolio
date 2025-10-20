import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreadOfLight({ canvasRef, isInView, motionIntensity }) {
  const sceneRef = useRef<any>(null);
  const rendererRef = useRef<any>(null);
  const lineRef = useRef<any>(null);
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

    // Create thread of light
    const points: any[] = [];
    for (let i = 0; i < 50; i++) {
      points.push(new THREE.Vector3(
        Math.sin(i * 0.3) * 2,
        i * 0.15 - 3,
        Math.cos(i * 0.2) * 2
      ));
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: 0x4f46e5,
      linewidth: 3,
      transparent: true,
      opacity: 0.8
    });

    const line = new THREE.Line(geometry, material);
    lineRef.current = line;
    scene.add(line);

    // Add glow spheres at nodes
    const sphereGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.9
    });

    for (let i = 0; i < points.length; i += 5) {
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphere.position.copy(points[i]);
      scene.add(sphere);
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Animation
    let time = 0;
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      
      if (!isInView && motionIntensity === "LOW") return;

      time += 0.01;

      if (lineRef.current && motionIntensity !== "LOW") {
        lineRef.current.rotation.y = time * 0.2;
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
      sphereGeometry.dispose();
      sphereMaterial.dispose();
      renderer.dispose();
    };
  }, [isInView, motionIntensity]);

  return <canvas ref={canvasRef} className="absolute inset-0" />;
}