"use client";

import type { Application, SplineEvent } from "@splinetool/runtime";
import type React from "react";
import { useEffect, useRef, useState } from "react";

interface LazySplineProps {
	scene: string;
	className?: string;
	onError?: () => void;
	onLoad?: (splineApp: Application) => void;
	onSplineMouseDown?: (e: SplineEvent) => void;
	rootMargin?: string;
	threshold?: number;
	children: React.ReactNode; // The Server Component SplineScene will be passed as children
}

const LazySpline: React.FC<LazySplineProps> = ({
	className = "",
	rootMargin = "200px",
	threshold = 0.1,
	children,
}) => {
	const [shouldLoad, setShouldLoad] = useState(false);
	const [hasError] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	// Intersection Observer for lazy loading
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				const [entry] = entries;
				if (entry.isIntersecting && !shouldLoad) {
					setShouldLoad(true);
					observer.disconnect();
				}
			},
			{
				rootMargin,
				threshold,
			},
		);

		if (containerRef.current) {
			observer.observe(containerRef.current);
		}

		return () => {
			observer.disconnect();
		};
	}, [rootMargin, threshold, shouldLoad]);

	// Error fallback component
	const ErrorFallback = () => (
		<div className="w-full h-full flex items-center justify-center bg-muted/5 rounded-lg">
			<div className="text-muted-foreground text-sm opacity-50">
				3D Scene unavailable
			</div>
		</div>
	);

	if (hasError) {
		return (
			<div ref={containerRef} className={`w-full h-full ${className}`}>
				<ErrorFallback />
			</div>
		);
	}

	return (
		<div ref={containerRef} className={`w-full h-full ${className}`}>
			{shouldLoad ? (
				children
			) : (
				<div className="w-full h-full bg-muted/5 rounded-lg" />
			)}
		</div>
	);
};

export default LazySpline;
