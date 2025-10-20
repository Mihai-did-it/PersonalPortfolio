import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function FloatingAstronaut({ canvasRef, isInView }) {
  const sceneRef = useRef<any>(null);
  const rendererRef = useRef<any>(null);
  const astronautRef = useRef<any>(null);
  const animationFrameRef = useRef<any>(null);
  const targetPositionRef = useRef({ x: -8, y: 3, z: -10 });
  const currentPositionRef = useRef({ x: -8, y: 3, z: -10 });

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
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // Create astronaut group
    const astronautGroup = new THREE.Group();
    astronautRef.current = astronautGroup;

    // Helmet (sphere)
    const helmetGeometry = new THREE.SphereGeometry(0.8, 32, 32);
    const helmetMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.3,
      shininess: 100
    });
    const helmet = new THREE.Mesh(helmetGeometry, helmetMaterial);
    helmet.position.y = 1.5;

    // Visor (darker sphere)
    const visorGeometry = new THREE.SphereGeometry(0.6, 32, 32, 0, Math.PI);
    const visorMaterial = new THREE.MeshPhongMaterial({
      color: 0x1e3a5f,
      transparent: true,
      opacity: 0.7,
      shininess: 100
    });
    const visor = new THREE.Mesh(visorGeometry, visorMaterial);
    visor.position.y = 1.5;
    visor.position.z = 0.4;

    // Body (cylinder)
    const bodyGeometry = new THREE.CylinderGeometry(0.6, 0.7, 1.5, 32);
    const bodyMaterial = new THREE.MeshPhongMaterial({
      color: 0xeeeeee,
      shininess: 30
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.2;

    // Arms
    const armGeometry = new THREE.CylinderGeometry(0.15, 0.15, 1, 16);
    const armMaterial = new THREE.MeshPhongMaterial({
      color: 0xeeeeee,
      shininess: 30
    });

    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-0.8, 0.5, 0);
    leftArm.rotation.z = Math.PI / 4;

    const rightArm = new THREE.Mesh(armGeometry, armMaterial);
    rightArm.position.set(0.8, 0.5, 0);
    rightArm.rotation.z = -Math.PI / 4;

    // Legs
    const legGeometry = new THREE.CylinderGeometry(0.2, 0.18, 1.2, 16);
    const legMaterial = new THREE.MeshPhongMaterial({
      color: 0xeeeeee,
      shininess: 30
    });

    const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
    leftLeg.position.set(-0.3, -1, 0);

    const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
    rightLeg.position.set(0.3, -1, 0);

    // Backpack (box)
    const backpackGeometry = new THREE.BoxGeometry(0.8, 1, 0.4);
    const backpackMaterial = new THREE.MeshPhongMaterial({
      color: 0xcccccc,
      shininess: 20
    });
    const backpack = new THREE.Mesh(backpackGeometry, backpackMaterial);
    backpack.position.set(0, 0.3, -0.5);

    // Add glowing cyan accent lights
    const accentGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const accentMaterial = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.8
    });

    const accent1 = new THREE.Mesh(accentGeometry, accentMaterial);
    accent1.position.set(-0.3, 0.8, 0.6);

    const accent2 = new THREE.Mesh(accentGeometry, accentMaterial);
    accent2.position.set(0.3, 0.8, 0.6);

    // Add glow
    const glowGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending
    });

    const glow1 = new THREE.Mesh(glowGeometry, glowMaterial);
    glow1.position.copy(accent1.position);

    const glow2 = new THREE.Mesh(glowGeometry, glowMaterial);
    glow2.position.copy(accent2.position);

    // Assemble astronaut
    astronautGroup.add(helmet);
    astronautGroup.add(visor);
    astronautGroup.add(body);
    astronautGroup.add(leftArm);
    astronautGroup.add(rightArm);
    astronautGroup.add(leftLeg);
    astronautGroup.add(rightLeg);
    astronautGroup.add(backpack);
    astronautGroup.add(accent1);
    astronautGroup.add(accent2);
    astronautGroup.add(glow1);
    astronautGroup.add(glow2);

    // Scale down
    astronautGroup.scale.set(0.8, 0.8, 0.8);
    
    // Position astronaut
    astronautGroup.position.set(-8, 3, -10);

    scene.add(astronautGroup);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x22d3ee, 2);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0xffffff, 1);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // Click handler to move astronaut
    const handleClick = (event) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      // Convert screen coordinates to 3D space
      targetPositionRef.current = {
        x: x * 15,
        y: y * 10 + 3,
        z: -10
      };
    };

    window.addEventListener('click', handleClick);

    // Animation
    let time = 0;
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);

      time += 0.01;

      if (astronautRef.current) {
        // Smooth interpolation to target position
        const lerpFactor = 0.05;
        currentPositionRef.current.x += (targetPositionRef.current.x - currentPositionRef.current.x) * lerpFactor;
        currentPositionRef.current.y += (targetPositionRef.current.y - currentPositionRef.current.y) * lerpFactor;
        currentPositionRef.current.z += (targetPositionRef.current.z - currentPositionRef.current.z) * lerpFactor;

        // Add gentle floating motion on top of position
        const floatOffset = Math.sin(time * 0.5) * 0.3;
        const driftOffset = Math.cos(time * 0.3) * 0.5;
        
        astronautRef.current.position.x = currentPositionRef.current.x + driftOffset;
        astronautRef.current.position.y = currentPositionRef.current.y + floatOffset;
        astronautRef.current.position.z = currentPositionRef.current.z;
        
        // Gentle rotation
        astronautRef.current.rotation.y = Math.sin(time * 0.3) * 0.2;
        astronautRef.current.rotation.z = Math.cos(time * 0.4) * 0.1;
        
        // Arm animation
        leftArm.rotation.z = Math.PI / 4 + Math.sin(time * 0.8) * 0.2;
        rightArm.rotation.z = -Math.PI / 4 - Math.sin(time * 0.8) * 0.2;
        
        // Leg animation
        leftLeg.rotation.x = Math.sin(time * 0.6) * 0.1;
        rightLeg.rotation.x = -Math.sin(time * 0.6) * 0.1;

        // Glow pulse
        glow1.scale.setScalar(1 + Math.sin(time * 2) * 0.2);
        glow2.scale.setScalar(1 + Math.cos(time * 2) * 0.2);
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
      window.removeEventListener("click", handleClick);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      // Cleanup geometries and materials
      [helmetGeometry, visorGeometry, bodyGeometry, armGeometry, legGeometry, 
       backpackGeometry, accentGeometry, glowGeometry].forEach(geo => geo.dispose());
      [helmetMaterial, visorMaterial, bodyMaterial, armMaterial, legMaterial, 
       backpackMaterial, accentMaterial, glowMaterial].forEach(mat => mat.dispose());
      
      renderer.dispose();
    };
  }, [isInView]);

  return <canvas ref={canvasRef} className="absolute inset-0" />;
}
