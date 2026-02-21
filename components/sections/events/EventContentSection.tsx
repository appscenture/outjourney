import type { DocumentElement } from "@keystatic/core";
import { DocumentRenderer } from "@keystatic/core/renderer";
import type React from "react";
import MarkdownRenderer from "@/components/ui/markdown-renderer";
import type { Event as EventType } from "@/lib/keystatic";

interface EventContentSectionProps {
	event: EventType;
}

const EventContentSection: React.FC<EventContentSectionProps> = ({ event }) => {
	if (!event.content) {
		return null;
	}

	// Check if content is a valid document array for DocumentRenderer
	const isValidDocument =
		Array.isArray(event.content) && event.content.length > 0;

	// Get president message content - handle string format
	const getPresidentMessageContent = () => {
		if (
			!event.presidentMessage ||
			!event.presidentMessage.discriminant ||
			!event.presidentMessage.value?.content
		) {
			return null;
		}

		const { content } = event.presidentMessage.value;

		// Check if it's a string (text field format)
		if (typeof content === "string" && content.trim()) {
			return { type: "string" as const, content };
		}

		return null;
	};

	const presidentMessageData = getPresidentMessageContent();

	return (
		<section className="relative flex flex-col p-4 sm:p-6 lg:p-8">
			{/* Content Card Container */}
			<div className="relative rounded-2xl sm:rounded-3xl bg-background overflow-hidden">
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
				<div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto py-16 lg:py-24">
					{/* Event Tags */}
					{event.tags && event.tags.length > 0 && (
						<div className="mb-8">
							<div className="flex flex-wrap gap-2">
								{event.tags.map((tag) => (
									<span
										key={tag}
										className="text-xs uppercase tracking-wider text-primary font-medium bg-primary/10 px-3 py-1.5 rounded-full border-t border-primary/20 backdrop-blur-sm"
									>
										{tag}
									</span>
								))}
							</div>
						</div>
					)}

					{/* Event Content */}
					<div className="event-content">
						{isValidDocument ? (
							<DocumentRenderer document={event.content as DocumentElement[]} />
						) : (
							<pre className="whitespace-pre-wrap text-muted-foreground bg-muted p-4 rounded-lg">
								{JSON.stringify(event.content, null, 2)}
							</pre>
						)}
					</div>

					{/* President Message - Minimalistic */}
					{presidentMessageData && (
						<div className="mt-16 pt-8 border-t border-border">
							<div className="text-center space-y-6">
								<h3 className="text-lg font-medium text-foreground">
									Words from the President
								</h3>
								<div className="max-w-6xl mx-auto">
									<div className="relative">
										<MarkdownRenderer
											content={`"${presidentMessageData.content}"`}
											className="event-content text-center [&_p]:text-center [&_p]:italic [&_p]:text-lg [&_p]:leading-relaxed"
										/>
									</div>
								</div>
								<div className="text-sm text-muted-foreground pt-4">
									<p className="font-medium">Luka Adzic</p>
									<p>Founder & President, OutJourney</p>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default EventContentSection;
