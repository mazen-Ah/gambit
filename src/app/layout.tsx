import type { Metadata } from "next";
import localFont from "next/font/local";
import "../styles/tailwind.css";
import "../styles/app.scss";
import Navbar from "../layout/navbar";
import IsMobileProvider from "../contexts/isMobileContext";
import GeneralSwiperDataProvider from "./contexts/GeneralSwiperDataContext";
import Footer from "../layout/footer";
import LoadingContextProvider from "../contexts/LoadingContext";

export const metadata: Metadata = {
  title: "Gambit",
  description: "Gambit",
};

const fellix = localFont({
  src: [
    {
      path: "../../public/fonts/Fellix-Regular.woff2",
      weight: "400",
    },
    {
      path: "../../public/fonts/Fellix-Medium.woff2",
      weight: "500",
    },
    {
      path: "../../public/fonts/Fellix-SemiBold.woff2",
      weight: "600",
    },
  ],
  variable: "--font-fellix",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fellix.variable}`}>
        <IsMobileProvider>
          <LoadingContextProvider>
            <Navbar />
            <GeneralSwiperDataProvider>{children}</GeneralSwiperDataProvider>
          </LoadingContextProvider>
        </IsMobileProvider>
      </body>
    </html>
  );
}
