import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Responsible Disclosure Policy | Jothish Gandham",
  description: "Vulnerability reporting guidelines, safe harbor terms, and security disclosure policy for Jothish Gandham's systems.",
  alternates: {
    canonical: "https://www.webjothishanalyst.site/responsible-disclosure",
  },
  openGraph: {
    title: "Responsible Disclosure Policy | Jothish Gandham",
    description: "Vulnerability reporting guidelines and safe harbor terms for Jothish Gandham's systems.",
    url: "https://www.webjothishanalyst.site/responsible-disclosure",
    type: "website",
  },
};

export default function ResponsibleDisclosureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
