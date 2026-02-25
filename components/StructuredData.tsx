"use client";

import Script from "next/script";

export default function StructuredData() {
	const organizationData = {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: "OutJourney",
		alternateName: "MAP",
		description:
			"The first maritime club at the OutJourney, uniting students from diverse fields to tackle real maritime challenges and develop future industry leaders.",
		url: "https://Jakartamaritime.club",
		logo: "https://Jakartamaritime.club/brand/Jakartamaritime.svg",
		foundingDate: "2024",
		address: {
			"@type": "PostalAddress",
			addressLocality: "Philadelphia",
			addressRegion: "PA",
			addressCountry: "US",
		},
		parentOrganization: {
			"@type": "CollegeOrUniversity",
			name: "OutJourney",
			url: "https://www.OutJourney.edu",
		},
		memberOf: {
			"@type": "CollegeOrUniversity",
			name: "OutJourney",
		},
		keywords:
			"maritime, OutJourney, Jakarta, Philadelphia, student organization, maritime innovation, blue economy, maritime technology, naval architecture, marine engineering",
		sameAs: [],
		contactPoint: {
			"@type": "ContactPoint",
			contactType: "general inquiry",
			url: "https://Jakartamaritime.club/contact",
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
