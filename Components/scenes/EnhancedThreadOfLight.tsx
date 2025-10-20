import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function EnhancedThreadOfLight({ canvasRef, isInView }) {
  const sceneRef = useRef<any>(null);
  const rendererRef = useRef<any>(null);
  const lineRef = useRef<any>(null);
  const spheresRef = useRef<any>([]);
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
    camera.position.z = 12;

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
    const spheres: any[] = [];
    
    for (let i = 0; i < 50; i++) {
      const t = i / 49;
      const point = new THREE.Vector3(
        Math.sin(t * Math.PI * 4) * 3,
        (t - 0.5) * 10,
        Math.cos(t * Math.PI * 3) * 3
      );
      points.push(point);
      
      // Add glowing sphere at every 5th point
      if (i % 5 === 0) {
        const sphereGeometry = new THREE.SphereGeometry(0.2, 16, 16);
        const sphereMaterial = new THREE.MeshBasicMaterial({
          color: 0x06b6d4,
          transparent: true,
          opacity: 0.8
        });
        
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.position.copy(point);
        sphere.userData = { originalPos: point.clone(), index: i };
        spheres.push(sphere);
        scene.add(sphere);
      }
    }

    spheresRef.current = spheres;

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: 0x06b6d4,
      linewidth: 2,
      transparent: true,
      opacity: 0.6
    });

    const line = new THREE.Line(geometry, material);
    lineRef.current = line;
    scene.add(line);

    // Add particle trail
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 200;
    const particlePositions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const t = i / particleCount;
      const pathPoint = points[Math.floor(t * points.length)];
      particlePositions[i * 3] = pathPoint.x + (Math.random() - 0.5) * 0.5;
      particlePositions[i * 3 + 1] = pathPoint.y;
      particlePositions[i * 3 + 2] = pathPoint.z + (Math.random() - 0.5) * 0.5;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x22d3ee,
      size: 0.1,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x06b6d4, 2);
    pointLight.position.set(0, 0, 5);
    scene.add(pointLight);

    // Animation
    let time = 0;
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      
      time += 0.01;

      if (lineRef.current) {
        lineRef.current.rotation.y = time * 0.2;
        
        // Animate spheres with the line
        spheresRef.current.forEach((sphere) => {
          const rotatedPoint = sphere.userData.originalPos.clone();
          rotatedPoint.applyAxisAngle(new THREE.Vector3(0, 1, 0), time * 0.2);
          sphere.position.copy(rotatedPoint);
          
          // Pulsing effect
          const scale = 1 + Math.sin(time * 3 + sphere.userData.index * 0.5) * 0.3;
          sphere.scale.setScalar(scale);
        });
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
      particleGeometry.dispose();
      particleMaterial.dispose();
      spheresRef.current.forEach(sphere => {
        sphere.geometry.dispose();
        sphere.material.dispose();
      });
      renderer.dispose();
    };
  }, [isInView]);

  return <canvas ref={canvasRef} className="absolute inset-0" />;
}