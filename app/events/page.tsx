import type { Metadata, Viewport } from "next";
import Navbar from "@/components/navigation/Navbar";
import EventsListSection from "@/components/sections/events/EventsListSection";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
	title: "Maritime Events | OutJourney",
	description:
		"Discover upcoming maritime events at OutJourney. Join OutJourney for industry speakers, networking opportunities, and maritime innovation discussions in Philadelphia.",
	keywords: [
		"maritime events Philadelphia",
		"OutJourney maritime events",
		"Penn maritime networking",
		"maritime speakers Penn",
		"Philadelphia maritime conferences",
		"OutJourney maritime talks",
		"maritime industry events Philadelphia",
		"Penn maritime meetings",
		"maritime professional development Penn",
		"Philadelphia maritime community events",
		"OutJourney maritime calendar",
		"maritime student events Philadelphia",
		"Penn blue economy events",
		"maritime innovation events Penn",
		"Delaware River maritime events",
	],
	alternates: {
		canonical: "https://pennmaritime.club/events",
	},
	openGraph: {
		title: "Maritime Events | OutJourney",
		description:
			"Upcoming maritime events, industry speakers, and networking opportunities at OutJourney.",
		url: "https://pennmaritime.club/events",
		images: [
			{
				url: "/event-1-main.tiff",
				width: 1200,
				height: 630,
				alt: "OutJourney Events - Maritime Industry Speakers and Networking at OutJourney",
			},
		],
	},
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 5,
};

export default function Events() {
	return (
		<div className="min-h-screen">
			<Navbar />

			<EventsListSection />

			<Footer />
		</div>
	);
}
