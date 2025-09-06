'use client';

import Navbar from "@/components/home/HomeNavbar";
import QuizList from "@/components/home/GetQuizs";

export default function Home() {


  return (
    <div className="text-sm text-gray-700">
      <Navbar >
        <QuizList />
      </Navbar>

    </div>
  );
}
