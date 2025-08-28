import React, { useRef, useEffect, useCallback } from 'react';
// import * as THREE from 'three'; // REMOVED: We will use global THREE from CDN

const ParticleBackground = () => {
    const mountRef = useRef<HTMLDivElement>(null);
    const scene = useRef<any>(null); // Use 'any' or define THREE types if available globally
    const camera = useRef<any>(null);
    const renderer = useRef<any>(null);
    const cube = useRef<any>(null);

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
        camera.current.position.z = 5;

        // Renderer
        renderer.current = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.current.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        mountRef.current.appendChild(renderer.current.domElement);

        // Cube
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Red cube
        cube.current = new THREE.Mesh(geometry, material);
        scene.current.add(cube.current);

    }, []);

    // Animation loop
    const animate = useCallback(() => {
        requestAnimationFrame(animate);

        if (cube.current && renderer.current && camera.current && scene.current) {
            cube.current.rotation.x += 0.01;
            cube.current.rotation.y += 0.01;
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
            // Fallback or error handling if THREE is not loaded
            console.error("THREE.js not loaded. ParticleBackground will not render.");
            // You might want to render a placeholder or a different background here
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
            cube.current = null;
        };
    }, [initThree, animate, onWindowResize]);

    return (
        <div ref={mountRef} className="absolute inset-0 z-0 overflow-hidden">
            {/* The 3D animation will be rendered here */}
        </div>
    );
};

export default ParticleBackground;
