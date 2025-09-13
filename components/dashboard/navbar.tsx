import { SetStateAction } from "react";
import UserProfile from "../user/UserPropfile";
import Sm_AdminNavbar from "./Sm_navbar";
import ThemeSwap from "../home/theme-swap";
type Props = {
    isOpen: boolean
    setIsopen: React.Dispatch<SetStateAction<boolean>>
}

const Navbar = ({ isOpen, setIsopen }: Props) => {
    return (
        <div className="navbar bg-base-100 shadow-sm fixed">
            <div className="flex-none">
                <button className="hidden md:block btn btn-square btn-ghost"
                    onClick={() => setIsopen(!isOpen)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg>
                </button>
                <Sm_AdminNavbar />
            </div>
            <div className="flex-1">
                <div className="flex items-center gap-4 logo">
                    <div className="logo-icon p-2">Q</div>
                    <span className="text-lg md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-600">
                        QuizHub
                    </span>
                </div>
            </div>
            <div className="flex-none">
                <ThemeSwap />
                <UserProfile />
            </div>
        </div>
    );
}

export default Navbar;