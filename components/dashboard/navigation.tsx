'use client'

import { FilePlus, List, Users, BarChart3 } from "lucide-react";
import Link from 'next/link'

type Props = {
  isOpen: boolean
}

const Navigation = ({ isOpen }: Props) => {
  const nav = [
    { icon: <FilePlus size={22} />, name: "Créer un Quiz", href: "/dashboard/quiz/create" },
    { icon: <List size={22} />, name: "Mes Quiz", href: "/dashboard/quiz/my_quiz" },
    { icon: <Users size={22} />, name: "Utilisateurs", href: "/dashboard/users" },
    { icon: <BarChart3 size={22} />, name: "Statistiques", href: "/dashboard/stats" },
  ];

  return (
    <ul
      className={`hidden md:flex flex-col shadow-md rounded-xl h-full pt-8 px-2 transition-all duration-300
        overflow-hidden space-y-3  ${isOpen ? 'w-64' : 'w-20'}`}
    >
      {nav.map((n, k) => (
        <li key={k}>
          <Link
            href={n.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg 
              hover:bg-gray-100 transition-colors duration-200 font-medium text-gray-700`}
          >
            {n.icon}
            {isOpen && <span>{n.name}</span>}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default Navigation
