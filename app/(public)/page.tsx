import { Metadata } from "next";
import PortfolioSPA from "@/components/layout/PortfolioSPA";

export const metadata: Metadata = {
  title: "Jothish Gandham — Cybersecurity Analyst & Detection Engineer",
  description: "Cybersecurity portfolio of Jothish Gandham. Showcasing expertise in SOC Operations, Threat Detection, Incident Response, SIEM (Splunk, Microsoft Sentinel, Wazuh), and Security Automation.",
  alternates: {
    canonical: "https://www.webjothishanalyst.site/",
  },
  openGraph: {
    title: "Jothish Gandham — Cybersecurity Analyst & Detection Engineer",
    description: "Cybersecurity portfolio of Jothish Gandham. Showcasing expertise in SOC Operations, Threat Detection, Incident Response, SIEM, and Security Automation.",
    url: "https://www.webjothishanalyst.site/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jothish Gandham — Cybersecurity Analyst & Detection Engineer",
    description: "Cybersecurity portfolio of Jothish Gandham. Showcasing expertise in SOC Operations, Threat Detection, Incident Response, SIEM, and Security Automation.",
  },
};

export default function Home() {
  return <PortfolioSPA />;
}