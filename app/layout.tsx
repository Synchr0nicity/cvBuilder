import type { Metadata } from "next";
import "./globals.css";
import { Provider } from "@/components/ui/provider";
import NavBar from "@/components/layout/NavBar";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "CV Builder",
  description: "Create and manage resumes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
        />
      </head>
      <body suppressHydrationWarning>
        <Provider>
          <NavBar />

          <main style={{ paddingTop: "61px" }}>{children}</main>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
