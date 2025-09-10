'use client'
import Title from "@/components/dashboard/title";
import { Quiz } from "@/lib/type";
import { useState } from "react";
import UserQuizComponnent from "@/components/dashboard/quiz/list/userQuiz";

const UserQuiz = () => {
    const [userQuiz,setUserquiz] = useState<Quiz[]>([])
    return ( 
        <div>
            <Title>Mes quizs</Title>
            <UserQuizComponnent userQuiz={userQuiz} setUserquiz={setUserquiz}/>
        </div>
     );
}
 
export default UserQuiz;