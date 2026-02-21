"use client";

import { useEffect, useState } from "react";

/**
 * Hook to detect if the user is on an actual mobile device (not just mobile breakpoint)
 * This prevents heavy 3D renders from loading on mobile devices for better performance
 */
export function useIsMobileDevice(): boolean {
	const [isMobileDevice, setIsMobileDevice] = useState(false);

	useEffect(() => {
		// Check if we're in a browser environment
		if (typeof window === "undefined") return;

		// Detect mobile devices using user agent
		const mobileRegex =
			/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
		const isMobile = mobileRegex.test(navigator.userAgent);

		// Additional checks for mobile-specific features
		const hasTouchScreen =
			"ontouchstart" in window || navigator.maxTouchPoints > 0;
		const isSmallScreen = window.innerWidth <= 768; // Mobile-typical screen width

		// Consider it a mobile device if:
		// 1. User agent indicates mobile, OR
		// 2. Has touch screen AND small screen (covers edge cases)
		const isMobileDevice = isMobile || (hasTouchScreen && isSmallScreen);

		setIsMobileDevice(isMobileDevice);
	}, []);

	return isMobileDevice;
}
