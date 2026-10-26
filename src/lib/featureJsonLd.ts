const site = "https://kilnbook.co";

export function featureJsonLd(name: string, description: string, path: string) {
	return {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: `Kilnbook: ${name}`,
		description,
		url: new URL(path, site).href,
		applicationCategory: "BusinessApplication",
		operatingSystem: "Web",
		offers: {
			"@type": "AggregateOffer",
			priceCurrency: "USD",
			lowPrice: "29",
			highPrice: "149",
			offerCount: 3,
			url: `${site}/pricing`,
		},
		publisher: {
			"@type": "Organization",
			name: "Kilnbook",
			url: site,
			logo: `${site}/images/logo.svg`,
		},
	};
}
