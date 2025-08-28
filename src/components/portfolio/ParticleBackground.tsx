import React, { useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';

const ParticleBackground = () => {
    const mountRef = useRef<HTMLDivElement>(null);
    const scene = useRef<THREE.Scene | null>(null);
    const camera = useRef<THREE.PerspectiveCamera | null>(null);
    const renderer = useRef<THREE.WebGLRenderer | null>(null);
    const particles = useRef<THREE.Points | null>(null);
    const lines = useRef<THREE.LineSegments | null>(null);
    const particlePositions = useRef<Float32Array | null>(null);
    const numParticles = 200;
    const particleSize = 0.5;
    const maxDistance = 70; // Max distance for lines to connect

    // Function to initialize the Three.js scene
    const initThree = useCallback(() => {
        if (!mountRef.current) return;

        // Scene
        scene.current = new THREE.Scene();

        // Camera
        camera.current = new THREE.PerspectiveCamera(
            75,
            mountRef.current.clientWidth / mountRef.current.clientHeight,
            0.1,
            1000
        );
        camera.current.position.z = 150;

        // Renderer
        renderer.current = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.current.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        mountRef.current.appendChild(renderer.current.domElement);

        // Particles
        const positions = new Float32Array(numParticles * 3);
        const colors = new Float32Array(numParticles * 3);
        const pMaterial = new THREE.PointsMaterial({
            size: particleSize,
            vertexColors: true,
            blending: THREE.AdditiveBlending,
            transparent: true,
            sizeAttenuation: true,
        });

        const pGeometry = new THREE.BufferGeometry();
        particlePositions.current = positions; // Store positions for animation

        for (let i = 0; i < numParticles; i++) {
            const i3 = i * 3;
            positions[i3] = (Math.random() * 400) - 200; // x
            positions[i3 + 1] = (Math.random() * 400) - 200; // y
            positions[i3 + 2] = (Math.random() * 400) - 200; // z

            // Random color for each particle
            colors[i3] = Math.random();
            colors[i3 + 1] = Math.random();
            colors[i3 + 2] = Math.random();
        }

        pGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        pGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        particles.current = new THREE.Points(pGeometry, pMaterial);
        scene.current.add(particles.current);

        // Lines
        const lineGeometry = new THREE.BufferGeometry();
        const linePositions = new Float32Array(numParticles * numParticles * 3 * 2); // Max possible lines
        const lineColors = new Float32Array(numParticles * numParticles * 3 * 2);
        lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
        lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

        const lineMaterial = new THREE.LineBasicMaterial({
            vertexColors: true,
            blending: THREE.AdditiveBlending,
            transparent: true,
            opacity: 0.5,
        });
        lines.current = new THREE.LineSegments(lineGeometry, lineMaterial);
        scene.current.add(lines.current);

    }, []);

    // Animation loop
    const animate = useCallback(() => {
        requestAnimationFrame(animate);

        if (particles.current && particlePositions.current && lines.current && renderer.current && camera.current && scene.current) {
            const positions = particlePositions.current;
            const linePositions = (lines.current.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
            const lineColors = (lines.current.geometry.attributes.color as THREE.BufferAttribute).array as Float32Array;
            let lineIndex = 0;

            // Update particle positions
            for (let i = 0; i < numParticles; i++) {
                const i3 = i * 3;
                // Simple movement
                positions[i3] += 0.1 * Math.sin(i * 0.1 + Date.now() * 0.0001);
                positions[i3 + 1] += 0.1 * Math.cos(i * 0.1 + Date.now() * 0.0001);
                positions[i3 + 2] += 0.1 * Math.sin(i * 0.1 + Date.now() * 0.0001);

                // Keep particles within bounds
                if (positions[i3] > 200) positions[i3] = -200;
                if (positions[i3] < -200) positions[i3] = 200;
                if (positions[i3 + 1] > 200) positions[i3 + 1] = -200;
                if (positions[i3 + 1] < -200) positions[i3 + 1] = 200;
                if (positions[i3 + 2] > 200) positions[i3 + 2] = -200;
                if (positions[i3 + 2] < -200) positions[i3 + 2] = 200;
            }
            particles.current.geometry.attributes.position.needsUpdate = true;

            // Update lines
            for (let i = 0; i < numParticles; i++) {
                for (let j = i + 1; j < numParticles; j++) {
                    const i3 = i * 3;
                    const j3 = j * 3;

                    const dx = positions[i3] - positions[j3];
                    const dy = positions[i3 + 1] - positions[j3 + 1];
                    const dz = positions[i3 + 2] - positions[j3 + 2];
                    const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

                    if (distance < maxDistance) {
                        const alpha = 1 - (distance / maxDistance); // Fade lines based on distance

                        // Start point of the line
                        linePositions[lineIndex++] = positions[i3];
                        linePositions[lineIndex++] = positions[i3 + 1];
                        linePositions[lineIndex++] = positions[i3 + 2];

                        // End point of the line
                        linePositions[lineIndex++] = positions[j3];
                        linePositions[lineIndex++] = positions[j3 + 1];
                        linePositions[lineIndex++] = positions[j3 + 2];

                        // Line color (white with varying alpha)
                        lineColors[lineIndex - 6] = 1;
                        lineColors[lineIndex - 5] = 1;
                        lineColors[lineIndex - 4] = 1;
                        lineColors[lineIndex - 3] = 1;
                        lineColors[lineIndex - 2] = 1;
                        lineColors[lineIndex - 1] = 1;

                        (lines.current.material as THREE.LineBasicMaterial).opacity = alpha;
                    }
                }
            }

            // Clear unused line segments
            for (let i = lineIndex; i < linePositions.length; i++) {
                linePositions[i] = 0;
                lineColors[i] = 0;
            }
            (lines.current.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
            (lines.current.geometry.attributes.color as THREE.BufferAttribute).needsUpdate = true;
            lines.current.geometry.setDrawRange(0, lineIndex / 3);

            // Rotate camera slightly for a dynamic feel
            camera.current.rotation.y += 0.0005;
            camera.current.rotation.x += 0.0002;

            renderer.current.render(scene.current, camera.current);
        }
    }, []);

    // Handle window resize
    const onWindowResize = useCallback(() => {
        if (camera.current && renderer.current && mountRef.current) {
            camera.current.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
            camera.current.updateProjectionMatrix();
            renderer.current.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        }
    }, []);

    useEffect(() => {
        initThree();
        animate();

        window.addEventListener('resize', onWindowResize);

        return () => {
            window.removeEventListener('resize', onWindowResize);
            if (mountRef.current && renderer.current && renderer.current.domElement) {
                mountRef.current.removeChild(renderer.current.domElement);
                renderer.current.dispose();
            }
            scene.current = null;
            camera.current = null;
            renderer.current = null;
            particles.current = null;
            lines.current = null;
            particlePositions.current = null;
        };
    }, [initThree, animate, onWindowResize]);

    return (
        <div ref={mountRef} className="absolute inset-0 z-0 overflow-hidden">
            {/* The 3D animation will be rendered here */}
        </div>
    );
};

export default ParticleBackground;

