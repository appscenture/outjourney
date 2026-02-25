"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import type React from "react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { HiX } from "react-icons/hi";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import { Button } from "@/components/ui/button";

interface EventPhotosGridProps {
	eventImages: readonly (string | null)[];
	eventTitle: string;
}

const EventPhotosGrid: React.FC<EventPhotosGridProps> = ({
	eventImages,
	eventTitle,
}) => {
	const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
		null,
	);
	const [direction, setDirection] = useState<"left" | "right" | null>(null);
	const [mounted, setMounted] = useState(false);

	// Filter out null images
	const validImages = eventImages.filter(
		(image): image is string => image !== null,
	);

	useEffect(() => {
		setMounted(true);
	}, []);

	const openLightbox = (index: number) => {
		setSelectedImageIndex(index);
		setDirection(null);
	};

	const closeLightbox = () => {
		setSelectedImageIndex(null);
		setDirection(null);
	};

	const goToPrevious = () => {
		if (selectedImageIndex !== null) {
			setDirection("left");
			setSelectedImageIndex(
				selectedImageIndex === 0
					? validImages.length - 1
					: selectedImageIndex - 1,
			);
		}
	};

	const goToNext = () => {
		if (selectedImageIndex !== null) {
			setDirection("right");
			setSelectedImageIndex(
				selectedImageIndex === validImages.length - 1
					? 0
					: selectedImageIndex + 1,
			);
		}
	};

	// Handle keyboard navigation
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (selectedImageIndex === null) return;

		switch (e.key) {
			case "Escape":
				closeLightbox();
				break;
			case "ArrowLeft":
				goToPrevious();
				break;
			case "ArrowRight":
				goToNext();
				break;
		}
	};

	return (
		<>
			{/* Photos Grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
				{validImages.map((image, index) => (
					<motion.div
						key={image}
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						transition={{ duration: 0.2 }}
						className="group relative aspect-video overflow-hidden rounded-lg bg-muted cursor-pointer bg-cover bg-center bg-no-repeat"
						onClick={() => openLightbox(index)}
						style={{
							backgroundImage: `url(${image})`,
						}}
					>
						{/* Overlay on hover */}
						<div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
							<div className="text-foreground text-sm font-medium bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full border border-border opacity-0 group-hover:opacity-100 transition-opacity duration-300">
								Click to view
							</div>
						</div>
					</motion.div>
				))}
			</div>

			{/* Photo count indicator */}
			{eventImages.length > 1 && (
				<div className="text-center mt-8">
					<p className="text-sm text-muted-foreground">
						{eventImages.length} photos from this event
					</p>
				</div>
			)}

			{/* Lightbox Modal */}
			{mounted &&
				createPortal(
					<AnimatePresence>
						{selectedImageIndex !== null && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.3, ease: "easeOut" }}
								className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
								onClick={closeLightbox}
								onKeyDown={handleKeyDown}
								tabIndex={0}
							>
								{/* Close Button */}
								<Button
									variant="ghost"
									onClick={closeLightbox}
									className="absolute top-6 right-6 z-10 rounded-md text-foreground hover:bg-white/20 hover:text-foreground p-3"
									aria-label="Close lightbox"
								>
									<HiX className="w-6 h-6" />
								</Button>

								{/* Navigation Buttons */}
								{validImages.length > 1 && (
									<>
										<Button
											variant="ghost"
											onClick={(e) => {
												e.stopPropagation();
												goToPrevious();
											}}
											className="absolute left-6 top-1/2 -translate-y-1/2 z-10 rounded-md text-foreground hover:bg-white/20 hover:text-foreground p-3"
											aria-label="Previous image"
										>
											<HiArrowLeft className="w-6 h-6" />
										</Button>
										<Button
											variant="ghost"
											onClick={(e) => {
												e.stopPropagation();
												goToNext();
											}}
											className="absolute right-6 top-1/2 -translate-y-1/2 z-10 rounded-md text-foreground hover:bg-white/20 hover:text-foreground p-3"
											aria-label="Next image"
										>
											<HiArrowRight className="w-6 h-6" />
										</Button>
									</>
								)}

								{/* Image Container */}
								<motion.div
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.9 }}
									transition={{ duration: 0.3, ease: "easeOut" }}
									className="relative max-w-[90vw] max-h-[90vh] w-full h-full flex items-center justify-center"
								>
									<motion.div
										key={selectedImageIndex}
										initial={
											direction === "left"
												? { opacity: 0, x: -100, filter: "blur(4px)" }
												: direction === "right"
													? { opacity: 0, x: 100, filter: "blur(4px)" }
													: { opacity: 0, scale: 0.95 }
										}
										animate={{
											opacity: 1,
											x: 0,
											scale: 1,
											filter: "blur(0px)",
										}}
										exit={
											direction === "left"
												? { opacity: 0, x: 100, filter: "blur(4px)" }
												: direction === "right"
													? { opacity: 0, x: -100, filter: "blur(4px)" }
													: { opacity: 0, scale: 0.95 }
										}
										transition={{ duration: 0.3, ease: "easeOut" }}
										className="relative w-full h-full"
									>
										<Image
											src={validImages[selectedImageIndex]}
											alt={`${eventTitle} - Photo ${(selectedImageIndex ?? 0) + 1}`}
											fill
											className="object-contain"
											sizes="90vw"
											priority
										/>
									</motion.div>
								</motion.div>

								{/* Pagination Dots */}
								{validImages.length > 1 && (
									<div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 px-3 py-2 rounded-full bg-secondary/10 backdrop-blur-md">
										{validImages.map((image, index) => (
											<button
												key={image}
												type="button"
												onClick={(e) => {
													e.stopPropagation();
													setDirection(
														index > (selectedImageIndex ?? 0)
															? "right"
															: "left",
													);
													setSelectedImageIndex(index);
												}}
												className={`w-2 h-2 rounded-full transition-all duration-200 ${
													index === selectedImageIndex
														? "bg-foreground scale-125"
														: "bg-foreground/40 hover:bg-foreground/60"
												}`}
												aria-label={`Go to image ${index + 1}`}
											/>
										))}
									</div>
								)}
							</motion.div>
						)}
					</AnimatePresence>,
					document.body,
				)}
		</>
	);
};

export default EventPhotosGrid;
