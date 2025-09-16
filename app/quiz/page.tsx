'use client';
import { useState } from "react";
import Navbar from "@/components/home/HomeNavbar";
import QuizList from "@/components/home/GetQuizs";
import { Quiz } from "@/lib/type";
import QuizFilter from "@/components/home/Category";

export default function Home() {
const [quizs, setQuizs] = useState<Quiz[]>([])

  return (
    <div className="text-sm text-gray-700 flex flex-col p-6">
        <QuizFilter setQuizs={setQuizs}/>
      
      <div className="flex md:flex-col-reverse m-auto gap-4 lg:flex-row w-full">
        <QuizList quizs={quizs} setQuizs={setQuizs}/>
      </div>
    </div>
  );
}
