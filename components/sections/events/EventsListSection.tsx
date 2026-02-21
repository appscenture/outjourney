import Link from "next/link";
import type React from "react";
import { HiOutlineBuildingOffice, HiOutlineUser } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import {
	formatEventDate,
	formatEventType,
	getAllEvents,
} from "@/lib/keystatic";

const EventsListSection: React.FC = async () => {
	const allEvents = await getAllEvents();

	// Filter out draft events and sort by date (latest first)
	const events = allEvents
		.filter((event) => event.status !== "draft")
		.sort((a, b) => {
			const dateA = a.date ? new Date(a.date).getTime() : 0;
			const dateB = b.date ? new Date(b.date).getTime() : 0;
			return dateB - dateA; // Latest events first (regardless of status)
		});

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
				<div className="relative z-10 flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-[98%] lg:max-w-[1600px] xl:max-w-[1800px] mx-auto py-20 pt-32 min-h-[calc(100vh-2rem)] sm:min-h-[calc(100vh-3rem)] lg:min-h-[calc(100vh-4rem)]">
					{/* Header */}
					<div className="text-center w-full mb-16">
						{/* Tagline */}
						<div className="mb-6">
							<span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
								Our Events
							</span>
						</div>

						{/* Main Headline */}
						<h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-foreground mb-8 leading-tight max-w-4xl mx-auto">
							<span className="text-muted-foreground">Discover our</span>{" "}
							<span className="font-medium text-primary">upcoming events</span>{" "}
							<span className="text-muted-foreground">
								and past highlights.
							</span>
						</h2>
					</div>

					{/* Events Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
						{events.map((event) => (
							<Link
								key={event.slug}
								href={`/events/${event.slug}`}
								className="group cursor-pointer"
							>
								{/* Event Image */}
								{event.featuredImage && (
									<div
										className="relative aspect-video overflow-hidden rounded-lg bg-muted mb-4 bg-cover bg-center bg-no-repeat transition-transform duration-300 group-hover:scale-105"
										style={{
											backgroundImage: `url(${event.featuredImage})`,
										}}
									>
										{/* Status Badge */}
										<div className="absolute top-3 left-3">
											<span
												className={`text-xs uppercase tracking-wider font-medium px-2 py-1 rounded-md backdrop-blur-sm ${
													event.status === "upcoming"
														? "bg-green-500/10 text-green-500 border-t border-green-500/20"
														: "bg-muted-foreground/10 text-muted-foreground border-t border-muted-foreground/20"
												}`}
											>
												{event.status}
											</span>
										</div>
									</div>
								)}

								{/* Event Info */}
								<div className="space-y-3">
									{/* Date */}
									<div className="text-sm text-muted-foreground">
										{formatEventDate(event.date)}
										{event.time && <span className="ml-2">• {event.time}</span>}
									</div>

									{/* Title and Type Row */}
									<div className="flex items-start justify-between gap-3">
										<h3 className="text-lg font-medium text-foreground leading-tight group-hover:text-primary transition-colors flex-1">
											{event.title}
										</h3>
										<span className="text-xs uppercase tracking-wider text-primary font-medium bg-primary/10 px-2 py-1 rounded-md whitespace-nowrap border-t border-primary/20 backdrop-blur-sm">
											{formatEventType(event.type)}
										</span>
									</div>

									{/* Description */}
									{event.shortDescription && (
										<p className="text-sm text-muted-foreground line-clamp-2">
											{event.shortDescription}
										</p>
									)}

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
												<HiOutlineBuildingOffice className="w-3.5 h-3.5 text-muted-foreground/70" />
												<span className="text-muted-foreground/80">
													{event.company}
												</span>
											</div>
										</div>
									)}

									{/* Location */}
									{event.location && (
										<div className="text-sm text-muted-foreground">
											📍 {event.location}
										</div>
									)}
								</div>
							</Link>
						))}
					</div>

					{/* No Events Message */}
					{events.length === 0 && (
						<div className="text-center py-16">
							<h3 className="text-xl font-medium text-muted-foreground mb-4">
								No events found
							</h3>
							<p className="text-muted-foreground mb-8">
								Check back soon for upcoming events and announcements.
							</p>
							<Link href="/contact">
								<Button variant="outline">Contact Us About Events</Button>
							</Link>
						</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default EventsListSection;
