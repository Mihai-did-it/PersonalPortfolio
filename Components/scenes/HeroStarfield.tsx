import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroStarfield({ canvasRef, isInView }) {
  const sceneRef = useRef<any>(null);
  const rendererRef = useRef<any>(null);
  const starsRef = useRef<any>(null);
  const animationFrameRef = useRef<any>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const nebulaCloudsRef = useRef<any[]>([]);

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

    // Create multiple layers of stars with cyan/teal/purple gradient colors
    const starLayers: Array<{
      mesh: THREE.Points;
      velocities: Float32Array;
      material: THREE.ShaderMaterial;
      config: { count: number; size: number; speed: number; color: number };
    }> = [];
    
    // Enhanced color palette: cyan, teal, light blue, hints of purple
    const layerConfigs = [
      { count: 2500, size: 1.0, speed: 0.25, color: 0x22d3ee }, // Cyan
      { count: 2000, size: 1.4, speed: 0.18, color: 0x06b6d4 }, // Teal
      { count: 1500, size: 1.8, speed: 0.12, color: 0x67e8f9 }, // Light cyan
      { count: 1000, size: 2.2, speed: 0.08, color: 0xa78bfa }  // Purple accent
    ];

    layerConfigs.forEach((config, layerIndex) => {
      const starGeometry = new THREE.BufferGeometry();
      const positions = new Float32Array(config.count * 3);
      const velocities = new Float32Array(config.count * 3);
      const phases = new Float32Array(config.count); // For varied twinkling

      for (let i = 0; i < config.count; i++) {
        const i3 = i * 3;
        positions[i3] = (Math.random() - 0.5) * 120;
        positions[i3 + 1] = (Math.random() - 0.5) * 120;
        positions[i3 + 2] = (Math.random() - 0.5) * 60 - (layerIndex * 12);

        velocities[i3] = (Math.random() - 0.5) * 0.025 * config.speed;
        velocities[i3 + 1] = (Math.random() - 0.5) * 0.025 * config.speed;
        velocities[i3 + 2] = (Math.random() - 0.5) * 0.025 * config.speed;
        
        phases[i] = Math.random() * Math.PI * 2; // Random phase for each star
      }

      starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      starGeometry.setAttribute('phase', new THREE.BufferAttribute(phases, 1));

      // Enhanced shader material with more dynamic twinkling
      const starMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color: { value: new THREE.Color(config.color) },
          size: { value: config.size },
          mouseX: { value: 0 },
          mouseY: { value: 0 }
        },
        vertexShader: `
          uniform float size;
          uniform float time;
          uniform float mouseX;
          uniform float mouseY;
          attribute float phase;
          varying float vAlpha;
          varying vec3 vPosition;
          
          void main() {
            vPosition = position;
            
            // More dynamic twinkling with phase offset
            float twinkle = 0.5 + 0.5 * sin(time * 3.0 + phase + position.x * 0.3 + position.y * 0.2);
            
            // Pulse effect
            float pulse = 0.8 + 0.2 * sin(time * 1.5 + phase);
            
            // Mouse interaction - stars brighten near cursor
            float distToMouse = distance(vec2(position.x * 0.05, position.y * 0.05), vec2(mouseX, mouseY));
            float mouseInfluence = smoothstep(1.5, 0.0, distToMouse) * 0.5;
            
            vAlpha = twinkle * pulse + mouseInfluence;
            
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * (300.0 / -mvPosition.z) * (0.8 + mouseInfluence * 0.5);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          uniform vec3 color;
          varying float vAlpha;
          varying vec3 vPosition;
          
          void main() {
            float dist = length(gl_PointCoord - vec2(0.5));
            if (dist > 0.5) discard;
            
            // Soft glow effect
            float alpha = (1.0 - dist * 2.0) * vAlpha;
            
            // Add color variation based on position
            vec3 finalColor = color;
            finalColor += vec3(0.1, 0.15, 0.2) * sin(vPosition.x * 0.1);
            
            gl_FragColor = vec4(finalColor, alpha * 0.9);
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

    // Create nebula-like clouds with cyan/purple gradients
    const createNebulaClouds = () => {
      const cloudCount = 8;
      const clouds: any[] = [];

      for (let i = 0; i < cloudCount; i++) {
        const cloudGeometry = new THREE.SphereGeometry(8 + Math.random() * 5, 16, 16);
        
        const cloudMaterial = new THREE.ShaderMaterial({
          uniforms: {
            time: { value: 0 },
            colorA: { value: new THREE.Color(0x22d3ee) }, // Cyan
            colorB: { value: new THREE.Color(0x8b5cf6) }, // Purple
            opacity: { value: 0.03 + Math.random() * 0.02 }
          },
          vertexShader: `
            varying vec3 vPosition;
            varying vec3 vNormal;
            
            void main() {
              vPosition = position;
              vNormal = normal;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            uniform float time;
            uniform vec3 colorA;
            uniform vec3 colorB;
            uniform float opacity;
            varying vec3 vPosition;
            varying vec3 vNormal;
            
            void main() {
              // Create flowing gradient
              float pattern = sin(vPosition.x * 0.3 + time * 0.5) * 
                             cos(vPosition.y * 0.2 + time * 0.3) * 
                             sin(vPosition.z * 0.4 + time * 0.4);
              
              vec3 color = mix(colorA, colorB, pattern * 0.5 + 0.5);
              
              // Fade at edges
              float edgeFade = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);
              
              gl_FragColor = vec4(color, opacity * edgeFade);
            }
          `,
          transparent: true,
          blending: THREE.AdditiveBlending,
          side: THREE.DoubleSide,
          depthWrite: false
        });

        const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
        cloud.position.set(
          (Math.random() - 0.5) * 80,
          (Math.random() - 0.5) * 60,
          -30 - Math.random() * 30
        );
        cloud.rotation.set(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        );

        clouds.push({
          mesh: cloud,
          rotationSpeed: {
            x: (Math.random() - 0.5) * 0.0005,
            y: (Math.random() - 0.5) * 0.0008,
            z: (Math.random() - 0.5) * 0.0005
          }
        });
        scene.add(cloud);
      }

      nebulaCloudsRef.current = clouds;
    };

    createNebulaClouds();

    // Shooting stars with cyan trails
    const shootingStars: Array<{
      mesh: THREE.Line;
      velocity: { x: number; y: number; z: number };
      life: number;
    }> = [];

    const createShootingStar = () => {
      if (shootingStars.length > 4) return;

      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array([
        0, 0, 0,
        0, 0, 0
      ]);
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const material = new THREE.LineBasicMaterial({
        color: 0x22d3ee, // Cyan color
        transparent: true,
        opacity: 0.8,
        linewidth: 2
      });

      const line = new THREE.Line(geometry, material);
      
      line.position.set(
        (Math.random() - 0.5) * 80,
        Math.random() * 40 + 20,
        Math.random() * -30 - 10
      );

      const velocity = {
        x: (Math.random() - 0.7) * 0.8,
        y: -(Math.random() * 0.5 + 0.5),
        z: (Math.random() - 0.5) * 0.3
      };

      shootingStars.push({
        mesh: line,
        velocity,
        life: 1.0
      });

      scene.add(line);
    };

    // Mouse move handler
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let time = 0;
    const animate = () => {
      if (!isInView) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      time += 0.01;

      // Update stars
      starsRef.current.forEach((layer) => {
        const positions = layer.mesh.geometry.attributes.position.array;
        
        // Update star positions for floating effect
        for (let i = 0; i < positions.length; i += 3) {
          positions[i] += layer.velocities[i];
          positions[i + 1] += layer.velocities[i + 1];
          positions[i + 2] += layer.velocities[i + 2];

          // Wrap around
          if (Math.abs(positions[i]) > 60) positions[i] *= -0.95;
          if (Math.abs(positions[i + 1]) > 60) positions[i + 1] *= -0.95;
          if (positions[i + 2] > 10) positions[i + 2] = -50;
          if (positions[i + 2] < -50) positions[i + 2] = 10;
        }

        layer.mesh.geometry.attributes.position.needsUpdate = true;
        layer.material.uniforms.time.value = time;
        layer.material.uniforms.mouseX.value = mouseRef.current.x * 10;
        layer.material.uniforms.mouseY.value = mouseRef.current.y * 10;
      });

      // Update nebula clouds
      nebulaCloudsRef.current.forEach((cloud) => {
        cloud.mesh.rotation.x += cloud.rotationSpeed.x;
        cloud.mesh.rotation.y += cloud.rotationSpeed.y;
        cloud.mesh.rotation.z += cloud.rotationSpeed.z;
        cloud.mesh.material.uniforms.time.value = time;
      });

      // Create shooting stars randomly
      if (Math.random() < 0.01) {
        createShootingStar();
      }

      // Update shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const star = shootingStars[i];
        
        star.mesh.position.x += star.velocity.x;
        star.mesh.position.y += star.velocity.y;
        star.mesh.position.z += star.velocity.z;

        const positions = star.mesh.geometry.attributes.position.array as Float32Array;
        positions[0] = 0;
        positions[1] = 0;
        positions[2] = 0;
        positions[3] = -star.velocity.x * 5;
        positions[4] = -star.velocity.y * 5;
        positions[5] = -star.velocity.z * 5;
        star.mesh.geometry.attributes.position.needsUpdate = true;

        star.life -= 0.01;
        (star.mesh.material as THREE.LineBasicMaterial).opacity = star.life * 0.8;

        if (star.life <= 0) {
          scene.remove(star.mesh);
          shootingStars.splice(i, 1);
        }
      }

      renderer.render(scene, camera);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      renderer.dispose();
    };
  }, [canvasRef, isInView]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}
