import Link from "next/link";
import type React from "react";
import {
	HiArrowLeft,
	HiOutlineCalendar,
	HiOutlineClock,
	HiOutlineLocationMarker,
} from "react-icons/hi";
import { Button } from "@/components/ui/button";
import {
	type Event as EventType,
	formatEventDate,
	formatEventType,
} from "@/lib/keystatic";

interface EventHeroSectionProps {
	event: EventType;
}

const EventHeroSection: React.FC<EventHeroSectionProps> = ({ event }) => {
	return (
		<section className="relative min-h-screen flex flex-col p-4 sm:p-6 lg:p-8">
			{/* Hero Card Container */}
			<div className="relative flex-1 rounded-2xl sm:rounded-3xl overflow-hidden">
				{/* Background Image */}
				{event.featuredImage && (
					<div
						className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
						style={{
							backgroundImage: `url(${event.featuredImage})`,
						}}
					/>
				)}

				{/* Overlay */}
				<div className="absolute inset-0 z-6 bg-gradient-to-b from-black/40 via-black/60 to-black/80"></div>

				{/* Content */}
				<div className="relative z-10 flex-1 flex items-end px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto min-h-[calc(100vh-2rem)] sm:min-h-[calc(100vh-3rem)] lg:min-h-[calc(100vh-4rem)] pt-42 pb-16">
					<div className="w-full">
						{/* Breadcrumb */}
						<div className="mb-6">
							<Link
								href="/events"
								className="text-foreground/80 hover:text-foreground transition-colors text-sm font-medium flex items-center gap-2"
							>
								<HiArrowLeft className="w-4 h-4" />
								Back to Events
							</Link>
						</div>

						{/* Event Type Badge */}
						<div className="mb-4">
							<span className="text-xs uppercase tracking-wider text-foreground font-medium bg-card/10 backdrop-blur-sm px-3 py-1.5 rounded-md border-t border-border">
								{formatEventType(event.type)}
							</span>
						</div>

						{/* Title */}
						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-foreground mb-6 leading-tight max-w-4xl">
							{event.title}
						</h1>

						{/* Event Details Grid */}
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
							{/* Date */}
								<div className="flex items-center gap-3 text-foreground/90">
								<HiOutlineCalendar className="w-5 h-5" />
								<div>
									<p className="text-sm font-medium">
										{formatEventDate(event.date)}
									</p>
								</div>
							</div>

							{/* Time */}
							{event.time && (
								<div className="flex items-center gap-3 text-foreground/90">
									<HiOutlineClock className="w-5 h-5" />
									<div>
										<p className="text-sm font-medium">{event.time}</p>
									</div>
								</div>
							)}

							{/* Location */}
							{event.location && (
								<div className="flex items-center gap-3 text-foreground/90">
									<HiOutlineLocationMarker className="w-5 h-5" />
									<div>
										<p className="text-sm font-medium">{event.location}</p>
									</div>
								</div>
							)}

							{/* Status */}
							<div className="flex items-center gap-3">
								<div
									className={`w-3 h-3 rounded-full ${
										event.status === "upcoming" ? "bg-green-400" : "bg-gray-400"
									}`}
								></div>
								<p className="text-sm font-medium text-foreground/90 capitalize">
									{event.status}
								</p>
							</div>
						</div>

						{/* Speaker Info */}
						{event.speaker && event.company && (
							<div className="mb-8 max-w-2xl">
								<div className="border-l-2 border-white/30 pl-6">
									<p className="text-sm text-foreground/70 uppercase tracking-wider font-medium mb-2">
										Featured Speaker
									</p>
									<h3 className="text-2xl font-light text-foreground mb-1">
										{event.speaker}
									</h3>
									<p className="text-lg text-foreground/80 font-light">
										{event.company}
									</p>
								</div>
							</div>
						)}

						{/* Short Description */}
						{event.shortDescription && (
							<p className="text-lg text-foreground/90 leading-relaxed max-w-3xl mb-8">
								{event.shortDescription}
							</p>
						)}

						{/* Registration CTA */}
						{event.registrationLink && event.status === "upcoming" && (
							<div className="flex flex-col sm:flex-row gap-4">
								<Link
									href={event.registrationLink}
									target="_blank"
									rel="noopener noreferrer"
								>
									<Button size="lg" className="text-lg min-w-[200px] h-12">
										Register Now
									</Button>
								</Link>
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

export default EventHeroSection;
