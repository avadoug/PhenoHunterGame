import type { Metadata } from "next";
import "./globals.css";

const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "https://phenohunter-game.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(productionHost),
  title: "Phenohunter: The Lost Keeper",
  description: "A bio-electric plant genetics strategy game about uncertain inheritance, scarce grow slots, and the phenotype you almost culled.",
  applicationName: "Phenohunter: The Lost Keeper",
  keywords: ["strategy game", "genetics simulation", "plant breeding", "browser game", "roguelike"],
  openGraph: {
    title: "Phenohunter: The Lost Keeper",
    description: "Every seed carries a possibility. Find the plant you almost culled.",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Phenohunter: The Lost Keeper bio-electric breeder lab" }],
  },
  twitter: { card:"summary_large_image", title:"Phenohunter: The Lost Keeper", description:"A living phenotype hunt where every grow slot matters.", images:["/og.png"] },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
