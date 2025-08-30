"use client"
import { useEffect, useRef, useState } from "react";

interface CountUpProps {
    to: number;
    from?: number;
    direction?: "up" | "down";
    delay?: number;
    duration?: number;
    className?: string;
    startWhen?: boolean;
    separator?: string;
    onStart?: () => void;
    onEnd?: () => void;
}

interface MotionHooks {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useInView: (ref: React.RefObject<HTMLElement>, options?: any) => boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useMotionValue: (initial: number) => any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useSpring: (value: any, config: any) => any;
}

export default function CountUp({
    to,
    from = 0,
    direction = "up",
    delay = 0,
    duration = 2, // Duration of the animation in seconds
    className = "",
    startWhen = true,
    separator = "",
    onStart,
    onEnd,
}: CountUpProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const [motionHooks, setMotionHooks] = useState<MotionHooks | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [motionValue, setMotionValue] = useState<any>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [springValue, setSpringValue] = useState<any>(null);
    const [isInView, setIsInView] = useState(false);

    // Dynamically load framer-motion
    useEffect(() => {
        const loadFramerMotion = async () => {
            try {
                const motionModule = await import("framer-motion");
                const hooks: MotionHooks = {
                    useInView: motionModule.useInView,
                    useMotionValue: motionModule.useMotionValue,
                    useSpring: motionModule.useSpring
                };
                setMotionHooks(hooks);
                
                // Initialize motion values after loading
                const initialValue = direction === "down" ? to : from;
                const mv = hooks.useMotionValue(initialValue);
                setMotionValue(mv);
                
                // Calculate damping and stiffness based on duration
                const damping = 20 + 40 * (1 / duration);
                const stiffness = 100 * (1 / duration);
                
                const sv = hooks.useSpring(mv, { damping, stiffness });
                setSpringValue(sv);
            } catch (error) {
                console.error("Failed to load framer-motion:", error);
            }
        };
        loadFramerMotion();
    }, [direction, from, to, duration]);

    // Set up intersection observer for in-view detection
    useEffect(() => {
        if (!ref.current) return;
        
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                }
            },
            { threshold: 0.1 }
        );
        
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    // Set initial text content to the initial value based on direction
    useEffect(() => {
        if (ref.current) {
            ref.current.textContent = String(direction === "down" ? to : from);
        }
    }, [from, to, direction]);

    // Start the animation when in view and startWhen is true
    useEffect(() => {
        if (isInView && startWhen && motionValue) {
            if (typeof onStart === "function") {
                onStart();
            }

            const timeoutId = setTimeout(() => {
                motionValue.set(direction === "down" ? from : to);
            }, delay * 1000);

            const durationTimeoutId = setTimeout(() => {
                if (typeof onEnd === "function") {
                    onEnd();
                }
            }, delay * 1000 + duration * 1000);

            return () => {
                clearTimeout(timeoutId);
                clearTimeout(durationTimeoutId);
            };
        }
    }, [isInView, startWhen, motionValue, direction, from, to, delay, onStart, onEnd, duration]);

    // Update text content with formatted number on spring value change
    useEffect(() => {
        if (!springValue) return;
        
        const unsubscribe = springValue.on("change", (latest: number) => {
            if (ref.current) {
                const options = {
                    useGrouping: !!separator,
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                };

                const formattedNumber = Intl.NumberFormat("en-US", options).format(
                    Number(latest.toFixed(0))
                );

                ref.current.textContent = separator
                    ? formattedNumber.replace(/,/g, separator)
                    : formattedNumber;
            }
        });

        return () => unsubscribe();
    }, [springValue, separator]);

    // Show loading state while framer-motion is loading
    if (!motionHooks || !motionValue || !springValue) {
        return (
            <span className={`${className}`} ref={ref}>
                {direction === "down" ? to : from}
            </span>
        );
    }

    return <span className={`${className}`} ref={ref} />;
}