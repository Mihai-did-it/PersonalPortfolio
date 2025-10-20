import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function InteractiveStarfield({ canvasRef, isInView }) {
  const sceneRef = useRef<any>(null);
  const rendererRef = useRef<any>(null);
  const starsRef = useRef<any>(null);
  const animationFrameRef = useRef<any>(null);
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
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    rendererRef.current = renderer;

    // Create multiple layers of stars with different depths
    const starLayers = [];
    const layerConfigs = [
      { count: 2000, size: 0.8, speed: 0.2, color: 0xffffff },
      { count: 1600, size: 1.2, speed: 0.15, color: 0x88ccff },
      { count: 1200, size: 1.5, speed: 0.1, color: 0x66aaff }
    ];

    layerConfigs.forEach((config, layerIndex) => {
      const starGeometry = new THREE.BufferGeometry();
      const positions = new Float32Array(config.count * 3);
      const velocities = new Float32Array(config.count * 3);

      for (let i = 0; i < config.count; i++) {
        const i3 = i * 3;
        positions[i3] = (Math.random() - 0.5) * 100;
        positions[i3 + 1] = (Math.random() - 0.5) * 100;
        positions[i3 + 2] = (Math.random() - 0.5) * 50 - (layerIndex * 10);

        velocities[i3] = (Math.random() - 0.5) * 0.02 * config.speed;
        velocities[i3 + 1] = (Math.random() - 0.5) * 0.02 * config.speed;
        velocities[i3 + 2] = (Math.random() - 0.5) * 0.02 * config.speed;
      }

      starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      // Create shader material for twinkling stars
      const starMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color: { value: new THREE.Color(config.color) },
          size: { value: config.size }
        },
        vertexShader: `
          uniform float size;
          uniform float time;
          varying float vAlpha;
          
          void main() {
            vAlpha = 0.5 + 0.5 * sin(time * 2.0 + position.x * 0.5);
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          uniform vec3 color;
          varying float vAlpha;
          
          void main() {
            float dist = length(gl_PointCoord - vec2(0.5));
            if (dist > 0.5) discard;
            float alpha = (1.0 - dist * 2.0) * vAlpha;
            gl_FragColor = vec4(color, alpha);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });

      const stars = new THREE.Points(starGeometry, starMaterial);
      starLayers.push({ 
        mesh: stars, 
        velocities, 
        material: starMaterial, 
        config 
      });
      scene.add(stars);
    });

    starsRef.current = starLayers;

    // Shooting stars
    const shootingStars = [];
    const createShootingStar = () => {
      if (shootingStars.length > 5) return;

      const geometry = new THREE.BufferGeometry();
      const material = new THREE.LineBasicMaterial({
        color: 0x88ccff,
        transparent: true,
        opacity: 0.8,
        linewidth: 2
      });

      const startX = (Math.random() - 0.5) * 80;
      const startY = 30 + Math.random() * 20;
      const startZ = -30;

      const points = [];
      for (let i = 0; i < 10; i++) {
        points.push(new THREE.Vector3(
          startX - i * 0.5,
          startY - i * 0.8,
          startZ
        ));
      }

      geometry.setFromPoints(points);
      const line = new THREE.Line(geometry, material);
      
      shootingStars.push({
        mesh: line,
        velocity: { x: -0.5, y: -0.8, z: 0 },
        life: 100
      });
      
      scene.add(line);
    };

    // Meteors
    const meteors = [];
    const createMeteor = () => {
      if (meteors.length > 3) return;

      const geometry = new THREE.SphereGeometry(0.3, 8, 8);
      const material = new THREE.MeshBasicMaterial({
        color: 0xff6600,
        transparent: true,
        opacity: 0.9
      });

      const meteor = new THREE.Mesh(geometry, material);
      meteor.position.set(
        (Math.random() - 0.5) * 60,
        30 + Math.random() * 10,
        -20
      );

      // Add glow
      const glowGeometry = new THREE.SphereGeometry(0.6, 8, 8);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0xff8800,
        transparent: true,
        opacity: 0.3
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      meteor.add(glow);

      meteors.push({
        mesh: meteor,
        velocity: { x: -0.3 + Math.random() * -0.2, y: -0.5, z: 0 },
        life: 150
      });

      scene.add(meteor);
    };

    // Mouse interaction
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    let time = 0;
    let shootingStarTimer = 0;
    let meteorTimer = 0;

    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      
      if (!isInView) return;

      time += 0.01;
      shootingStarTimer++;
      meteorTimer++;

      // Update star layers
      if (starsRef.current) {
        starsRef.current.forEach((layer: any) => {
          const positions = layer.mesh.geometry.attributes.position.array;
          const velocities = layer.velocities;

          // Update shader uniform for twinkling
          layer.material.uniforms.time.value = time;

          for (let i = 0; i < positions.length; i += 3) {
            positions[i] += velocities[i];
            positions[i + 1] += velocities[i + 1];
            positions[i + 2] += velocities[i + 2];

            // Parallax effect based on mouse position
            positions[i] += mouseRef.current.x * 0.001 * layer.config.speed;
            positions[i + 1] += mouseRef.current.y * 0.001 * layer.config.speed;

            // Wrap around
            if (Math.abs(positions[i]) > 50) velocities[i] *= -1;
            if (Math.abs(positions[i + 1]) > 50) velocities[i + 1] *= -1;
            if (positions[i + 2] > 25 || positions[i + 2] < -50) velocities[i + 2] *= -1;
          }

          layer.mesh.geometry.attributes.position.needsUpdate = true;
        });
      }

      // Create shooting stars randomly
      if (shootingStarTimer > 180 && Math.random() > 0.98) {
        createShootingStar();
        shootingStarTimer = 0;
      }

      // Create meteors randomly
      if (meteorTimer > 300 && Math.random() > 0.98) {
        createMeteor();
        meteorTimer = 0;
      }

      // Update shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const star = shootingStars[i];
        const positions = star.mesh.geometry.attributes.position.array;
        
        for (let j = 0; j < positions.length; j += 3) {
          positions[j] += star.velocity.x;
          positions[j + 1] += star.velocity.y;
        }
        
        star.mesh.geometry.attributes.position.needsUpdate = true;
        star.life--;

        if (star.life <= 0) {
          scene.remove(star.mesh);
          star.mesh.geometry.dispose();
          star.mesh.material.dispose();
          shootingStars.splice(i, 1);
        }
      }

      // Update meteors
      for (let i = meteors.length - 1; i >= 0; i--) {
        const meteor = meteors[i];
        meteor.mesh.position.x += meteor.velocity.x;
        meteor.mesh.position.y += meteor.velocity.y;
        meteor.mesh.rotation.x += 0.1;
        meteor.mesh.rotation.y += 0.15;
        meteor.life--;

        if (meteor.life <= 0) {
          scene.remove(meteor.mesh);
          meteor.mesh.geometry.dispose();
          meteor.mesh.material.dispose();
          meteors.splice(i, 1);
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
      renderer.dispose();
    };
  }, [isInView]);

  return <canvas ref={canvasRef} className="absolute inset-0" />;
}
