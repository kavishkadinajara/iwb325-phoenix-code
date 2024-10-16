import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { ThemeProvider } from "@/components/provider";

export const metadata: Metadata = {
  title: "Eventure - Where Events Meet Innovation",
  description:
    "Eventure - Where Events Meet Innovation. Simplify event management and ticket purchasing with our secure platform. Enjoy seamless payment options, real-time ticket tracking, and a unique photo submission feature for attendees. Join us to create unforgettable event experiences!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
