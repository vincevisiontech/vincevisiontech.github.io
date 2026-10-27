/** Inline SVG icon set — stroke-based, currentColor, no icon dependency. */
const paths: Record<string, React.ReactNode> = {
  "ai-automation-data": (
    <>
      <path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1m0-12.8-2.1 2.1M7.7 16.3l-2.1 2.1" />
      <circle cx="12" cy="12" r="3.2" />
    </>
  ),
  "cloud-devops-infrastructure": (
    <>
      <path d="M7 18h9.5a3.5 3.5 0 0 0 .5-6.96A5.5 5.5 0 0 0 6.4 9.6 3.5 3.5 0 0 0 7 18Z" />
      <path d="M12 13v4m0 0-1.5-1.5M12 17l1.5-1.5" />
    </>
  ),
  "cybersecurity-compliance": (
    <>
      <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  "software-engineering": (
    <>
      <path d="m8 8-4 4 4 4m8-8 4 4-4 4M13 5l-2 14" />
    </>
  ),
  "digital-experience-commerce": (
    <>
      <path d="M4 4h16v4H4zM4 12h16v8H4z" />
      <path d="M8 20v-4h3v4" />
    </>
  ),
  "technology-advisory-training": (
    <>
      <path d="M12 4a8 8 0 1 0 8 8" />
      <path d="M12 8v4l3 2" />
      <path d="M18 4v4h-4" />
    </>
  ),
};

export function ServiceIcon({ id }: { id: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[id] ?? paths["software-engineering"]}
    </svg>
  );
}
