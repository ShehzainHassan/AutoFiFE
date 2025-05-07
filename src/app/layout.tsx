import { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { VehicleProvider } from "@/contexts/vehicleContext";
import { VehicleByMakeProvider } from "@/contexts/vehicleByMakeContext";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BoxCars",
  description: "Find cars for sale and for rent near you",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <VehicleProvider>
        <VehicleByMakeProvider>
          <body className={dmSans.className}>{children}</body>
        </VehicleByMakeProvider>
      </VehicleProvider>
    </html>
  );
}
