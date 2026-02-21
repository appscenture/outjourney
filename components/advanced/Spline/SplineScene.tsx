import Spline from "@splinetool/react-spline/next";
import type { Application, SplineEvent } from "@splinetool/runtime";

interface SplineSceneProps {
	scene: string;
	onLoad?: (splineApp: Application) => void;
	onError?: () => void;
	onSplineMouseDown?: (e: SplineEvent) => void;
}

export function SplineScene({
	scene,
	onLoad,
	onError,
	onSplineMouseDown,
}: SplineSceneProps) {
	return (
		<Spline
			scene={scene}
			className="w-full h-full"
			onLoad={onLoad}
			onError={onError}
			onSplineMouseDown={onSplineMouseDown}
		/>
	);
}
