"use client";

import { HoverEffect } from "../ui/card-hover-effect";

export function WhyUs() {
  return (
    (<div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>)
  );
}
export const projects = [
    {
        title: "Easy Link Shortening",
        description:
          "Transform long URLs into short, shareable links in seconds.",
        link: "#easy-link-shortening",
      },
      {
        title: "Advanced Analytics",
        description:
          "Track clicks, location, and device stats with our detailed analytics dashboard.",
        link: "#advanced-analytics",
      },
      {
        title: "Customizable Links",
        description:
          "Create branded links and add custom aliases for better engagement.",
        link: "#customizable-links",
      },
      {
        title: "Secure & Reliable",
        description:
          "Your data is protected with industry-standard security protocols.",
        link: "#secure-reliable",
      },
      {
        title: "Simple Pricing",
        description:
          "One plan with all features to suit all your link management needs.",
        link: "#simple-pricing",
      },
      {
        title: "Integration Options",
        description:
          "Seamlessly integrate with popular platforms and tools for a smoother workflow.",
        link: "#integration-options",
      },
];
