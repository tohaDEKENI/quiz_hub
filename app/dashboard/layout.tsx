'use client';

import Navbar from "@/components/dashboard/navbar";
import Navigation from "@/components/dashboard/navigation";
import { useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsopen] = useState<boolean>(true);

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden">

      <div className="h-16 w-full fixed top-0 left-0 bg-white shadow z-50">
        <Navbar isOpen={isOpen} setIsopen={setIsopen} />
      </div>

      <div className="flex flex-1 pt-16 overflow-hidden h-full">

        <div className="shrink-0 border-r border-gray-200 overflow-y-auto">
          <Navigation isOpen={isOpen} />
        </div>

        <div className="flex-1 overflow-y-auto bg-gray- p-4 h-full">
          {children}
        </div>
      </div>
    </div >
  );
}
