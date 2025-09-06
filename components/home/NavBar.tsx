'use client'
import {
    Menu,
    Search,
    UserCircle,
    Home,
    PlayCircle,
    Download,
    User,
} from 'lucide-react';
import { useState } from 'react';
import Sm_Navbar from './Sm_sidebar';

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


const Navbar = () => {
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
        <div className="navbar bg-base-100 shadow-md px-1 flex justify-between items-center w-full z-40">
            <div className="flex items-center gap-4 logo">
                <Sm_Navbar />
                <div className="logo-icon">Q</div>
                <span className="text-xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-600">
                    QuizHub
                </span>

            </div>

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

            <div className="flex items-center gap-4 p-0 m-0">
                <button className="btn btn-ghost btn-circle p-0 m-0">
                    <UserCircle size={28} />
                </button>
            </div>
        </div>
    );
}

export default Navbar;