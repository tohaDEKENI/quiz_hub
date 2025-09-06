'use client';

import Navbar from "@/components/dashboard/navbar";
import Navigation from "@/components/dashboard/navigation";
import { useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsopen] = useState<boolean>(false);

  return (
    <div className="h-screen flex items-center justify-center bg-base-200">
        {children}
    </div >
  );
}