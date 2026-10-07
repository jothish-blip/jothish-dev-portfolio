import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security Architecture & Policy | Jothish Gandham",
  description: "Overview of security controls, defense-in-depth architecture, data protection, and operational safeguards for Jothish Gandham's infrastructure.",
  alternates: {
    canonical: "https://www.webjothishanalyst.site/security-policy",
  },
  openGraph: {
    title: "Security Architecture & Policy | Jothish Gandham",
    description: "Overview of security controls and technical safeguards for Jothish Gandham's portfolio.",
    url: "https://www.webjothishanalyst.site/security-policy",
    type: "website",
  },
};

export default function SecurityPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
