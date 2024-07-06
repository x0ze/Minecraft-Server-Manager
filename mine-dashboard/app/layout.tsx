import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mine-Server",
  description: "Minecraft server managment dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AdminPanelLayout>{children}</AdminPanelLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
