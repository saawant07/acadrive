import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, RoundedBox } from '@react-three/drei';

const ProceduralSkull = (props) => {
    const group = useRef();

    // Auto-rotate the skull
    useFrame((state) => {
        if (group.current) {
            group.current.rotation.y = state.clock.getElapsedTime() * 0.5; // Moderate rotation
        }
    });

    const boneMaterial = {
        color: "#4a0404", // Dark Crimson / Dried Blood
        roughness: 0.1,   // Wet/Polished look
        metalness: 0.5,   // Obsidian-like
    };

    return (
        <group ref={group} {...props}>
            {/* Cranium - Main Head */}
            <mesh position={[0, 0.4, 0]}>
                <sphereGeometry args={[1.2, 32, 32]} />
                <meshStandardMaterial {...boneMaterial} />
            </mesh>

            {/* Jaw - Slightly below, protruding forward */}
            <RoundedBox args={[1.4, 1, 1.2]} radius={0.2} smoothness={4} position={[0, -0.6, 0.3]}>
                <meshStandardMaterial {...boneMaterial} />
            </RoundedBox>

            {/* Eye Sockets - Deeply inset spheres */}
            <group position={[0, 0.4, 0.9]}>
                {/* Left Eye */}
                <mesh position={[-0.4, 0, 0]}>
                    <sphereGeometry args={[0.35, 16, 16]} />
                    <meshStandardMaterial color="black" roughness={1} />
                    {/* Inner Demonic Glow */}
                    <pointLight color="#ff0000" intensity={5} distance={2} decay={2} />
                </mesh>

                {/* Right Eye */}
                <mesh position={[0.4, 0, 0]}>
                    <sphereGeometry args={[0.35, 16, 16]} />
                    <meshStandardMaterial color="black" roughness={1} />
                    {/* Inner Demonic Glow */}
                    <pointLight color="#ff0000" intensity={5} distance={2} decay={2} />
                </mesh>
            </group>
        </group>
    );
};

const GothicSkull = ({ className = "w-full h-full" }) => {
    return (
        <div className={`relative z-10 ${className}`}>
            <Canvas shadows dpr={[1, 2]} gl={{ preserveDrawingBuffer: true, alpha: true }}>
                <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={45} />

                {/* Scene Lighting */}
                <ambientLight intensity={0.2} />

                {/* Overhead Highlight */}
                <spotLight
                    position={[0, 5, 2]}
                    angle={0.5}
                    penumbra={1}
                    intensity={2}
                    color="#ff0000"
                />

                {/* Floating Animation Wrapper */}
                <Float
                    speed={2}
                    rotationIntensity={0} // We handle rotation in the component manually for control
                    floatIntensity={1}
                    floatingRange={[-0.2, 0.2]}
                >
                    <ProceduralSkull />
                </Float>
            </Canvas>
        </div>
    );
};

export default GothicSkull;
