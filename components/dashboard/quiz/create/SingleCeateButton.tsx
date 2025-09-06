import { QuizInput } from "@/lib/type";
import { SetStateAction } from "react";
import {CircleDot} from 'lucide-react'

type Props ={
    quizInputs:QuizInput[],
    setQuizinputs:React.Dispatch<SetStateAction<QuizInput[]>>
}
const SingleCeateButton = ({quizInputs,setQuizinputs}:Props) => {
    return ( 
        <div>
            <button
                className="btn bg-blue-500 text-white rounded-md"
                onClick={()=>{
                    setQuizinputs((prev)=>[...prev,{title:'',choice:['',''],trueResponse:'',type:'unique'}])
                }}
            >  <CircleDot/> Choix unique
            </button>
        </div>
     );
}
 
export default SingleCeateButton;
