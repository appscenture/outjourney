import Link from "next/link";
import type React from "react";
import {
	HiOutlineOfficeBuilding,
	HiOutlinePlus,
	HiOutlineUser,
} from "react-icons/hi";
import { MobileOptimizedImage } from "@/components/MobileOptimizedImage";
import { Button } from "@/components/ui/button";
import {
	type Event as EventType,
	formatEventType,
	getFeaturedEvents,
} from "@/lib/keystatic";

type EventWithCTA = EventType & { isCallToAction?: boolean; id?: string };

const EventsSection: React.FC = async () => {
	const featuredEvents = await getFeaturedEvents();

	// Sort by date (latest first)
	const events = featuredEvents
		.filter((event): event is typeof event & { date: string } =>
			Boolean(event.date),
		)
		.sort((a, b) => {
			const dateA = new Date(a.date).getTime();
			const dateB = new Date(b.date).getTime();
			return dateB - dateA; // Latest first
		});

	// Add the "Become a Speaker" call-to-action
	const eventsWithCTA: EventWithCTA[] = [
		...events.slice(0, 3), // Show up to 3 featured events
		{
			slug: "cta",
			title: "Become a Speaker",
			speaker: "",
			company: "",
			date: "",
			time: "",
			location: "",
			featuredImage: "",
			eventImages: [],
			shortDescription: "",
			content: null,
			presidentMessage: {
				discriminant: false,
				value: null,
			},
			registrationLink: "",
			tags: [],
			featured: false,
			status: "draft" as const,
			type: "Apply",
			isCallToAction: true,
			id: "cta",
		},
	];

	return (
		<section
			id="events"
			className="relative min-h-screen flex flex-col p-4 sm:p-6 lg:p-8"
		>
			{/* Events Card Container */}
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
				<div className="relative z-10 flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-[98%] lg:max-w-[1600px] xl:max-w-[1800px] mx-auto py-20 min-h-[calc(100vh-2rem)] sm:min-h-[calc(100vh-3rem)] lg:min-h-[calc(100vh-4rem)]">
					{/* Megaphone Image - Top Right (Only load on non-mobile devices) */}
					<MobileOptimizedImage
						src="https://res.cloudinary.com/dhj0xjooz/image/upload/f_auto,q_auto:best,w_auto,c_scale,fl_lossy/v1753726290/Megaphone_icons_1-1920x917_pwui7z.png"
						alt="Megaphone representing events and announcements"
						className="object-cover"
						containerClassName="absolute xl:-top-24 2xl:opacity-100 xl:opacity-50 hidden xl:block -right-32 2xl:-right-8 xl:size-[600px] pointer-events-none -z-10 md:opacity-100 opacity-10"
					/>

					{/* Header */}
					<div className="text-left w-full mb-16">
						{/* Tagline */}
						<div className="mb-6">
							<span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
								Events & Speakers
							</span>
						</div>

						{/* Main Headline */}
						<h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-foreground mb-8 leading-tight max-w-4xl">
							<span className="text-muted-foreground">
								Connecting students with
							</span>{" "}
							<span className="font-medium text-primary">industry leaders</span>{" "}
							<span className="text-muted-foreground">
								shaping the future of maritime.
							</span>
						</h2>

						<p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
							Join us for exclusive events featuring renowned speakers from top
							maritime companies, sharing insights on innovation,
							sustainability, and career opportunities.
						</p>
					</div>

					{/* Events Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
						{eventsWithCTA.map((event) => (
							<Link
								key={event.slug || event.id}
								href={
									event.isCallToAction ? "/contact" : `/events/${event.slug}`
								}
								className="group cursor-pointer"
							>
								{/* Event Image or CTA Card */}
								{event.isCallToAction ? (
									<div className="relative aspect-video overflow-hidden rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-dashed border-primary/30 mb-4 flex items-center justify-center group-hover:border-primary/50 transition-colors">
										<div className="text-center">
											<HiOutlinePlus className="w-8 h-8 text-primary mx-auto mb-2" />
											<p className="text-sm text-primary font-medium">
												Share Your Expertise
											</p>
										</div>
									</div>
								) : (
									event.featuredImage && (
										<div
											className="relative aspect-video overflow-hidden rounded-lg bg-muted mb-4 bg-cover bg-center bg-no-repeat transition-transform duration-300 group-hover:scale-105"
											style={{
												backgroundImage: `url(${event.featuredImage})`,
											}}
										/>
									)
								)}

								{/* Event Info */}
								<div className="space-y-3">
									{/* Title and Type Row */}
									<div className="flex items-start justify-between gap-3">
										<h3 className="text-lg font-medium text-foreground leading-tight group-hover:text-primary transition-colors flex-1">
											{event.title}
										</h3>
										<span className="text-xs uppercase tracking-wider text-primary font-medium bg-primary/10 px-2 py-1 rounded-md whitespace-nowrap">
											{formatEventType(event.type)}
										</span>
									</div>

									{/* Speaker & Company Compact Row */}
									{event.speaker && event.company && (
										<div className="flex items-center gap-3 text-sm">
											<div className="flex items-center gap-1.5">
												<HiOutlineUser className="w-3.5 h-3.5 text-muted-foreground/70" />
												<span className="font-medium text-muted-foreground">
													{event.speaker}
												</span>
											</div>
											<span className="text-muted-foreground/60">•</span>
											<div className="flex items-center gap-1.5">
												<HiOutlineOfficeBuilding className="w-3.5 h-3.5 text-muted-foreground/70" />
												<span className="text-muted-foreground/80">
													{event.company}
												</span>
											</div>
										</div>
									)}

									{/* CTA Description for Become a Speaker */}
									{event.isCallToAction && (
										<p className="text-sm text-muted-foreground">
											Have industry insights to share? Apply to speak at our
											next event.
										</p>
									)}

									{/* Event Description for regular events */}
									{!event.isCallToAction && event.shortDescription && (
										<p className="text-sm text-muted-foreground line-clamp-2">
											{event.shortDescription}
										</p>
									)}
								</div>
							</Link>
						))}
					</div>

					{/* CTA Section */}
					<div className="mt-16 pt-8 border-t border-border text-center">
						<div className="max-w-2xl mx-auto">
							<p className="text-lg text-muted-foreground leading-relaxed mb-8">
								<span className="font-medium text-foreground">
									Don&apos;t miss out on these exclusive opportunities.
								</span>{" "}
								Join our events to network with industry leaders and gain
								insights that will shape your maritime career.
							</p>
							<Link href="/events">
								<Button size="lg" className="text-lg min-w-[200px] h-12">
									View All Events
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default EventsSection;
