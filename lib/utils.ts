import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Build a mailto: link with a prefilled subject/body. */
export function mailtoLink(opts: { subject?: string; body?: string }) {
  const params = new URLSearchParams();
  if (opts.subject) params.set("subject", opts.subject);
  if (opts.body) params.set("body", opts.body);
  const qs = params.toString();
  return `mailto:vincevisiontech@proton.me${qs ? `?${qs}` : ""}`;
}

/** Build a wa.me link with a prefilled message. */
export function whatsappLink(message?: string, e164 = "254742850266") {
  const params = new URLSearchParams();
  if (message) params.set("text", message);
  const qs = params.toString();
  return `https://wa.me/${e164}${qs ? `?${qs}` : ""}`;
}
