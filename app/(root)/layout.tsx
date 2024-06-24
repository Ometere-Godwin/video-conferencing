import StreamVideoProvider from "@/providers/StreamClientProvider";
import { Metadata } from "next";
import React, { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "TereSphere",
  description: "TereSphere Video Conferencing",
  icons: {
    icon: "/icons/logo.svg",
  },
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <main>
      <StreamVideoProvider>{children}</StreamVideoProvider>
    </main>
  );
}
