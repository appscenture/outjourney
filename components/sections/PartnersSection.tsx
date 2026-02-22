import type React from "react";
import {
	HiOutlineAcademicCap,
	HiOutlineLightBulb,
	HiOutlineUsers,
} from "react-icons/hi";
import { PartnersClientWrapper } from "./PartnersClientWrapper";

const PartnersSection: React.FC = () => {
	return (
		<section
			id="partners"
			className="relative min-h-screen flex flex-col p-4 sm:p-6 lg:p-8"
		>
			{/* Partners Card Container */}
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
				<div className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 max-w-[98%] lg:max-w-[1600px] xl:max-w-[1800px] mx-auto py-20 min-h-[calc(100vh-2rem)] sm:min-h-[calc(100vh-3rem)] lg:min-h-[calc(100vh-4rem)]">
					<div className="text-left w-full">
						{/* Tagline */}
						<div className="mb-6">
							<span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
								Partnership & Investment
							</span>
						</div>

						{/* Main Headline */}
						<h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-foreground mb-12 leading-tight w-full">
							<span className="text-muted-foreground">Partner with</span>{" "}
							<span className="font-medium text-primary">OutJourney</span>{" "}
							<span className="text-muted-foreground">
								to shape the future of maritime innovation and cultivate the
								next generation of industry leaders.
							</span>
						</h2>

						{/* Partnership Benefits Grid */}
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 mb-16">
							{/* Mentorship & Guidance */}
							<div className="space-y-6">
								<div className="flex items-center gap-3 mb-4">
									<div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
										<HiOutlineAcademicCap className="w-4 h-4 text-primary" />
									</div>
									<h3 className="text-xl font-semibold text-foreground">
										Mentorship & Guidance
									</h3>
								</div>
								<p className="text-base text-muted-foreground leading-relaxed">
									Shape the next generation of maritime innovators by providing
									strategic guidance, industry insights, and mentorship to our
									passionate student members working on cutting-edge projects
									and research initiatives.
								</p>
							</div>

							{/* Access to Top Talent */}
							<div className="space-y-6">
								<div className="flex items-center gap-3 mb-4">
									<div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
										<HiOutlineUsers className="w-4 h-4 text-primary" />
									</div>
									<h3 className="text-xl font-semibold text-foreground">
										Access to Elite Talent
									</h3>
								</div>
								<p className="text-base text-muted-foreground leading-relaxed">
									Connect with exceptional students from diverse disciplines at
									one of the world&apos;s leading universities. Our members
									bring fresh perspectives, innovative thinking, and deep
									passion for solving complex maritime challenges.
								</p>
							</div>

							{/* Innovation Collaboration */}
							<div className="space-y-6">
								<div className="flex items-center gap-3 mb-4">
									<div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
										<HiOutlineLightBulb className="w-4 h-4 text-primary" />
									</div>
									<h3 className="text-xl font-semibold text-foreground">
										Innovation Collaboration
									</h3>
								</div>
								<p className="text-base text-muted-foreground leading-relaxed">
									Collaborate on groundbreaking research and development
									projects spanning sustainable technologies, digital
									transformation, autonomous systems, and innovative business
									models that will define the maritime industry&apos;s future.
								</p>
							</div>
						</div>

						{/* CTA Section with Client Wrapper */}
						<PartnersClientWrapper />
					</div>
				</div>
			</div>
		</section>
	);
};

export default PartnersSection;
