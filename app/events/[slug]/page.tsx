import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/navigation/Navbar";
import EventContentSection from "@/components/sections/events/EventContentSection";
import EventHeroSection from "@/components/sections/events/EventHeroSection";
import EventPhotosSection from "@/components/sections/events/EventPhotosSection";
import Footer from "@/components/sections/Footer";
import { getAllEvents, getEventBySlug } from "@/lib/keystatic";

interface EventPageProps {
	params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
	const events = await getAllEvents();

	return events
		.filter((event) => event.status !== "draft")
		.map((event) => ({
			slug: event.slug,
		}));
}

export async function generateMetadata({
	params,
}: EventPageProps): Promise<Metadata> {
	const { slug } = await params;
	const event = await getEventBySlug(slug);

	if (!event) {
		return {
			title: "Event Not Found",
		};
	}

	return {
		title: `${event.title} | Maritime@Penn`,
		description: event.shortDescription || `Join us for ${event.title}`,
		openGraph: {
			title: `${event.title} | Maritime@Penn`,
			description: event.shortDescription || `Join us for ${event.title}`,
			images: event.featuredImage ? [event.featuredImage] : [],
			type: "article",
		},
		twitter: {
			card: "summary_large_image",
			title: `${event.title} | Maritime@Penn`,
			description: event.shortDescription || `Join us for ${event.title}`,
			images: event.featuredImage ? [event.featuredImage] : [],
		},
	};
}

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
};

export default async function EventPage({ params }: EventPageProps) {
	const { slug } = await params;
	const event = await getEventBySlug(slug);

	if (!event || event.status === "draft") {
		notFound();
	}

	return (
		<div className="min-h-screen">
			<Navbar />

			{/* Event Hero Section */}
			<EventHeroSection event={event} />

			{/* Event Content Section */}
			<EventContentSection event={event} />

			{/* Event Photos Section */}
			<EventPhotosSection
				eventImages={event.eventImages}
				eventTitle={event.title}
			/>

			{/* Footer */}
			<Footer />
		</div>
	);
}
