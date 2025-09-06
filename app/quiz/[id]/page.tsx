
import ResolveQUiz from "@/components/home/ResolveQuiz";
import QuizTitle from "@/components/home/quizDetails/Title";

const Page = async (context: { params: Promise<{ id: string }> }) => {
    const { id } = await context.params;
    return (
        <div className="text-sm text-gray-700 flex flex-col p-6">
            <div className="flex flex-col md:flex-col m-auto gap-4 lg:flex-row w-full ">
                <ResolveQUiz id={id} />
                <div className=" bg-amber-400 w-full h-96 my-6 lg:w-[800px] md:h-96 skeleton ">

                </div>
            </div>
        </div>
    );
};

export default Page;

