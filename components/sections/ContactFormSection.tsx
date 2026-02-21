"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import type React from "react";
import { useEffect } from "react";

const ContactFormSection: React.FC = () => {
	useEffect(() => {
		(async () => {
			const cal = await getCalApi({ namespace: "introcall" });
			cal("ui", {
				theme: "auto",
				hideEventTypeDetails: false,
				layout: "month_view",
			});
		})();
	}, []);

	return (
		<section
			id="contact-form"
			className="relative min-h-screen flex flex-col p-4 sm:p-6 lg:p-8"
		>
			{/* Contact Form Card Container */}
			<div className="relative flex-1 rounded-2xl sm:rounded-3xl bg-background overflow-hidden">
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
				<div className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 max-w-[98%] lg:max-w-[1200px] xl:max-w-[1400px] mx-auto pt-32 pb-20 min-h-[calc(100vh-2rem)] sm:min-h-[calc(100vh-3rem)] lg:min-h-[calc(100vh-4rem)]">
					<div className="text-center w-full">
						{/* Tagline */}
						<div className="mb-6">
							<span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
								Schedule a Meeting
							</span>
						</div>

						{/* Main Headline */}
						<h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-foreground mb-12 leading-tight max-w-4xl mx-auto">
							<span className="text-muted-foreground">
									Ready to join OutJourney and shape the
							</span>{" "}
							<span className="font-medium text-primary">maritime future</span>{" "}
							<span className="text-muted-foreground">
								with us? Let&apos;s set up a time to chat.
							</span>
						</h2>

						{/* Cal.com Embed Container */}
						<div className="max-w-4xl mx-auto">
							<Cal
								namespace="introcall"
								calLink="lukaadzic/outjourney-intro-call/"
								style={{ width: "100%", height: "600px", overflow: "scroll" }}
								config={{ layout: "month_view", theme: "auto" }}
							/>
						</div>

						{/* Additional Information */}
						<div className="mt-12 pt-8 border-t border-border">
							<div className="max-w-2xl mx-auto">
								<p className="text-sm text-muted-foreground leading-relaxed">
									<span className="font-medium text-foreground">Note:</span>{" "}
									This is a 15-minute introductory call where we&apos;ll discuss
									your interests, answer any questions you may have, and explore
								how you can get involved with OutJourney.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ContactFormSection;
