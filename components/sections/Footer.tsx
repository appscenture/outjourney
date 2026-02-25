import Link from "next/link";
import Image from "next/image";
import type React from "react";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Button } from "@/components/ui/button";

const Footer: React.FC = () => {
	return (
		<footer
			id="footer"
			className="relative min-h-screen flex flex-col p-4 sm:p-6 lg:p-8"
		>
			{/* CTA Card Container */}
			<div className="relative flex-1 rounded-2xl sm:rounded-3xl overflow-hidden film-grain">
				{/* Background Image */}
				<div className="absolute inset-0 z-0">
					<div
						className="w-full h-full bg-cover bg-bottom-left md:bg-bottom bg-no-repeat"
						style={{
							backgroundImage: `url('/footer-bg.png')`,
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
						{/* Logo */}
						<div className="mb-8 flex items-center justify-center gap-3">
							<Image
								src="/logo/outjourney-logo.png"
								alt="OutJourney"
								width={48}
								height={48}
								className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain drop-shadow-lg"
								priority
							/>
							<span className="text-2xl font-bold text-foreground drop-shadow-lg">OutJourney</span>
						</div>

						{/* Small Tagline */}
						<div className="mb-8">
							<span className="text-sm font-medium text-slate-200 uppercase tracking-wider">
								Chart Your Course
							</span>
						</div>

						{/* Main Headline */}
						<h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-12 leading-tight tracking-wide drop-shadow-lg">
							<div className="italic text-slate-200 mb-2">
								The tide is turning.
							</div>
							<div className="font-medium text-white">Set sail with us.</div>
						</h2>

						{/* CTA Button */}
						<div className="mb-12">
							<Button size="lg" className="text-lg min-w-[200px] h-12" asChild>
								<Link href="/contact">Get in touch</Link>
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
									href="mailto:business@outjourney.id"
									className="hover:text-white transition-colors"
								>
									business@outjourney.id
								</Link>
							</div>

							{/* Social Links */}
							<div className="flex items-center gap-4">
								<Link
									href="https://www.linkedin.com/company/Jakartamaritime/"
									className="hover:text-white transition-colors text-lg"
									aria-label="LinkedIn"
									target="_blank"
									rel="noopener noreferrer"
								>
									<FaLinkedinIn />
								</Link>
								<Link
									href="https://www.instagram.com/Jakartamaritime/"
									className="hover:text-white transition-colors text-lg"
									aria-label="Instagram"
									target="_blank"
									rel="noopener noreferrer"
								>
									<FaInstagram />
								</Link>
								<Link
									href="https://x.com/Jakartamaritime/"
									className="hover:text-white transition-colors text-lg"
									aria-label="X (Twitter)"
									target="_blank"
									rel="noopener noreferrer"
								>
									<FaXTwitter />
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
