import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="vv-container flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="vv-eyebrow">404 — Signal lost</p>
      <h1 className="vv-heading mt-4">This page drifted off the grid.</h1>
      <p className="mt-4 max-w-md text-sm text-slate-300">
        The page you are looking for does not exist or has moved. Return to the main console or
        contact VinceVision directly.
      </p>
      <div className="mt-8 flex gap-3">
        <Button asChild>
          <Link href="/">Back to home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/#contact">Contact us</Link>
        </Button>
      </div>
    </section>
  );
}
