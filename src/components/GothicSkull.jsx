import React, { useRef, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment, Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Fallback component if model fails to load or during loading
const FallbackSkull = (props) => {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.01;
        }
    });

    return (
        <mesh ref={meshRef} {...props}>
            <dodecahedronGeometry args={[1.2, 0]} /> {/* Angular, somewhat skull-like primitive */}
            <meshStandardMaterial
                color="#1a1a1a"
                emissive="#e11d48"
                emissiveIntensity={0.5}
                roughness={0.2}
                metalness={0.8}
                wireframe={true} // Cyber-gothic look
            />
        </mesh>
    );
};

const SkullModel = (props) => {
    const group = useRef();
    // Using a distinct URL to catch failures easily if file doesn't exist
    const { nodes, materials } = useGLTF('/skull.gltf', true); // true = useDraco (optional, keeps it simple)

    // Auto-rotate the group
    useFrame((state) => {
        if (group.current) {
            group.current.rotation.y = state.clock.getElapsedTime() * 0.2; // Slow rotation
        }
    });

    // If we actually have nodes, render them. 
    // Note: This layout depends on the specific GLTF structure. 
    // Since we don't have the file, we'll try to render the whole scene or just the first node.
    // For robustness with unknown models, <primitive object={scene} /> is best.
    const { scene } = useGLTF('/skull.gltf');

    // Apply our custom material to all meshes in the scene
    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                child.material = new THREE.MeshStandardMaterial({
                    color: '#1a1a1a', // Dark Obsidian
                    emissive: '#e11d48', // Blood Red Glow
                    emissiveIntensity: 0.2,
                    roughness: 0.1,
                    metalness: 0.9,
                });
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
    }, [scene]);

    return (
        <group ref={group} {...props} dispose={null}>
            <primitive object={scene} scale={[1.5, 1.5, 1.5]} />
        </group>
    );
};

// Error Boundary for the model loader
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.warn("Failed to load 3D model, falling back to placeholder.", error);
    }

    render() {
        if (this.state.hasError) {
            return <FallbackSkull scale={[1.2, 1.2, 1.2]} />;
        }

        return this.props.children;
    }
}

const GothicSkull = () => {
    return (
        <div className="w-full h-full min-h-[300px] flex items-center justify-center relative z-10">
            <Canvas shadows dpr={[1, 2]} gl={{ preserveDrawingBuffer: true, alpha: true }}>
                <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />

                {/* Mood Lighting */}
                <ambientLight intensity={0.2} />

                {/* Demonic Red Eyes/Core Light */}
                <pointLight
                    position={[0, 0, 0]}
                    intensity={2}
                    color="#e11d48"
                    distance={5}
                    decay={2}
                />

                {/* Overhead Dramatic Light */}
                <spotLight
                    position={[0, 5, 2]}
                    angle={0.5}
                    penumbra={1}
                    intensity={2}
                    color="#ff0000"
                    castShadow
                />

                {/* Floating Animation Wrapper */}
                <Float
                    speed={2} // Animation speed
                    rotationIntensity={0.2} // XYZ rotation intensity
                    floatIntensity={1} // Up/down float intensity
                    floatingRange={[-0.2, 0.2]} // Range of y-axis values
                >
                    <ErrorBoundary>
                        <Suspense fallback={<FallbackSkull scale={[1, 1, 1]} />}>
                            {/* We try to load the model. If it fails (file missing), ErrorBoundary catches it and shows FallbackSkull */}
                            <SkullModel />
                        </Suspense>
                    </ErrorBoundary>
                </Float>
            </Canvas>
        </div>
    );
};

// Preload to avoid pop-in if the file existed
useGLTF.preload('/skull.gltf');

export default GothicSkull;
