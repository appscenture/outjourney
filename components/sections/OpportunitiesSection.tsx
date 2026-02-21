import type React from "react";
import {
	HiOutlineBeaker,
	HiOutlineLightBulb,
	HiOutlineTrendingUp,
} from "react-icons/hi";
import { MobileOptimizedImage } from "@/components/MobileOptimizedImage";
import { OpportunitiesClientWrapper } from "./OpportunitiesClientWrapper";

const OpportunitiesSection: React.FC = () => {
	return (
		<section
			id="opportunities"
			className="relative min-h-screen flex flex-col p-4 sm:p-6 lg:p-8"
		>
			{/* Opportunities Card Container */}
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
					{/* Key Image - Right Side (Only load on non-mobile devices) */}
					<MobileOptimizedImage
						src="https://res.cloudinary.com/dhj0xjooz/image/upload/f_auto,q_auto:best,w_auto,c_scale,fl_lossy/v1753726292/key_1-1920x917_e3p2hl.png"
						alt="Key representing opportunities and access"
						className="object-cover"
						containerClassName="absolute xl:top-28 2xl:-top-12 2xl:opacity-100 xl:opacity-50 hidden xl:block -right-8 xl:size-[600px] 2xl:size-[800px] pointer-events-none -z-10 md:opacity-100 opacity-10 [&]:[@media(min-width:1749px)]:top-16 [&]:[@media(min-width:1749px)]:-right-8"
					/>

					<div className="text-left w-full">
						{/* Tagline */}
						<div className="mb-6">
							<span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
								Opportunities
							</span>
						</div>

						{/* Main Headline */}
						<h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-foreground mb-12 leading-tight max-w-4xl">
							<span className="font-medium text-primary">
								Expand your horizons
							</span>{" "}
							<span className="text-muted-foreground">
								through transformative experiences that shape tomorrow&apos;s
								maritime leaders.
							</span>
						</h2>

						{/* Opportunities List */}
						<div className="max-w-4xl space-y-12">
							{/* Entrepreneurship */}
							<div className="flex items-start gap-8">
								<div className="flex flex-col items-center">
									<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
										<HiOutlineLightBulb className="w-6 h-6 text-primary" />
									</div>
									<div className="w-px h-16 bg-border"></div>
								</div>
								<div className="flex-1 pt-2">
									<div className="flex items-baseline gap-4 mb-4">
										<span className="text-2xl font-light text-primary/60">
											01
										</span>
										<h3 className="text-2xl font-medium text-foreground">
											Entrepreneurship
										</h3>
									</div>
									<p className="text-lg text-muted-foreground leading-relaxed">
										Launch your maritime venture with guidance from industry
										veterans. Explore emerging sectors including sustainable
										shipping technologies, autonomous vessel systems, and
										next-generation supply chain solutions.
									</p>
								</div>
							</div>

							{/* Research Excellence */}
							<div className="flex items-start gap-8">
								<div className="flex flex-col items-center">
									<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
										<HiOutlineBeaker className="w-6 h-6 text-primary" />
									</div>
									<div className="w-px h-16 bg-border"></div>
								</div>
								<div className="flex-1 pt-2">
									<div className="flex items-baseline gap-4 mb-4">
										<span className="text-2xl font-light text-primary/60">
											02
										</span>
										<h3 className="text-2xl font-medium text-foreground">
											Research Excellence
										</h3>
									</div>
									<p className="text-lg text-muted-foreground leading-relaxed">
										Contribute to groundbreaking research in marine
										sustainability, autonomous navigation, maritime law, and
										ocean technology. Work alongside faculty and industry
										experts to advance maritime science.
									</p>
								</div>
							</div>

							{/* Professional Development */}
							<div className="flex items-start gap-8">
								<div className="flex flex-col items-center">
									<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
										<HiOutlineTrendingUp className="w-6 h-6 text-primary" />
									</div>
								</div>
								<div className="flex-1 pt-2">
									<div className="flex items-baseline gap-4 mb-4">
										<span className="text-2xl font-light text-primary/60">
											03
										</span>
										<h3 className="text-2xl font-medium text-foreground">
											Professional Development
										</h3>
									</div>
									<p className="text-lg text-muted-foreground leading-relaxed">
										Access exclusive internships, executive mentorship, and
										industry networking opportunities. Build expertise across
										engineering, logistics, finance, law, and emerging maritime
										technologies.
									</p>
								</div>
							</div>
						</div>

						{/* CTA Section with Client Wrapper */}
						<OpportunitiesClientWrapper />
					</div>
				</div>
			</div>
		</section>
	);
};

export default OpportunitiesSection;
