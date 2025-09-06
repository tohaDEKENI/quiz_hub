export type Multiple = {
  proposition: string;
  isChecked: boolean;
};

export type QuizInput =
  | {
      title: string;
      choice: string[];
      trueResponse: string;
      type: "unique";
    }
  | {
      title: string;
      choice: Multiple[];
      type: "multiple";
    };


type ChoiceMultiple = {
  proposition: string;
  isChecked: boolean;
};

type Question = {
  title: string;
  choice: string[] | ChoiceMultiple[];
  trueResponse?: string; // Présent pour type "unique"
  type: 'unique' | 'multiple';
};

export type Quiz = {
  id: string;
  title: string;
  description: string;
  data: Question[];
  visibility: 'public' | 'private'; // selon ce que tu utilises
  createAt: string; // ou Date si tu convertis
  updatedAt: string; // ou Date
  vues: number;
  user_id: string;
};

export type Comment  = {
  id: number;
  content: string;
  user_id: string;
  quiz_id: string;
  user_name: string;
  user_image: string;
  likes: number;
  createdAt: string; 
  updatedAt: string; 
}