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
		"Join OutJourney (MAP), the premier maritime student organization at University of Pennsylvania. Building tomorrow's maritime leaders through innovation, technology, and collaboration in Philadelphia's maritime industry.",
	keywords: [
		"maritime Philadelphia",
		"University of Pennsylvania maritime",
		"Penn maritime club",
		"Philadelphia maritime students",
		"UPenn maritime innovation",
		"maritime student organization Philadelphia",
		"Penn blue economy",
		"maritime technology University of Pennsylvania",
		"Philadelphia maritime industry",
		"Penn maritime engineering",
		"maritime entrepreneurship Philadelphia",
		"University of Pennsylvania maritime program",
		"Delaware River maritime Penn",
		"maritime finance Philadelphia",
		"ocean conservation University of Pennsylvania",
		"maritime law Penn",
		"Philadelphia maritime education",
		"Penn maritime leaders",
		"maritime innovation Pennsylvania",
		"University of Pennsylvania maritime research",
	],
	alternates: {
		canonical: "https://outjourney.club",
	},
	openGraph: {
		 title: "Building Tomorrow's Maritime Leaders | OutJourney",
		description:
			"Building tomorrow's maritime leaders at Penn. Join the premier maritime student organization in Philadelphia.",
		url: "https://outjourney.club",
		images: [
			{
				url: "/hero-bg.png",
				width: 1200,
				height: 630,
				alt: "OutJourney - First Maritime Club at University of Pennsylvania in Philadelphia",
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
