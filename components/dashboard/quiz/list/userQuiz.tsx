'use client';

import { Quiz } from "@/lib/type";
import { SetStateAction, useEffect, useState } from "react";

type Props = {
  userQuiz: Quiz[];
  setUserquiz: React.Dispatch<SetStateAction<Quiz[]>>;
};

const UserQuizComponent = ({ userQuiz, setUserquiz }: Props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch("/api/quizs/userQuiz");
        const data = await res.json();
        setUserquiz(data.data);
      } catch (error) {
        console.error("Erreur lors du chargement des quiz:", error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [setUserquiz]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (userQuiz.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="mb-4">
          <svg 
            className="w-16 h-16 mx-auto text-gray-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-600 mb-2">Aucun quiz trouvé</h3>
        <p className="text-gray-400">Créez votre premier quiz pour commencer</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Mes Quiz</h1>
        <p className="text-gray-500">Gérez et organisez vos quiz personnalisés</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {userQuiz.map((quiz) => (
          <div 
            key={quiz.id} 
            className="card bg-white shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-gray-200"
          >
            <div className="card-body p-6">
              {/* Header avec titre et visibilité */}
              <div className="flex justify-between items-start mb-4">
                <h2 className="card-title text-lg font-semibold text-gray-800 leading-tight">
                  {quiz.title}
                </h2>
                <div className="tooltip" data-tip={quiz.visibility === "public" ? "Visible par tous" : "Privé"}>
                  <div className={`badge badge-sm ${
                    quiz.visibility === "public" 
                      ? "badge-success badge-outline" 
                      : "badge-neutral badge-outline"
                  }`}>
                    {quiz.visibility === "public" ? (
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ) : (
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    )}
                    {quiz.visibility}
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                {quiz.description}
              </p>

              {/* Tags catégorie et difficulté */}
              <div className="flex gap-2 mb-4">
                <span className="badge badge-outline badge-sm text-xs">
                  {quiz.category}
                </span>
                <span className={`badge badge-sm text-xs ${
                  quiz.dificult === 'facile' ? 'badge-success' :
                  quiz.dificult === 'moyen' ? 'badge-warning' :
                  'badge-error'
                } badge-outline`}>
                  {quiz.dificult}
                </span>
              </div>

              {/* Stats */}
              <div className="flex justify-between items-center text-xs text-gray-500 mb-4 pt-2 border-t border-gray-100">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>{quiz.vues} vues</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{new Date(quiz.createAt).toLocaleDateString('fr-FR')}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 justify-end">
                <button className="btn btn-ghost btn-sm text-primary hover:bg-primary hover:text-white">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Modifier
                </button>
                <button className="btn btn-ghost btn-sm text-error hover:bg-error hover:text-white">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserQuizComponent;