import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function GlassSheets({ canvasRef, isInView, motionIntensity }) {
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const sheetsRef = useRef([]);
  const animationFrameRef = useRef(null);

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
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    rendererRef.current = renderer;

    // Create glass sheets
    const sheetGeometry = new THREE.PlaneGeometry(6, 4);
    const sheets = [];

    for (let i = 0; i < 5; i++) {
      const material = new THREE.MeshPhysicalMaterial({
        color: 0x4f46e5,
        metalness: 0.1,
        roughness: 0.1,
        transmission: 0.95,
        transparent: true,
        opacity: 0.6,
        thickness: 0.5,
        side: THREE.DoubleSide
      });

      const sheet = new THREE.Mesh(sheetGeometry, material);
      sheet.position.z = -i * 1.5;
      sheet.position.y = Math.sin(i) * 0.5;
      sheet.rotation.y = (i - 2) * 0.1;
      
      sheets.push(sheet);
      scene.add(sheet);
    }

    sheetsRef.current = sheets;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x4f46e5, 1);
    pointLight.position.set(0, 5, 5);
    scene.add(pointLight);

    // Animation
    let time = 0;
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      
      if (!isInView && motionIntensity === "LOW") return;

      time += 0.005;

      sheetsRef.current.forEach((sheet, index) => {
        if (motionIntensity === "HIGH") {
          sheet.position.y = Math.sin(time + index) * 0.3;
          sheet.rotation.y = Math.sin(time * 0.5 + index) * 0.15 + (index - 2) * 0.1;
        }
      });

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
      sheetGeometry.dispose();
      sheetsRef.current.forEach(sheet => sheet.material.dispose());
      renderer.dispose();
    };
  }, [isInView, motionIntensity]);

  return <canvas ref={canvasRef} className="absolute inset-0" />;
}