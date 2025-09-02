"use client"
import { useEffect, useRef } from "react";
// statically import framer-motion hooks so they are called inside the component body
import { useInView, useMotionValue, useSpring } from "framer-motion";

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
    // initialize motion hooks directly (safe: called inside component body)
    const initialValue = direction === "down" ? to : from;
    const motionValue = useMotionValue(initialValue);
    const damping = 20 + 40 * (1 / duration);
    const stiffness = 100 * (1 / duration);
    const springValue = useSpring(motionValue, { damping, stiffness });
    const isInView = useInView(ref, { amount: 0.1 });


    // (useInView hook replaces manual IntersectionObserver)

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

    // If hooks are initialized, render span that will be updated by spring listener
    return <span className={`${className}`} ref={ref} />;
}