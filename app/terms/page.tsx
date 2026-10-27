import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms governing use of the ${site.name} website.`,
};

export default function TermsPage() {
  return (
    <section className="vv-container max-w-3xl py-28">
      <p className="vv-eyebrow">Legal</p>
      <h1 className="vv-heading mt-3">Terms of Use</h1>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-slate-300">
        <p>
          By accessing this website operated by {site.name}, you agree to the following terms. If
          you do not agree, please discontinue use.
        </p>
        <h2 className="font-display text-lg font-semibold text-slate-100">Use of content</h2>
        <p>
          All text, branding, and visuals are the property of {site.legalName} or its licensors.
          You may not reproduce, resell, or exploit site content for commercial purposes without
          written permission, except where content is expressly made available for sharing.
        </p>
        <h2 className="font-display text-lg font-semibold text-slate-100">No service guarantee</h2>
        <p>
          Website content is provided for general information and does not constitute a binding
          offer. Engagements are governed by separate written agreements (statements of work or
          contracts) signed by both parties.
        </p>
        <h2 className="font-display text-lg font-semibold text-slate-100">Third-party links</h2>
        <p>
          We may link to third-party sites, such as client work or communication platforms. We are
          not responsible for the content or practices of those sites.
        </p>
        <h2 className="font-display text-lg font-semibold text-slate-100">Limitation of liability</h2>
        <p>
          The website is provided &quot;as is&quot; without warranties of uninterrupted availability.
          To the maximum extent permitted by law, {site.legalName} is not liable for indirect or
          consequential losses arising from reliance on website content.
        </p>
        <p className="text-xs text-slate-500">
          {/* TODO(placeholder): obtain legal review before launch. */}
          Last updated: October 2026. Starter terms — obtain legal review for Kenya &amp; the
          United Kingdom before launch.
        </p>
      </div>
    </section>
  );
}
