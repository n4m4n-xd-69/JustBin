import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { auth } from "@/auth";
import { logoutUser } from "@/app/actions/auth";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.AUTH_URL ?? "https://just-bin.vercel.app"),
  title: {
    default: "JustBin — Sell Scrap Without Leaving Home",
    template: "%s · JustBin",
  },
  description:
    "JustBin connects households with local scrap collectors for easy, instant scheduling of waste pickups — sell scrap online at transparent market rates and promote eco-friendly recycling.",
  keywords: [
    "scrap pickup",
    "sell scrap online",
    "kabadiwala",
    "recycling India",
    "waste management",
  ],
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/logo.png", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "JustBin — Sell Scrap Without Leaving Home",
    description:
      "Book a doorstep scrap pickup in 30 seconds. Transparent market rates, verified collectors, instant payment.",
    siteName: "JustBin",
    type: "website",
    images: [{ url: "/logo.png", width: 800, height: 800, alt: "JustBin Logo" }],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth().catch(() => null);

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${poppins.variable} dark h-full antialiased`}
      style={{ colorScheme: 'dark' }}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="justbin-theme"
          disableTransitionOnChange
        >
          <ScrollProgress />
          <Navbar user={session?.user ?? null} onSignOut={logoutUser} />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
