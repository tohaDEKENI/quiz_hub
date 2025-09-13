'use client'

import { useState } from 'react';
import Link from 'next/link';
import { Menu, Home, PlayCircle, Download, User } from 'lucide-react';
import { Trophy, BookOpen, Star, PlusCircle } from "lucide-react";

const SideBar = () => {
    const [sidebarExpanded, setSidebarExpanded] = useState(false);

    const menuItems = [
        { icon: <Home size={22} />, label: "Accueil", href: "/quiz" },
        { icon: <BookOpen size={22} />, label: "Explorer Quiz", href: "/quiz/explore-quizzes" },
        { icon: <Trophy size={22} />, label: "Classements", href: "/#" },
        { icon: <Star size={22} />, label: "Mes favoris", href: "/#" },
        //{ icon: <PlusCircle size={22} />, label: "Créer un Quiz", href: "/dashboard/quiz/create" }, // ✅ NOUVEAU
        { icon: <User size={22} />, label: "Mon Profil", href: "/#" },
    ];

    return (
        <div
            className={`bg-base-200 hidden  shadow-md h-full md:flex flex-col transition-all duration-300
        ${sidebarExpanded ? 'w-48' : 'w-20'}`}
        >
            <div className="flex items-center px-4 py-4">
                <button
                    className="btn btn-ghost p-2 rounded-full"
                    onClick={() => setSidebarExpanded(!sidebarExpanded)}
                >
                    <Menu size={24} />
                </button>
                {sidebarExpanded && (
                    <span className="ml-3 text-lg font-semibold  text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-600">QuizHub</span>
                )}
            </div>
            {/* Menu */}
            <nav className="mt-4 flex flex-col gap-2">
                {menuItems.map((item, index) => (
                    <Link
                        key={index}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-2 rounded-md hover:bg-base-300 transition-colors
              ${!sidebarExpanded ? 'justify-center' : ''}`}
                    >
                        {item.icon}
                        {sidebarExpanded && <span>{item.label}</span>}
                    </Link>
                ))}
            </nav>
        </div>
    );
};

export default SideBar;
