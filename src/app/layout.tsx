import type { Metadata } from "next";
import { Inter, Foldit, Archivo_Black } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { Navbar } from "@/components/Navbar";
import Providers from "@/components/Providers";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] });
const foldit = Foldit({
  subsets: ["latin"],
  weight: "800",
  variable: "--font-foldit",
});
const archivo_black = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-archivo-black",
});

export const metadata: Metadata = {
  title: "Attendance Tracker",
  description: "Track your attendance, synced with your timetable",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn(
            inter.className,
            foldit.variable,
            archivo_black.variable,
          )}
        >
          <Providers>
            <Navbar />
            <Toaster position="bottom-center" reverseOrder={false} />
            {children}
						<Analytics />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
