import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} handles information shared through its website and communication channels.`,
};

export default function PrivacyPage() {
  return (
    <section className="vv-container max-w-3xl py-28">
      <p className="vv-eyebrow">Legal</p>
      <h1 className="vv-heading mt-3">Privacy Policy</h1>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-slate-300">
        <p>
          {site.name} (&quot;VinceVision&quot;, &quot;we&quot;) respects your privacy. This policy
          explains what information we collect through this website and how we use it.
        </p>
        <h2 className="font-display text-lg font-semibold text-slate-100">Information you provide</h2>
        <p>
          This site has no public contact form. When you email us at {site.email} or message our
          WhatsApp number {site.whatsapp.display}, you choose what information to share. We use it
          solely to respond to your enquiry and, where agreed, to deliver services.
        </p>
        <h2 className="font-display text-lg font-semibold text-slate-100">Website assistant</h2>
        <p>
          Questions submitted to the on-site assistant are processed through our AI provider to
          generate answers about VinceVision. Conversations are not sold or used for advertising.
          Do not submit sensitive personal or regulated data through the assistant.
        </p>
        <h2 className="font-display text-lg font-semibold text-slate-100">Analytics</h2>
        <p>
          We may deploy privacy-respecting analytics (such as Plausible) to understand aggregate
          traffic. No cross-site tracking or advertising profiles are created.
        </p>
        <h2 className="font-display text-lg font-semibold text-slate-100">Retention &amp; rights</h2>
        <p>
          We retain enquiry records only as long as needed for the relationship or legal
          obligations. You may request access, correction, or deletion by emailing{" "}
          {site.email}.
        </p>
        <p className="text-xs text-slate-500">
          {/* TODO(placeholder): set an effective date and have this policy reviewed before launch. */}
          Last updated: October 2026. This is a starter policy — obtain legal review for your
          jurisdictions (Kenya &amp; United Kingdom) before launch.
        </p>
      </div>
    </section>
  );
}
