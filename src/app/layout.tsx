import { AuthProvider } from "@/contexts/auth-context";
import { CarSearchProvider } from "@/contexts/car-search-context/car-search-context";
import { NonceProvider } from "@/contexts/nonce-context/nonce-context";
import { PanelProvider } from "@/contexts/panel-context/panel-context";
import { QuestionnaireProvider } from "@/contexts/questionnaire-context";
import { SignalRProvider } from "@/contexts/signalR-context";
import { UserFavoritesProvider } from "@/contexts/user-favorites-context/user-favorites-context";
import ReactQueryProvider from "@/providers/react-query-provider";
import { ThemeProvider } from "@/theme/themeContext";
import { ErrorBoundary } from "@sentry/nextjs";
import { Metadata } from "next";
import { DM_Sans, Inter, Roboto } from "next/font/google";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { ErrorMessage } from "./components";
import "./globals.css";
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

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const nonce = cookieStore.get("nonce")?.value ?? "";

  return (
    <html lang="en">
      <Suspense>
        <ErrorBoundary
          fallback={<ErrorMessage message="An unexpected error occurred" />}>
          <NonceProvider nonce={nonce}>
            <CarSearchProvider>
              <ThemeProvider>
                <ReactQueryProvider>
                  <AuthProvider>
                    <UserFavoritesProvider>
                      <QuestionnaireProvider>
                        <PanelProvider>
                          <SignalRProvider>
                            <body
                              className={`${dmSans.className} ${roboto.className} ${inter.className}`}>
                              {children}
                            </body>
                          </SignalRProvider>
                        </PanelProvider>
                      </QuestionnaireProvider>
                    </UserFavoritesProvider>
                  </AuthProvider>
                </ReactQueryProvider>
              </ThemeProvider>
            </CarSearchProvider>
          </NonceProvider>
        </ErrorBoundary>
      </Suspense>
    </html>
  );
}
