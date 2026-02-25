import type { Metadata } from "next";
import Navbar from "@/components/navigation/Navbar";
import AboutSection from "@/components/sections/AboutSection";
import CommitteesSection from "@/components/sections/CommitteesSection";
import EventsSection from "@/components/sections/EventsSection";
import Footer from "@/components/sections/Footer";
import HeroSection from "@/components/sections/HeroSection";
import OpportunitiesSection from "@/components/sections/OpportunitiesSection";
import PartnersSection from "@/components/sections/PartnersSection";
import PresidentSection from "@/components/sections/PresidentSection";

export const metadata: Metadata = {
	title: "Building Tomorrow's Maritime Leaders | OutJourney",
	description:
		"Join OutJourney, the first Maritime App in Jakarta. Building tomorrow's maritime leaders through innovation, technology, and collaboration in Indonesia's maritime industry.",
	keywords: [
		"maritime Jakarta",
		"OutJourney maritime",
		"Jakarta maritime app",
		"maritime app Indonesia",
		"OutJourney maritime innovation",
		"first maritime app Jakarta",
		"Jakarta blue economy",
		"maritime technology OutJourney",
		"Jakarta maritime industry",
		"Jakarta maritime engineering",
		"maritime entrepreneurship Jakarta",
		"OutJourney maritime program",
		"maritime app Jakarta",
		"maritime finance Jakarta",
		"ocean conservation OutJourney",
		"maritime law Jakarta",
		"Jakarta maritime education",
		"Jakarta maritime leaders",
		"maritime innovation Jakarta",
		"OutJourney maritime research",
	],
	alternates: {
		canonical: "https://outjourney.club",
	},
	openGraph: {
		title: "Building Tomorrow's Maritime Leaders | OutJourney",
		description:
			"The first Maritime App in Jakarta. Join OutJourney and build tomorrow's maritime leaders through innovation and collaboration.",
		url: "https://outjourney.id",
		images: [
			{
				url: "/hero-bg.png",
				width: 1200,
				height: 630,
				alt: "OutJourney - First Maritime Club at OutJourney in Jakarta",
			},
		],
	},
};

export default function Home() {
	return (
		<div className="min-h-screen">
			<Navbar />

			<HeroSection />
			<AboutSection />
			<OpportunitiesSection />
			<EventsSection />
			<CommitteesSection />
			<PartnersSection />
			<PresidentSection />

			<Footer />
		</div>
	);
}
