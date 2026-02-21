"use client";

import Script from "next/script";

export default function StructuredData() {
	const organizationData = {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: "Maritime@Penn",
		alternateName: "MAP",
		description:
			"The first maritime club at the University of Pennsylvania, uniting students from diverse fields to tackle real maritime challenges and develop future industry leaders.",
		url: "https://pennmaritime.club",
		logo: "https://pennmaritime.club/brand/pennmaritime.svg",
		foundingDate: "2024",
		address: {
			"@type": "PostalAddress",
			addressLocality: "Philadelphia",
			addressRegion: "PA",
			addressCountry: "US",
		},
		parentOrganization: {
			"@type": "CollegeOrUniversity",
			name: "University of Pennsylvania",
			url: "https://www.upenn.edu",
		},
		memberOf: {
			"@type": "CollegeOrUniversity",
			name: "University of Pennsylvania",
		},
		keywords:
			"maritime, University of Pennsylvania, Penn, Philadelphia, student organization, maritime innovation, blue economy, maritime technology, naval architecture, marine engineering",
		sameAs: [],
		contactPoint: {
			"@type": "ContactPoint",
			contactType: "general inquiry",
			url: "https://pennmaritime.club/contact",
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
