import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | Jothish Gandham",
  description: "Terms and conditions of use for Jothish Gandham's cybersecurity portfolio and interactive environments.",
  alternates: {
    canonical: "https://www.webjothishanalyst.site/terms-and-conditions",
  },
  openGraph: {
    title: "Terms and Conditions | Jothish Gandham",
    description: "Terms and conditions of use for Jothish Gandham's cybersecurity portfolio.",
    url: "https://www.webjothishanalyst.site/terms-and-conditions",
    type: "website",
  },
};

export default function TermsAndConditionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
