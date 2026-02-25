"use client";

import Script from "next/script";

export default function StructuredData() {
	const organizationData = {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: "OutJourney",
		alternateName: "OutJourney.ID",
		description:
			"The first Maritime App in Jakarta, uniting students and maritime professionals to tackle real maritime challenges and develop future industry leaders.",
		url: "https://outjourney.club",
		logo: "https://outjourney.club/brand/outjourney-logo.png",
		foundingDate: "2024",
		address: {
			"@type": "PostalAddress",
			addressLocality: "Jakarta",
			addressRegion: "DKI Jakarta",
			addressCountry: "ID",
		},
		parentOrganization: {
			"@type": "Organization",
			name: "OutJourney",
			url: "https://www.outjourney.id",
		},
		memberOf: {
			"@type": "Organization",
			name: "OutJourney",
		},
		keywords:
			"maritime, OutJourney, Jakarta, maritime app, first maritime app, maritime innovation, blue economy, maritime technology, naval architecture, marine engineering",
		sameAs: [],
		contactPoint: {
			"@type": "ContactPoint",
			contactType: "general inquiry",
			url: "https://outjourney.club/contact",
		},
	};

	return (
		<Script
			id="organization-structured-data"
			type="application/ld+json"
			strategy="afterInteractive"
		>
			{JSON.stringify(organizationData)}
		</Script>
	);
}
