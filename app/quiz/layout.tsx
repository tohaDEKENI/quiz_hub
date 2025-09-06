'use client';
import Navigation from "@/components/dashboard/navigation";
import { useState } from "react";
import Navbar from "@/components/home/NavBar";
import SideBar from "@/components/home/SideBar";
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [isOpen, setIsopen] = useState<boolean>(false);

    return (
        <div className="flex h-screen overflow-hidden">
            <SideBar />
            <div className="flex-1 flex flex-col min-w-0">
                <Navbar />
                <main className="flex-1 overflow-auto">
                    {children}
                </main>
            </div>
        </div >
    );
}