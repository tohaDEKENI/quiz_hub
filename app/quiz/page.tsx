'use client';
import { useState } from "react";
import Navbar from "@/components/home/HomeNavbar";
import QuizList from "@/components/home/GetQuizs";
import { Quiz } from "@/lib/type";
export default function Home() {
const [quizs, setQuizs] = useState<Quiz[]>([])

  return (
    <div className="text-sm text-gray-700 flex flex-col p-6">
      <div className="w-full bg-red-300 h-20">

      </div>
      <div className="flex md:flex-col-reverse m-auto gap-4 lg:flex-row w-full">
        <QuizList quizs={quizs} setQuizs={setQuizs}/>
        <div className=" bg-amber-400 hidden md:block my-6 lg:w-96 md:h-96 skeleton ">
    
        </div>
      </div>
    </div>
  );
}
