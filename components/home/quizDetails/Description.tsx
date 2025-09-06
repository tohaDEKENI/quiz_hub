import { Quiz } from "@/lib/type";
import { FileText } from 'lucide-react'
type Props = {
    quiz?: Quiz
}
const Description = ({ quiz }: Props) => {
    return (
        <details className="collapse collapse-arrow border border-base-300 bg-base-300 rounded-box ">
            <summary className="collapse-title text-md font-medium cursor-pointer inline">
                <p className="inline-flex items-center ">Description <FileText size={15}/> </p>
            </summary>
            <div className="collapse-content">
                <p>{quiz?.description}</p>
            </div>
        </details>
    );
}

export default Description;