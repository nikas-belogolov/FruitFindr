
import type { Metadata } from "next";
import "./globals.css";

import 'bootstrap/dist/css/bootstrap.css'
import SideNav from "./components/SideNav";

export const metadata: Metadata = {
  title: "FruitFindr",
  description: "Mapping the public harvest!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  

  return (
    <html lang="en">
      <body className="">
        <SideNav />
        <main>
          {children}
        </main>
        <script async src="https://kit.fontawesome.com/bd59fdb8d5.js" crossOrigin="anonymous"></script>
      </body>
    </html>
  );
}
