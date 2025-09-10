'use client'

import Link from "next/link";
import { FilePlus, List, Users, BarChart3, Menu } from "lucide-react";

const Sm_AdminNavbar = () => {
  const nav = [
    { icon: <FilePlus size={22} />, name: "Créer un Quiz", href: "/dashboard/quiz/create" },
    { icon: <List size={22} />, name: "Mes Quiz", href: "/dashboard/quiz/my_quiz" },
    { icon: <Users size={22} />, name: "Utilisateurs", href: "/dashboard/users" },
    { icon: <BarChart3 size={22} />, name: "Statistiques", href: "/dashboard/stats" },
  ];

  return (
    <div className="drawer md:hidden">
      <input id="admin-drawer" type="checkbox" className="drawer-toggle" />

      {/* Bouton pour ouvrir le drawer */}
      <div className="drawer-content p-0">
        <label htmlFor="admin-drawer" className="btn p-2 rounded-full">
          <Menu />
        </label>
      </div>

      {/* Drawer (sidebar) */}
      <div className="drawer-side">
        <label htmlFor="admin-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-72 p-4 space-y-2">
          {nav.map((item, index) => (
            <li key={index}>
              <Link href={item.href} className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md transition">
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sm_AdminNavbar;
