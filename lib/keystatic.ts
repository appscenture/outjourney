import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../keystatic.config";

export const reader = createReader(process.cwd(), keystaticConfig);

export type Event = {
	slug: string;
	title: string;
	type: string;
	speaker: string;
	company: string;
	date: string | null;
	time: string;
	location: string;
	featuredImage: string | null;
	eventImages: readonly (string | null)[];
	shortDescription: string;
	content: unknown;
	presidentMessage:
		| { discriminant: false; value: null }
		| { discriminant: true; value: { title: string; content: string } };
	registrationLink: string | null;
	tags: readonly string[];
	featured: boolean;
	status: "upcoming" | "past" | "draft";
};

export async function getAllEvents(): Promise<Event[]> {
	const events = await reader.collections.events.all();

	return Promise.all(
		events.map(async (event) => {
			const entry = event.entry;
			const content = await entry.content();

			let presidentMessage = entry.presidentMessage;
			if (presidentMessage.discriminant && presidentMessage.value) {
				// Since we changed to fields.text(), the content should now be a string
				const rawContent = presidentMessage.value.content;
				let processedContent: string;

				if (typeof rawContent === "string") {
					// It's a text string, keep it as is
					processedContent = rawContent;
				} else {
					// It's already processed content
					processedContent = String(rawContent);
				}

				presidentMessage = {
					...presidentMessage,
					value: {
						...presidentMessage.value,
						content: processedContent,
					},
				};
			}

			return {
				slug: event.slug,
				...entry,
				content,
				presidentMessage,
			};
		}),
	);
}

export async function getFeaturedEvents(): Promise<Event[]> {
	const allEvents = await getAllEvents();
	return allEvents.filter(
		(event) => event.featured && event.status !== "draft",
	);
}

export async function getUpcomingEvents(): Promise<Event[]> {
	const allEvents = await getAllEvents();
	return allEvents
		.filter(
			(event): event is typeof event & { date: string } =>
				event.status === "upcoming" && Boolean(event.date),
		)
		.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export async function getPastEvents(): Promise<Event[]> {
	const allEvents = await getAllEvents();
	return allEvents
		.filter(
			(event): event is typeof event & { date: string } =>
				event.status === "past" && Boolean(event.date),
		)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
	try {
		const event = await reader.collections.events.read(slug);
		if (!event) return null;

		const content = await event.content();

		let presidentMessage = event.presidentMessage;
		if (presidentMessage.discriminant && presidentMessage.value) {
			// Since we changed to fields.text(), the content should now be a string
			const rawContent = presidentMessage.value.content;
			let processedContent: string;

			if (typeof rawContent === "string") {
				// It's a text string, keep it as is
				processedContent = rawContent;
			} else {
				// It's already processed content
				processedContent = String(rawContent);
			}

			presidentMessage = {
				...presidentMessage,
				value: {
					...presidentMessage.value,
					content: processedContent,
				},
			};
		}

		return {
			slug,
			...event,
			content,
			presidentMessage,
		};
	} catch (error) {
		console.error("Error fetching event:", error);
		return null;
	}
}

export function formatEventDate(dateString: string | null): string {
	if (!dateString) return "Date TBD";
	const date = new Date(dateString);
	return date.toLocaleDateString("en-US", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}

export function formatEventType(type: string): string {
	return type;
}
