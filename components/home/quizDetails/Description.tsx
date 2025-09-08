import { Quiz } from "@/lib/type";
import { FileText } from "lucide-react";

type Props = {
  quiz?: Quiz;
};

const Description = ({ quiz }: Props) => {
  // Couleurs selon la difficulté
  const difficulteColor: Record<string, string> = {
    Facile: "bg-green-500",
    Moyen: "bg-yellow-500",
    Difficile: "bg-red-600",
  };

  return (
    <details className="collapse collapse-arrow border border-base-300 bg-base-300 rounded-lg">
      <summary className="collapse-title text-md font-medium cursor-pointer flex items-center justify-between">
        <span className="inline-flex items-center gap-1">
          Description 
        </span>

        {quiz?.dificult && (
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-semibold text-white ${
              difficulteColor[quiz.dificult] || "bg-gray-400"
            }`}
          >
            {quiz.dificult}
          </span>
        )}
      </summary>

      <div className="collapse-content flex flex-col gap-2 mt-2">
        <p className="text-gray-700 text-sm font-medium flex items-center gap-1">
          <span className="text-blue-500 font-bold">{quiz?.vues}</span>{" "}
          vue{quiz && quiz.vues > 1 ? "s" : ""}
        </p>
        <p className="text-gray-600 text-sm">{quiz?.description}</p>
      </div>
    </details>
  );
};

export default Description;
