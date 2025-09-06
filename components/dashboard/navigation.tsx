'use client'

import { PackagePlus,FilePlus } from 'lucide-react'
import Link from 'next/link'

type Props = {
  isOpen: boolean
}

const Navigation = ({ isOpen }: Props) => {
  const nav = [
    { icon: <FilePlus />, name: 'Creee un quiz', href: '/dashboard/quiz/create' },
    { icon: <FilePlus />, name: 'Creee un quiz', href: '/dashboard/quiz/create' }
  ]

  return (
    <ul
      className={`hidden md:block menu bg-base-200 rounded-box h-full pt-10 transition-all duration-200 
        overflow-hidden space-y-4 ${
        isOpen ? 'w-72' : 'w-20'
      }`}
    >
      {nav.map((n, k) => (
        <li key={k}>
          <Link href={n.href} className={`flex items-center gap-2 btn font-bold text-xl `}>
            {n.icon}
            {isOpen && <span>{n.name}</span>}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default Navigation
