const fs = require('fs');
const path = require('path');

const routes = [
  { name: 'home', title: 'Home | Jothish Gandham', desc: 'Welcome to the portfolio of Jothish Gandham, a passionate Cybersecurity professional and Developer.' },
  { name: 'about', title: 'About | Jothish Gandham', desc: 'Learn about my background, objectives, and my journey in tech and cybersecurity.' },
  { name: 'projects', title: 'Projects | Jothish Gandham', desc: 'Explore my latest projects, case files, and technical implementations.' },
  { name: 'skills', title: 'Skills | Jothish Gandham', desc: 'Check out my technical arsenal including programming languages, tools, and platforms.' },
  { name: 'Terminal', title: 'Terminal | Jothish Gandham', desc: 'Dive into a terminal-like interface to explore my portfolio in a unique way.' },
  { name: 'contact', title: 'Contact | Jothish Gandham', desc: 'Get in touch for collaborations, opportunities, or just to say hi.' },
];

const template = (route) => `import PortfolioSPA from "@/components/layout/PortfolioSPA";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "${route.title}",
  description: "${route.desc}",
  alternates: {
    canonical: "/${route.name}",
  },
  openGraph: {
    title: "${route.title}",
    description: "${route.desc}",
    url: "https://jothish.com/${route.name}",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "${route.title}",
    description: "${route.desc}",
  }
};

export default function ${route.name.charAt(0).toUpperCase() + route.name.slice(1)}Page() {
  return <PortfolioSPA />;
}
`;

const basePath = path.join(__dirname, '..', 'app', '(public)');

routes.forEach(route => {
  const routePath = path.join(basePath, route.name);
  if (!fs.existsSync(routePath)) {
    fs.mkdirSync(routePath, { recursive: true });
  }
  fs.writeFileSync(path.join(routePath, 'page.tsx'), template(route));
  console.log(`Generated route: /${route.name}`);
});
