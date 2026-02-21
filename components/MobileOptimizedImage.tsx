"use client";

import type React from "react";
import { useIsMobileDevice } from "@/hooks/useIsMobileDevice";

interface MobileOptimizedImageProps {
	src: string;
	alt: string;
	className?: string;
	containerClassName?: string;
}

/**
 * Client component that conditionally renders images based on device type
 * Prevents heavy 3D renders from loading on mobile devices
 */
export const MobileOptimizedImage: React.FC<MobileOptimizedImageProps> = ({
	src,
	alt,
	className = "",
	containerClassName = "",
}) => {
	const isMobileDevice = useIsMobileDevice();

	// Don't render on mobile devices
	if (isMobileDevice) {
		return null;
	}

	return (
		<div className={containerClassName}>
			<div
				className={`relative w-full h-full bg-cover bg-center bg-no-repeat ${className}`}
				style={{
					backgroundImage: `url(${src})`,
				}}
				role="img"
				aria-label={alt}
			/>
		</div>
	);
};
