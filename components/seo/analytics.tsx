import Script from "next/script";

/**
 * Analytics slots — nothing renders unless the corresponding env var is set.
 * NEXT_PUBLIC_PLAUSIBLE_DOMAIN=your.domain  → Plausible
 * NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX            → Google Analytics 4
 */
export function Analytics() {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <>
      {plausibleDomain && (
        <Script
          strategy="afterInteractive"
          src="https://plausible.io/js/script.js"
          data-domain={plausibleDomain}
        />
      )}
      {gaId && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          />
          <Script id="ga4-config" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');`}
          </Script>
        </>
      )}
    </>
  );
}
