const SITE = "https://kilnbook.co";

const publisher = {
	"@type": "Organization",
	name: "Kilnbook",
	url: SITE,
	logo: `${SITE}/images/logo.svg`,
};

interface FeatureInput {
	name: string;
	description: string;
	url: string;
	image: string;
	/** Monthly USD prices of the plans that include this feature, from src/pages/pricing.astro. */
	planPrices: number[];
}

/** SoftwareApplication markup for a /features/* page. */
export function featureSchema({ name, description, url, image, planPrices }: FeatureInput) {
	return {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name,
		description,
		url,
		image,
		applicationCategory: "BusinessApplication",
		publisher,
		offers: {
			"@type": "AggregateOffer",
			priceCurrency: "USD",
			lowPrice: Math.min(...planPrices),
			highPrice: Math.max(...planPrices),
			offerCount: planPrices.length,
			url: `${SITE}/pricing`,
		},
	};
}

interface ArticleInput {
	title: string;
	description: string;
	url: string;
	author: string;
	datePublished: Date;
	dateModified?: Date;
}

export function articleSchema({ title, description, url, author, datePublished, dateModified }: ArticleInput) {
	return {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		name: title,
		headline: title,
		description,
		url,
		mainEntityOfPage: url,
		datePublished: datePublished.toISOString(),
		dateModified: (dateModified ?? datePublished).toISOString(),
		author: { "@type": "Person", name: author },
		publisher,
	};
}
