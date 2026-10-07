export default function HomePageJsonLd() {
  const webpageLd = {
    "@context": "https://schema.org",
    "@type": ["WebPage", "ProfilePage"],
    "@id": "https://www.webjothishanalyst.site/#webpage",
    url: "https://www.webjothishanalyst.site",
    name: "Jothish Gandham — Cybersecurity Analyst Portfolio",
    description: "Explore the cybersecurity portfolio of Jothish Gandham, featuring projects in threat detection, incident response, SIEM, and SOC operations.",
    isPartOf: {
      "@id": "https://www.webjothishanalyst.site/#website"
    },
    about: {
      "@id": "https://www.webjothishanalyst.site/#person"
    },
    mainEntity: {
      "@id": "https://www.webjothishanalyst.site/#person"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageLd) }}
    />
  );
}
