import { locations, services, site } from "@/content/site";

/** Structured data: Organization + LocalBusiness nodes, generated from content config. */
export function JsonLd() {
  const graph = [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.legalName,
      url: site.url,
      logo: `${site.url}/icon.svg`,
      description: site.description,
      foundingDate: String(site.foundingYear),
      email: site.email,
      telephone: `+${site.whatsapp.e164}`,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: `+${site.whatsapp.e164}`,
        contactType: "customer support",
        areaServed: ["KE", "GB"],
        availableLanguage: ["English"],
      },
      sameAs: site.socials.map((s) => s.href).filter((href) => href && href !== "#"),
      knowsAbout: services.map((s) => s.title),
      location: locations.map((loc) => ({
        "@type": "Place",
        name: `${loc.city}, ${loc.country}`,
        address: {
          "@type": "PostalAddress",
          // TODO(placeholder): add streetAddress/postalCode in content/site.ts before launch.
          addressLocality: loc.city,
          addressCountry: loc.country === "Kenya" ? "KE" : "GB",
        },
      })),
    },
    ...locations.map((loc) => ({
      "@type": "LocalBusiness",
      name: `${site.legalName} — ${loc.city}`,
      url: site.url,
      email: site.email,
      telephone: `+${site.whatsapp.e164}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: loc.city,
        addressCountry: loc.country === "Kenya" ? "KE" : "GB",
      },
      areaServed: loc.country === "Kenya" ? "Africa" : "Europe",
    })),
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) }}
    />
  );
}
