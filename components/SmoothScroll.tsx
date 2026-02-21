"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useEffect } from "react";

interface SmoothScrollProps {
	children: React.ReactNode;
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
	useEffect(() => {
		// Detect if we're on a mobile device or small screen
		const isMobile =
			/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
				navigator.userAgent,
			);

		const checkScreenSize = () => window.innerWidth < 1024; // Less than lg breakpoint

		// Don't initialize Lenis on mobile devices or small screens
		if (isMobile || checkScreenSize()) {
			return;
		}

		// Initialize Lenis only for desktop/large screens
		const lenis = new Lenis({
			duration: 1.2,
			easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
			orientation: "vertical",
			gestureOrientation: "vertical",
			smoothWheel: true,
			wheelMultiplier: 1,
			syncTouch: false,
			touchMultiplier: 2,
			infinite: false,
		});

		// Make Lenis instance globally accessible for navbar smooth scrolling
		window.lenis = lenis;

		// Animation frame function
		function raf(time: number) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);

		// Handle window resize to disable Lenis if screen becomes too small
		const handleResize = () => {
			if (checkScreenSize()) {
				lenis.destroy();
				delete window.lenis;
			}
		};

		window.addEventListener("resize", handleResize);

		// Cleanup
		return () => {
			lenis.destroy();
			// Clean up global reference
			delete window.lenis;
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return <>{children}</>;
};

export default SmoothScroll;
