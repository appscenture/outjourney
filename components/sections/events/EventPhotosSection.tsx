import type React from "react";
import EventPhotosGrid from "./EventPhotosGrid";

interface EventPhotosSectionProps {
	eventImages: readonly (string | null)[];
	eventTitle: string;
}

const EventPhotosSection: React.FC<EventPhotosSectionProps> = ({
	eventImages,
	eventTitle,
}) => {
	// Don't render if no images
	if (!eventImages || eventImages.length === 0) {
		return null;
	}

	return (
		<section className="relative flex flex-col p-4 sm:p-6 lg:p-8">
			{/* Photos Card Container */}
			<div className="relative rounded-2xl sm:rounded-3xl bg-background overflow-hidden">
				{/* Noise/Grain Background */}
				<div className="absolute inset-0 pointer-events-none z-0 opacity-[0.08]">
					<div
						className="w-full h-full"
						style={{
							backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
							backgroundRepeat: "repeat",
							backgroundSize: "128px 128px",
						}}
					/>
				</div>

				{/* Content */}
				<div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto py-16 lg:py-24">
					{/* Section Header */}
					<div className="text-center mb-12">
						<h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-foreground mb-4 leading-tight">
							<span className="text-muted-foreground">Photos from</span>{" "}
							<span className="font-medium text-primary">the Event</span>
						</h2>
						<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
							Capturing the moments and highlights from {eventTitle}
						</p>
					</div>

					{/* Photos Grid with Lightbox */}
					<EventPhotosGrid eventImages={eventImages} eventTitle={eventTitle} />
				</div>
			</div>
		</section>
	);
};

export default EventPhotosSection;
