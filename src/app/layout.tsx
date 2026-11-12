import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Happy Birthday! 🎉",
  description: "A magical interactive birthday celebration experience",
  icons: {
    icon: "/assets/images/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full overflow-x-hidden">
      <body className="min-h-full overflow-x-hidden bg-black font-sans text-white antialiased select-none">
        {children}
      </body>
    </html>
  );
}
