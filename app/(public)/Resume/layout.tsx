import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume | Jothish Gandham — Cybersecurity Analyst",
  description: "Professional cybersecurity resume of Jothish Gandham. Specializing in SOC operations, SIEM analysis, incident response, network defense, and security automation.",
  alternates: {
    canonical: "https://www.webjothishanalyst.site/resume",
  },
  openGraph: {
    title: "Resume | Jothish Gandham — Cybersecurity Analyst",
    description: "Professional cybersecurity resume of Jothish Gandham. Specializing in SOC operations, SIEM analysis, incident response, network defense, and security automation.",
    url: "https://www.webjothishanalyst.site/resume",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume | Jothish Gandham — Cybersecurity Analyst",
    description: "Professional cybersecurity resume of Jothish Gandham. Specializing in SOC operations, SIEM analysis, incident response, network defense, and security automation.",
  },
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
