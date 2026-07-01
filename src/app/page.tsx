import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { TechSpecs } from "@/components/home/TechSpecs";
import { SubscriptionForm } from "@/components/home/SubscriptionForm";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <TechSpecs />
      <SubscriptionForm />
    </>
  );
}