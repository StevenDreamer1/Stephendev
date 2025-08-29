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
    const lines = useRef<any>(null);
    const particlePositions = useRef<Float32Array | null>(null);
    const particleColors = useRef<Float32Array | null>(null); // Store particle colors
    const numParticles = 300; // Increased particle count for a denser network
    const particleSize = 0.8; // Slightly increased particle size
    const maxDistance = 90; // Increased max distance for more connections
    const animationSpeed = 0.00005; // Slower, smoother animation speed

    // Function to initialize the Three.js scene
    const initThree = useCallback(() => {
        // Ensure THREE is available globally
        if (!window.THREE || !mountRef.current) return;

        const THREE = window.THREE; // Reference the global THREE

        // Scene
        scene.current = new THREE.Scene();

        // Camera
        camera.current = new THREE.PerspectiveCamera(
            75,
            mountRef.current.clientWidth / mountRef.current.clientHeight,
            0.1,
            1000
        );
        camera.current.position.z = 200; // Adjusted camera position

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
            opacity: 0.7 // Make particles slightly more opaque
        });

        const pGeometry = new THREE.BufferGeometry();
        particlePositions.current = positions; // Store positions for animation
        particleColors.current = colors; // Store colors for potential dynamic changes

        for (let i = 0; i < numParticles; i++) {
            const i3 = i * 3;
            positions[i3] = (Math.random() * 400) - 200; // x
            positions[i3 + 1] = (Math.random() * 400) - 200; // y
            positions[i3 + 2] = (Math.random() * 400) - 200; // z

            // Subtle color variation (e.g., shades of blue/purple/white)
            colors[i3] = Math.random() * 0.2 + 0.6; // Red component (more blue/purple)
            colors[i3 + 1] = Math.random() * 0.2 + 0.7; // Green component
            colors[i3 + 2] = Math.random() * 0.5 + 0.5; // Blue component (more white/light blue)
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
            opacity: 0.8, // Make lines more opaque
            linewidth: 1 // Attempt to make lines thicker (may require WebGLRenderer.setLineWidth for older versions)
        });
        lines.current = new THREE.LineSegments(lineGeometry, lineMaterial);
        scene.current.add(lines.current);

    }, []);

    // Animation loop
    const animate = useCallback(() => {
        requestAnimationFrame(animate);

        if (particles.current && particlePositions.current && lines.current && renderer.current && camera.current && scene.current && window.THREE) {
            const THREE = window.THREE; // Reference the global THREE
            const positions = particlePositions.current;
            const linePositions = (lines.current.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
            const lineColors = (lines.current.geometry.attributes.color as THREE.BufferAttribute).array as Float32Array;
            let lineIndex = 0;

            // Update particle positions
            for (let i = 0; i < numParticles; i++) {
                const i3 = i * 3;
                // Smoother, less erratic movement
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

                        // Line color (white with varying alpha, slightly tinted)
                        lineColors[lineIndex - 6] = alpha * 0.8 + 0.2; // R
                        lineColors[lineIndex - 5] = alpha * 0.9 + 0.1; // G
                        lineColors[lineIndex - 4] = alpha * 1.0;       // B
                        lineColors[lineIndex - 3] = alpha * 0.8 + 0.2; // R
                        lineColors[lineIndex - 2] = alpha * 0.9 + 0.1; // G
                        lineColors[lineIndex - 1] = alpha * 1.0;       // B

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
            camera.current.rotation.y += 0.0003; // Slower rotation
            camera.current.rotation.x += 0.0001; // Slower rotation

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
        // Only initialize if THREE is available
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
            lines.current = null;
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
