import type React from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { PiGraduationCapLight } from "react-icons/pi";
import { TbWaveSine } from "react-icons/tb";

const AboutSection: React.FC = () => {
	return (
		<section
			id="about"
			className="relative min-h-screen flex flex-col p-4 sm:p-6 lg:p-8"
		>
			{/* About Card Container */}
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
								About
							</span>
						</div>

						{/* Main Headline */}
						<h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-foreground mb-12 leading-tight w-full">
							<span className="font-medium text-primary">OutJourney</span>{" "}
							<span className="text-muted-foreground">
								(MAPP) is the first maritime app located in
							</span>{" "}
							<span className="font-medium">
								Jakarta, Indonesia
							</span>
							<span className="text-muted-foreground">
								. We unite fresh grads from diverse fields to tackle real maritime
								challenges and develop future industry leaders.
							</span>
						</h2>

						{/* Content Grid */}
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
							{/* Maritime Innovation */}
							<div className="space-y-6">
								<div className="flex items-center gap-3 mb-4">
									<div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
										<TbWaveSine className="w-4 h-4 text-primary" />
									</div>
									<h3 className="text-xl font-semibold text-foreground">
										Maritime Innovation
									</h3>
								</div>
								<p className="text-base text-muted-foreground leading-relaxed">
									The maritime industry moves 80% of global trade yet faces
									critical challenges in sustainability, digitalization, and
									workforce development. We believe students can drive the
									innovation needed to transform this $14 trillion industry.
								</p>
							</div>

							{/* OutJourney Advantage */}
							<div className="space-y-6">
								<div className="flex items-center gap-3 mb-4">
									<div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
										<PiGraduationCapLight className="w-4 h-4 text-primary" />
									</div>
									<h3 className="text-xl font-semibold text-foreground">
										OutJourney Excellence
									</h3>
								</div>
								<p className="text-base text-muted-foreground leading-relaxed">
									As a leading research institution, OutJourney provides the
									interdisciplinary expertise and entrepreneurial spirit needed
									to address maritime complexities. Our members leverage
									resources across engineering, business, law, and healthcare to
									create actionable solutions.
								</p>
							</div>

							{/* Philadelphia Legacy */}
							<div className="space-y-6">
								<div className="flex items-center gap-3 mb-4">
									<div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
										<HiOutlineLocationMarker className="w-4 h-4 text-primary" />
									</div>
									<h3 className="text-xl font-semibold text-foreground">
										Philadelphia Heritage
									</h3>
								</div>
								<p className="text-base text-muted-foreground leading-relaxed">
									Philadelphia was North America&apos;s largest port by 1750 and
									established the Maritime Exchange in 1875. Today&apos;s
									Delaware River ports continue this legacy. We aim to reignite
									Philadelphia&apos;s role as a global maritime innovation hub.
								</p>
							</div>
						</div>

						{/* Bottom Statement */}
						<div className="mt-16 pt-8 border-t border-border">
							<p className="text-lg text-muted-foreground leading-relaxed max-w-4xl">
								<span className="font-medium text-foreground">
									Inspired by history, driven by innovation
								</span>{" "}
								— OutJourney bridges tradition with cutting-edge solutions,
								preparing the next generation of maritime leaders to navigate an
								industry in transformation.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AboutSection;
