import { AuthProvider } from "@/contexts/auth-context";
import { CarSearchProvider } from "@/contexts/car-search-context/car-search-context";
import { UserFavoritesProvider } from "@/contexts/user-favorites-context/user-favorites-context";
import ReactQueryProvider from "@/providers/react-query-provider";
import { ThemeProvider } from "@/theme/themeContext";
import { Metadata } from "next";
import { DM_Sans, Inter, Roboto } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Footer from "./components/footer/footer";
import { QuestionnaireProvider } from "@/contexts/questionnaire-context";
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-roboto",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
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
      <Suspense>
        <CarSearchProvider>
          <ThemeProvider>
            <ReactQueryProvider>
              <AuthProvider>
                <UserFavoritesProvider>
                  <QuestionnaireProvider>
                    <body
                      className={`${dmSans.className} ${roboto.className} ${inter.className}`}>
                      {children}
                      <Footer />
                    </body>
                  </QuestionnaireProvider>
                </UserFavoritesProvider>
              </AuthProvider>
            </ReactQueryProvider>
          </ThemeProvider>
        </CarSearchProvider>
      </Suspense>
    </html>
  );
}
