import type { Metadata } from "next";
import { launch } from "@/content/site";
import { LaunchClient } from "@/components/launch/launch-client";

export const metadata: Metadata = {
  title: "Launch Sequence",
  description: launch.teaser,
};

export default function LaunchPage() {
  return <LaunchClient />;
}
