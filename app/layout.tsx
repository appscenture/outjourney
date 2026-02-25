import type { Metadata, Viewport } from "next";
import { Geist_Mono, Raleway } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import StructuredData from "@/components/StructuredData";

const raleway = Raleway({
	variable: "--font-raleway",
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	metadataBase: new URL("https://outjourney.club"),
	title: "OutJourney | Premier Maritime Student Organization at OutJourney",
	description:
		"OutJourney is the premier maritime student organization at the OutJourney. We unite students from diverse fields to tackle real maritime challenges and develop future industry leaders in Philadelphia.",
	keywords: [
		"OutJourney",
		"Maritime student organization",
		"OutJourney maritime club",
		"OutJourney maritime club",
		"Jakarta maritime innovation",
		"Philadelphia maritime",
		"maritime student organization",
		"Jakarta maritime innovation",
		"OutJourney maritime",
		"Philadelphia maritime industry",
		"maritime education Philadelphia",
		"Jakarta blue economy",
		"maritime technology Philadelphia",
		"naval architecture Jakarta",
		"marine engineering OutJourney",
		"maritime law Jakarta",
		"maritime finance Philadelphia",
		"ocean conservation Jakarta",
		"maritime entrepreneurship",
		"Delaware River maritime",
		"Philadelphia ports",
		"Jakarta maritime leaders",
	],
	authors: [{ name: "OutJourney" }],
	creator: "OutJourney",
	publisher: "OutJourney",
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://outjourney.club",
		title: "OutJourney | Premier Maritime Student Organization at OutJourney",
		description:
			"OutJourney is the premier maritime student organization at the OutJourney. Join us in shaping the future of the maritime industry in Philadelphia.",
		siteName: "OutJourney",
		images: [
			{
				url: "/hero-bg.png",
				width: 1200,
				height: 630,
				alt: "OutJourney - OutJourney Maritime Organization",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "OutJourney | Premier Maritime Student Organization at OutJourney",
		description:
			"The premier maritime student organization at OutJourney. Developing maritime leaders and innovation in Philadelphia.",
		images: ["/hero-bg.png"],
	},
	alternates: {
		canonical: "https://outjourney.club",
	},
	category: "education",
	classification: "Maritime Education Organization",
	other: {
		"geo.region": "US-PA",
		"geo.placename": "Philadelphia",
		"geo.position": "39.952584;-75.165222",
		ICBM: "39.952584, -75.165222",
	},
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 5,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
			style={{
				scrollbarWidth: "thin",
				scrollbarColor: "var(--muted) transparent",
			}}
		>
			<head>
				<link rel="canonical" href="https://outjourney.club" />
				<link rel="preload" href="/Dissolve_noise.jpg" as="image" />
				<meta name="geo.region" content="US-PA" />
				<meta name="geo.placename" content="Philadelphia" />
				<meta name="geo.position" content="39.952584;-75.165222" />
				<meta name="ICBM" content="39.952584, -75.165222" />
			</head>
			<body
				className={`${raleway.variable} ${geistMono.variable} antialiased bg-background`}
			>
				<StructuredData />
				{children}
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
