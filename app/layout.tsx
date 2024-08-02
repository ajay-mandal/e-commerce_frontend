"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import {Toaster} from '@/components/ui/sonner';
import Navbar from "@/components/Navbar";
import { RecoilRoot } from "recoil";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <RecoilRoot>
            <Navbar />
            <Toaster />
            {children}
        </RecoilRoot>
        </body>
    </html>
  );
}
