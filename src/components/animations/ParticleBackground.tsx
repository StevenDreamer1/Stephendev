import React, { useRef, useEffect, useCallback } from 'react';
// We are still relying on global THREE from CDN, so no import here.

// Declare THREE as a global variable so TypeScript knows about it
declare global {
  interface Window {
    THREE: typeof THREE; // This line tells TypeScript that window.THREE exists and has the type of the THREE module
  }
}

const ParticleBackground = () => {
    const mountRef = useRef<HTMLDivElement>(null);
    const scene = useRef<any>(null); // Using 'any' for window.THREE types
    const camera = useRef<any>(null);
    const renderer = useRef<any>(null);
    const particles = useRef<any>(null);
    const particlePositions = useRef<Float32Array | null>(null);
    const particleColors = useRef<Float32Array | null>(null);
    const numParticles = 300;
    const particleSize = 0.8;
    const animationSpeed = 0.00005;

    const circles = useRef<THREE.Mesh[]>([]); // Ref to store the moving circles

    // Function to initialize the Three.js scene
    const initThree = useCallback(() => {
        if (!window.THREE || !mountRef.current) return;

        const THREE = window.THREE;

        // Scene
        scene.current = new THREE.Scene();

        // Camera
        camera.current = new THREE.PerspectiveCamera(
            75,
            mountRef.current.clientWidth / mountRef.current.clientHeight,
            0.1,
            1000
        );
        camera.current.position.z = 200;

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
            opacity: 0.7
        });

        const pGeometry = new THREE.BufferGeometry();
        particlePositions.current = positions;
        particleColors.current = colors;

        for (let i = 0; i < numParticles; i++) {
            const i3 = i * 3;
            positions[i3] = (Math.random() * 400) - 200;
            positions[i3 + 1] = (Math.random() * 400) - 200;
            positions[i3 + 2] = (Math.random() * 400) - 200;

            colors[i3] = Math.random() * 0.2 + 0.6;
            colors[i3 + 1] = Math.random() * 0.2 + 0.7;
            colors[i3 + 2] = Math.random() * 0.5 + 0.5;
        }

        pGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        pGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        particles.current = new THREE.Points(pGeometry, pMaterial);
        scene.current.add(particles.current);

        // Moving Circles
        const numCircles = 5; // Number of large circles
        const circleRadius = 50; // Size of the circles
        const circleColors = [0x4a00e0, 0x8e2de2, 0xda22ff, 0x9d50bb, 0x6e48aa]; // Shades of purple/blue
        
        for (let i = 0; i < numCircles; i++) {
            const geometry = new THREE.SphereGeometry(circleRadius, 32, 32);
            const material = new THREE.MeshBasicMaterial({
                color: circleColors[i % circleColors.length],
                transparent: true,
                opacity: 0.15, // Subtle opacity
                blending: THREE.AdditiveBlending // Blending for glow effect
            });
            const circle = new THREE.Mesh(geometry, material);

            // Random initial positions for circles
            circle.position.x = (Math.random() * 800) - 400;
            circle.position.y = (Math.random() * 800) - 400;
            circle.position.z = (Math.random() * 400) - 200; // Keep them in the background depth

            scene.current.add(circle);
            circles.current.push(circle);
        }

    }, []);

    // Animation loop
    const animate = useCallback(() => {
        requestAnimationFrame(animate);

        if (particles.current && particlePositions.current && renderer.current && camera.current && scene.current && window.THREE) {
            const THREE = window.THREE;
            const positions = particlePositions.current;

            // Update particle positions
            for (let i = 0; i < numParticles; i++) {
                const i3 = i * 3;
                positions[i3] += 0.5 * Math.sin(i * 0.05 + Date.now() * animationSpeed);
                positions[i3 + 1] += 0.5 * Math.cos(i * 0.05 + Date.now() * animationSpeed);
                positions[i3 + 2] += 0.5 * Math.sin(i * 0.05 + Date.now() * animationSpeed);

                // Keep particles within bounds
                if (positions[i3] > 200) positions[i3] = -200;
                if (positions[i3] < -200) positions[i3] = 200;
                if (positions[i3 + 1] > 200) positions[i3 + 1] = -200;
                if (positions[i3 + 1] < -200) positions[i3 + 1] = 200;
                if (positions[i3 + 2] > 200) positions[i3 + 2] = -200;
                if (positions[i3 + 2] < -200) positions[i3 + 2] = 200;
            }
            particles.current.geometry.attributes.position.needsUpdate = true;

            // Animate circles
            circles.current.forEach((circle, index) => {
                // Simple sine/cosine movement for circles
                circle.position.x += 0.5 * Math.sin(index * 0.1 + Date.now() * animationSpeed * 2);
                circle.position.y += 0.5 * Math.cos(index * 0.1 + Date.now() * animationSpeed * 2);
                circle.position.z += 0.1 * Math.sin(index * 0.2 + Date.now() * animationSpeed);

                // Wrap around when circles go off-screen
                if (circle.position.x > 400) circle.position.x = -400;
                if (circle.position.x < -400) circle.position.x = 400;
                if (circle.position.y > 400) circle.position.y = -400;
                if (circle.position.y < -400) circle.position.y = 400;
                if (circle.position.z > 200) circle.position.z = -200;
                if (circle.position.z < -200) circle.position.z = 200;
            });

            // Rotate camera slightly for a dynamic feel
            camera.current.rotation.y += 0.0003;
            camera.current.rotation.x += 0.0001;

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
        if (window.THREE) {
            initThree();
            animate();
            window.addEventListener('resize', onWindowResize);
        } else {
            console.error("THREE.js not loaded. ParticleBackground will not render.");
        }

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
            circles.current = []; // Clear circles on cleanup
            particlePositions.current = null;
            particleColors.current = null;
        };
    }, [initThree, animate, onWindowResize]);

    return (
        <div ref={mountRef} className="absolute inset-0 z-0 overflow-hidden">
            {/* The 3D animation will be rendered here */}
        </div>
    );
};

export default ParticleBackground;
