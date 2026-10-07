import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Jothish Gandham",
  description: "Privacy & Data Protection Policy for Jothish Gandham's cybersecurity portfolio and systems.",
  alternates: {
    canonical: "https://www.webjothishanalyst.site/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | Jothish Gandham",
    description: "Privacy & Data Protection Policy for Jothish Gandham's cybersecurity portfolio.",
    url: "https://www.webjothishanalyst.site/privacy-policy",
    type: "website",
  },
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
