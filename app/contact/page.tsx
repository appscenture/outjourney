import type { Metadata, Viewport } from "next";
import Navbar from "@/components/navigation/Navbar";
import ContactFormSection from "@/components/sections/ContactFormSection";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
	title: "Contact Us | Maritime@Penn",
	description:
		"Get in touch with Maritime@Penn to join our maritime community at University of Pennsylvania. Connect with maritime professionals, explore opportunities, and become part of Philadelphia's maritime innovation network.",
	keywords: [
		"contact Maritime@Penn",
		"join maritime club Penn",
		"University of Pennsylvania maritime contact",
		"Penn maritime membership",
		"maritime student organization contact Philadelphia",
		"join UPenn maritime",
		"maritime club application Penn",
		"Philadelphia maritime community contact",
		"University of Pennsylvania maritime opportunities",
		"Penn maritime networking contact",
		"maritime partnerships Philadelphia",
		"UPenn maritime collaboration",
		"maritime internships Penn contact",
		"Philadelphia maritime careers contact",
		"Penn maritime committee join",
	],
	alternates: {
		canonical: "https://pennmaritime.club/contact",
	},
	openGraph: {
		title: "Contact Us | Maritime@Penn",
		description:
			"Connect with Maritime@Penn at University of Pennsylvania. Join our maritime community and explore opportunities in Philadelphia's maritime industry.",
		url: "https://pennmaritime.club/contact",
		images: [
			{
				url: "/hero-bg.png",
				width: 1200,
				height: 630,
				alt: "Contact Maritime@Penn - Join Maritime Club at University of Pennsylvania",
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
