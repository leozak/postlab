import { useContentStore } from "../../store/context";

import type { Aswers, Question } from "../../interfaces/interfaces";

import { useQuestions } from "../../hooks/useQuestions";
import Loading from "../loading/Loading";

const Questions = () => {
  const { questions } = useContentStore();
  const { aswers } = useContentStore();

  const { isLoading } = useQuestions();

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="mt-4 mb-4 pb-0.5 bg-neutral-900 rounded-2xl">
          <h1 className="font-bold text-xl text-center px-4 py-2">
            Perguntas de Alinhamento
          </h1>
          <div className="bg-neutral-950 mt-1 m-2 p-4 rounded-b-2xl">
            {questions.map((question: Question) => (
              <div key={question.id}>
                <p className="font-bold">{question.text}</p>
                <ul>
                  {aswers
                    .filter((aswer: Aswers) => aswer.questionId === question.id)
                    .map((aswer: Aswers) => (
                      <li key={aswer.id}>
                        <p>{aswer.text}</p>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Questions;
