'use client'

import Link from "next/link";
import { Home, PlayCircle, User, Download ,Menu } from 'lucide-react';

const Sm_Navbar = () => {
  const menuItems = [
    { icon: <Home size={22} />, label: 'Accueil', href: '/quiz' },
    { icon: <PlayCircle size={22} />, label: 'Shorts', href: '/shorts' },
    { icon: <User size={22} />, label: 'Abonnements', href: '/subscriptions' },
    { icon: <Download size={22} />, label: 'Téléchargements', href: '/downloads' },
  ];

  return (
    <details className="dropdown block md:hidden l">
      <summary className="btn p-2 rounded-full"><Menu/></summary>

      <ul className="menu dropdown-content bg-base-100 rounded-box shadow w-52 mt-2 p-2 z-10 ">
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link href={item.href} className="flex items-center gap-2">
              {item.icon}
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
};

export default Sm_Navbar;
