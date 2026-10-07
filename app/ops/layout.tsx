import type { Metadata } from 'next';
import OpsLayoutClient from './OpsLayoutClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Operations Dashboard | Jothish Gandham',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'none',
      'max-snippet': -1,
    },
  },
};

export default function OpsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <OpsLayoutClient>{children}</OpsLayoutClient>;
}
