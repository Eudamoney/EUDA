"use client";

import { useEffect, useRef, useState } from "react";

/** True once the element has been at least `threshold` on screen. Stays true after that. */
export function useSeen<T extends Element>(threshold = 0.6) {
    const ref = useRef<T>(null);
    const [seen, setSeen] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (!("IntersectionObserver" in window)) {
            setSeen(true);
            return;
        }
        const io = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) {
                    setSeen(true);
                    io.disconnect();
                }
            },
            { threshold },
        );
        io.observe(el);
        return () => io.disconnect();
    }, [threshold]);
    return [ref, seen] as const;
}
