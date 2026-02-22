import Link from "next/link";
import type React from "react";
import { Button } from "@/components/ui/button";

const NotFound: React.FC = () => {
	return (
		<div className="min-h-screen flex flex-col p-4 sm:p-6 lg:p-8">
			{/* 404 Card Container */}
			<div className="relative flex-1 rounded-2xl sm:rounded-3xl overflow-hidden film-grain">
				{/* Background Image */}
				<div className="absolute inset-0 z-0">
					<div
						className="w-full h-full bg-cover md:bg-center bg-right bg-no-repeat"
						style={{
							backgroundImage: `url('/404.png')`,
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
					<div>
						{/* Error Code */}
						<div className="mb-8">
							<span className="text-sm font-medium text-slate-200 uppercase tracking-wider">
								Error 404
							</span>
						</div>

						{/* Main Headline */}
						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-8 leading-tight tracking-wide drop-shadow-lg">
							<div className="italic text-slate-200 mb-2">Lost at sea?</div>
						</h1>

						{/* Description */}
						<p className="text-lg text-slate-200 mb-12 max-w-2xl mx-auto">
							Let&apos;s navigate you back to safe waters.
						</p>

						{/* CTA Button */}
						<div className="mb-12">
							<Button size="lg" className="text-lg min-w-[200px] h-12" asChild>
								<Link href="/">Return Home</Link>
							</Button>
						</div>
					</div>
				</div>

				{/* Footer - Absolutely positioned at bottom */}
				<div className="absolute bottom-0 left-0 right-0 z-10">
					{/* Border that doesn't go full width */}
					<div className="px-4 sm:px-8 lg:px-12">
						<div className="border-t border-slate-400/30"></div>
					</div>

					{/* Footer content - same width as border */}
					<div className="px-4 sm:px-8 lg:px-12 pt-6 pb-6">
						<div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-300">
							{/* Copyright */}
							<div>© {new Date().getFullYear()} OutJourney</div>

							{/* Email */}
							<div className="text-center">
								<Link
									href="mailto:hello@pennmaritime.club"
									className="hover:text-white transition-colors"
								>
									hello@pennmaritime.club
								</Link>
							</div>

							{/* Navigation Links */}
							<div className="flex items-center gap-6 text-sm">
								<Link href="/" className="hover:text-white transition-colors">
									Home
								</Link>
								<Link
									href="/#about"
									className="hover:text-white transition-colors"
								>
									About
								</Link>
								<Link
									href="/#events"
									className="hover:text-white transition-colors"
								>
									Events
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NotFound;
