import { SetStateAction } from "react";
import UserProfile from "../user/UserPropfile";

type Props = {
    isOpen:boolean
    setIsopen:React.Dispatch<SetStateAction<boolean>>
}

const Navbar = ({isOpen,setIsopen}:Props) => {
    return (
        <div className="navbar bg-base-100 shadow-sm fixed">
            <div className="flex-none">
                <button className="btn btn-square btn-ghost"
                    onClick={()=>setIsopen(!isOpen)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current"> 
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg>
                </button>
            </div>
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">QuizHub</a>
            </div>
            <div className="flex-none">
                <UserProfile />
            </div>
        </div>
    );
}

export default Navbar;