"use client";

import Link from "next/link";
import type React from "react";
import { Button } from "@/components/ui/button";

const HeroSection: React.FC = () => {
	// Handle smooth scroll to committees section
	const handleExploreCommittees = () => {
		console.log("Explore committees button clicked");
		const targetElement = document.getElementById("committees");
		console.log("Committees element found:", targetElement);

		if (targetElement) {
			// Small delay to ensure DOM is ready
			setTimeout(() => {
				// Get the element's position relative to the document
				const elementTop =
					targetElement.getBoundingClientRect().top + window.scrollY;
				console.log("Committees element top position:", elementTop);

				// Account for the fixed navbar height (approximately 120px including margins)
				const offset = 120;
				const targetPosition = Math.max(0, elementTop - offset);
				console.log("Committees target scroll position:", targetPosition);

				// Use Lenis for smooth scrolling if available, fallback to native
				const lenis = window.lenis;
				if (lenis && typeof lenis.scrollTo === "function") {
					console.log("Using Lenis for committees scroll");
					lenis.scrollTo(targetPosition, {
						duration: 1.2,
						easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
					});
				} else {
					console.log("Using native scroll for committees");
					// Fallback to native scrolling for mobile/small screens
					window.scrollTo({
						top: targetPosition,
						behavior: "smooth",
					});
				}
			}, 50);
		} else {
			console.log("Committees element not found");
		}
	};

	return (
		<section className="relative min-h-screen flex flex-col p-4 sm:p-6 lg:p-8">
			{/* Hero Card Container */}
			<div className="relative flex-1 rounded-2xl sm:rounded-3xl overflow-hidden film-grain">
				{/* Background Image */}
				<div className="absolute inset-0 z-0">
					<div
						className="w-full h-full bg-cover bg-top-right lg:bg-bottom-right bg-no-repeat"
						style={{
							backgroundImage: `url('/hero-bg.png')`,
						}}
					/>
				</div>

				{/* Overlay with Silk color */}
				<div
					className="absolute inset-0 z-6"
					style={{ backgroundColor: "rgba(1, 74, 170, 0.7)" }}
				></div>

				{/* Content */}
				<div className="relative z-10 flex-1 flex items-center justify-center text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto min-h-[calc(100vh-2rem)] sm:min-h-[calc(100vh-3rem)] lg:min-h-[calc(100vh-4rem)]">
					{/* Headline */}
					<div>
						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-foreground mb-8 leading-tight tracking-wide drop-shadow-lg">
							<span className="italic text-muted-foreground">Building</span>{" "}
							<span className="font-medium text-muted-foreground">
								Tomorrow&apos;s
							</span>{" "}
							<span className="font-semibold text-foreground">Maritime</span>{" "}
							<span className="text-muted-foreground">Leaders</span>
						</h1>

						{/* CTA Buttons */}
						<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
							<Button size="lg" className="text-lg min-w-[200px] h-12" asChild>
								<Link
									href="https://career.outjourney.id/form/Y_XUVoquTak6VaxT2I9QIFwBCuJZ2V5PlwcQlcwFh_Q"
									target="_blank"
									rel="noopener noreferrer"
								>
									Apply Now
								</Link>
							</Button>
							<Button
								variant="outline"
								size="lg"
								className="text-lg min-w-[200px] h-12 hover:text-primary bg-foreground/5 hover:bg-foreground/10"
								onClick={handleExploreCommittees}
							>
								Explore committees
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
