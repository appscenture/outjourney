import type { Metadata, Viewport } from "next";
import Navbar from "@/components/navigation/Navbar";
import ContactFormSection from "@/components/sections/ContactFormSection";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
	title: "Contact Us | OutJourney",
	description:
		"Get in touch with OutJourney to join our maritime community at OutJourney. Connect with maritime professionals, explore opportunities, and become part of Philadelphia's maritime innovation network.",
	keywords: [
		"contact OutJourney",
		"join maritime club Penn",
		"OutJourney maritime contact",
		"Penn maritime membership",
		"maritime student organization contact Philadelphia",
		"join OutJourney maritime",
		"maritime club application Penn",
		"Philadelphia maritime community contact",
		"OutJourney maritime opportunities",
		"Penn maritime networking contact",
		"maritime partnerships Philadelphia",
		"OutJourney maritime collaboration",
		"maritime internships Penn contact",
		"Philadelphia maritime careers contact",
		"Penn maritime committee join",
	],
	alternates: {
		canonical: "https://outjourney.club/contact",
	},
	openGraph: {
		title: "Contact Us | OutJourney",
		description:
			"Connect with OutJourney at OutJourney. Join our maritime community and explore opportunities in Philadelphia's maritime industry.",
		url: "https://outjourney.club/contact",
		images: [
			{
				url: "/hero-bg.png",
				width: 1200,
				height: 630,
				alt: "Contact OutJourney - Join Maritime Club at OutJourney",
			},
		],
	},
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 5,
};

export default function Contact() {
	return (
		<div className="min-h-screen">
			<Navbar />

			<ContactFormSection />

			<Footer />
		</div>
	);
}
