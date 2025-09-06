type Props = {
    title?: string;
    isLoading: boolean;
};

const QuizTitle = ({ title, isLoading }: Props) => {
    return (
        <div>
            {isLoading ? (
                // Skeleton loader
                <div className="h-8 w-1/2 bg-gray-300 animate-pulse rounded skeleton"></div>
            ) : (
                <h1 className="font-black text-2xl">{title}</h1>
            )}
        </div>
    );
};

export default QuizTitle;
