'use client'

import Link from "next/link";
import { Home, PlayCircle, User, Download, Menu } from 'lucide-react';
import { Trophy, BookOpen, Star, PlusCircle } from "lucide-react";


const Sm_Navbar = () => {
  const menuItems = [
    { icon: <Home size={22} />, label: "Accueil", href: "/quiz" },
    { icon: <BookOpen size={22} />, label: "Explorer Quiz", href: "#" },
    { icon: <Trophy size={22} />, label: "Classements", href: "#" },
    { icon: <Star size={22} />, label: "Mes favoris", href: "#" },
    //{ icon: <PlusCircle size={22} />, label: "Créer un Quiz", href: "#" }, // ✅ NOUVEAU
    { icon: <User size={22} />, label: "Mon Profil", href: "#" },
  ];
  return (
    <div className="drawer md:hidden m-0">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      {/* Contenu principal */}
      <div className="drawer-content p-0 m-0">
        <label htmlFor="my-drawer" className="btn p-2  rounded-full">
          <Menu />
        </label>
      </div>

      {/* Sidebar (Drawer) */}
      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link href={item.href} className="flex items-center gap-2">
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sm_Navbar;
