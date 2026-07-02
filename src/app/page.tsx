import { Hero } from "@/components/home/Hero";
import { SpeedInsights } from "@vercel/speed-insights/next"
import dynamic from "next/dynamic";

const Features = dynamic(() => import("@/components/home/Features").then(mod => mod.Features));
const TechSpecs = dynamic(() => import("@/components/home/TechSpecs").then(mod => mod.TechSpecs));
const SubscriptionForm = dynamic(() => import("@/components/home/SubscriptionForm").then(mod => mod.SubscriptionForm));

export default function Home() {
  return (
    <>
      <SpeedInsights />
      <Hero />
      <Features />
      <TechSpecs />
      <SubscriptionForm />
    </>
  );
}