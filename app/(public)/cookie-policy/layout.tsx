import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | Jothish Gandham",
  description: "Cookie and tracking technologies disclosure for Jothish Gandham's cybersecurity portfolio.",
  alternates: {
    canonical: "https://www.webjothishanalyst.site/cookie-policy",
  },
  openGraph: {
    title: "Cookie Policy | Jothish Gandham",
    description: "Cookie and tracking technologies disclosure for Jothish Gandham's cybersecurity portfolio.",
    url: "https://www.webjothishanalyst.site/cookie-policy",
    type: "website",
  },
};

export default function CookiePolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
