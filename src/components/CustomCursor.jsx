import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Mouse position values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring for the trail (Blood Drop)
    const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
    const trailX = useSpring(mouseX, springConfig);
    const trailY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleHoverStart = (e) => {
            if (
                e.target.tagName === 'BUTTON' ||
                e.target.tagName === 'A' ||
                e.target.tagName === 'INPUT' ||
                e.target.closest('button') || // Handle internal elements of buttons
                e.target.closest('a') ||
                e.target.classList.contains('cursor-hover-target') ||
                e.target.closest('.cursor-hover-target')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        const handleHoverEnd = () => {
            setIsHovering(false);
        };

        window.addEventListener('mousemove', moveCursor);
        // Use mouseover for event delegation to catch hover on elements
        window.addEventListener('mouseover', handleHoverStart);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleHoverStart);
        };
    }, [mouseX, mouseY, isVisible]);

    // Hide on touch devices or if not moved yet
    if (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0) return null;

    return (
        <>
            {/* 2. Interactive Trail (Blood Drop) */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9998]"
                style={{
                    x: trailX,
                    y: trailY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            >
                <div
                    className="w-3 h-3 rounded-full bg-red-600 blur-[1px] opacity-60"
                    style={{
                        boxShadow: '0 0 8px 1px rgba(220, 38, 38, 0.6)'
                    }}
                />
            </motion.div>

            {/* 1. Global Cursor Icon (Dagger) */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: mouseX,
                    y: mouseY,
                    // We don't center the dagger tip perfectly; we want the top-left to be the hot spot usually, 
                    // but for a dagger, the tip is the point. Let's adjust translateX/Y to align the tip.
                    // Assuming the SVG is drawn with tip at top-left (0,0).
                    translateX: '-10%',
                    translateY: '-10%',
                }}
                animate={{
                    scale: isHovering ? 1.5 : 1,
                    rotate: isHovering ? -15 : 0, // Slight tilt on hover for "Grasping" feel
                    opacity: isVisible ? 1 : 0, // Hide until moved
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                {/* Sharp SVG Dagger Icon */}
                <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Blade */}
                    <path
                        d="M12 2L14 8C14 8 15 11 15 13C15 15 14 17 12 19C10 17 9 15 9 13C9 11 10 8 10 8L12 2Z"
                        fill="#e11d48"
                        stroke="#1a0505"
                        strokeWidth="0.5"
                    />
                    {/* Handle/Crossguard */}
                    <path
                        d="M8 8L16 8"
                        stroke="#e11d48"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                    <path
                        d="M12 19L12 22"
                        stroke="#e11d48"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                    {/* Subtle Glow */}
                    <circle cx="12" cy="12" r="6" stroke="rgba(225, 29, 72, 0.5)" strokeWidth="0" fill="rgba(225, 29, 72, 0.2)" className={isHovering ? 'animate-pulse' : ''} />
                </svg>
            </motion.div>
        </>
    );
};

export default CustomCursor;
