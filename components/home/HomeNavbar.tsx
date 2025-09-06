'use client';

import { useState, ReactNode } from 'react';
import {
    Menu,
    Search,
    UserCircle,
    Home,
    PlayCircle,
    Download,
    User,
} from 'lucide-react';

const dummyData = [
    {
        id: '1',
        title: 'Quiz JavaScript',
        description: 'Testez vos connaissances en JS',
    },
    {
        id: '2',
        title: 'Quiz HTML/CSS',
        description: 'Tout savoir sur le web design',
    },
    {
        id: '3',
        title: 'React débutant',
        description: 'Apprenez React en 10 questions',
    },
    {
        id: '4',
        title: 'Quiz sur Tailwind',
        description: 'Utiliser Tailwind efficacement',
    },
];

export default function Layout({ children }: { children: ReactNode }) {
    const [sidebarExpanded, setSidebarExpanded] = useState(false);
    const [search, setSearch] = useState('');
    const [filtered, setFiltered] = useState<typeof dummyData>([]);

    const handleSearch = (value: string) => {
        setSearch(value);
        const result = dummyData.filter((item) =>
            item.title.toLowerCase().includes(value.toLowerCase())
        );
        setFiltered(value.trim() === '' ? [] : result);
    };

    return (
        <div className="flex h-screen overflow-hidden">

            <div
                className={`bg-base-200 transition-all duration-300 shadow-md h-full flex flex-col ${sidebarExpanded ? 'w-48' : 'w-16'
                    }`}
            >
                <button
                    className="btn btn-ghost mt-4"
                    onClick={() => setSidebarExpanded(!sidebarExpanded)}
                >
                    <Menu size={24} />
                </button>

                <ul className="menu mt-4 space-y-2">
                    <li className="flex items-center gap-3 px-4 py-2 hover:bg-base-300 rounded-md">
                        <Home size={22} />
                        {sidebarExpanded && <span>Accueil</span>}
                    </li>
                    <li className="flex items-center gap-3 px-4 py-2 hover:bg-base-300 rounded-md">
                        <PlayCircle size={22} />
                        {sidebarExpanded && <span>Shorts</span>}
                    </li>
                    <li className="flex items-center gap-3 px-4 py-2 hover:bg-base-300 rounded-md">
                        <User size={22} />
                        {sidebarExpanded && <span>Abonnements</span>}
                    </li>
                    <li className="flex items-center gap-3 px-4 py-2 hover:bg-base-300 rounded-md">
                        <Download size={22} />
                        {sidebarExpanded && <span>Downloads</span>}
                    </li>
                </ul>
            </div>

            <div className="flex-1 flex flex-col min-w-0">

                {/* NAVBAR */}
                <div className="navbar bg-base-100 shadow-md px-4 flex justify-between items-center w-full">
                    <div className="flex items-center gap-4">
                        <span className="text-xl font-bold">MyTube</span>
                    </div>

                    {/* BARRE DE RECHERCHE */}
                    <div className="flex-1 max-w-xl mx-4 relative">
                        <label className="input input-bordered flex items-center gap-2 w-full">
                            <input
                                type="text"
                                className="grow"
                                placeholder="Rechercher"
                                value={search}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                            <Search size={18} />
                        </label>

                        {filtered.length > 0 && (
                            <div className="absolute top-full mt-2 w-full bg-base-100 border rounded-md shadow z-30 max-h-60 overflow-auto">
                                {filtered.map((item) => (
                                    <div
                                        key={item.id}
                                        className="p-3 border-b hover:bg-base-200 cursor-pointer"
                                    >
                                        <h3 className="font-semibold">{item.title}</h3>
                                        <p className="text-sm text-gray-500">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="btn btn-ghost btn-circle">
                            <UserCircle size={28} />
                        </button>
                    </div>
                </div>

               
            </div>
        </div>
    );
}
