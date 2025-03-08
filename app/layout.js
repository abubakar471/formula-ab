import { Geist, Geist_Mono, Poppins, Baloo_Bhaijaan_2 } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const Baloo_Bhaijaan = Baloo_Bhaijaan_2({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"]
})

export const metadata = {
  title: "FormulaX",
  description: "Equation Solver",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${Baloo_Bhaijaan.className}`}
      >
        {children}
      </body>
    </html>
  );
}
