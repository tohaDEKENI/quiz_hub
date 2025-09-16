
import ResolveQUiz from "@/components/home/ResolveQuiz";
import QuizTitle from "@/components/home/quizDetails/Title";
import AutherQuiz from "@/components/home/quizDetails/AutherQuiz";

const Page = async (context: { params: Promise<{ id: string }> }) => {
    const { id } = await context.params;
    return (
        <div className="text-sm text-gray-700 flex flex-col p-6">
            <div className="flex flex-col md:flex-col m-auto gap-4 lg:flex-row w-full ">
                <ResolveQUiz id={id} />
                <div className=" lg:w-[1000px]">
                    <AutherQuiz />
                </div>
            </div>
        </div>
    );
};

export default Page;

