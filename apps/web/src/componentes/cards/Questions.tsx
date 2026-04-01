import { useContentStore } from "../../store/context";

import type { Aswers, Question } from "../../interfaces/interfaces";

import { useQuestions } from "../../hooks/useQuestions";
import Loading from "../loading/Loading";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";

const Questions = () => {
  const [responses, setResponses] = useState<Record<number, string>>({});
  const [postsIsLoading, setPostsIsLoading] = useState(false);
  const { questions } = useContentStore();
  const { aswers } = useContentStore();
  const { ideology } = useContentStore();
  const { posts } = useContentStore();
  const { addPost } = useContentStore();

  const { isLoading } = useQuestions();

  const handleSelectAnswer = (questionId: number, aswerText: string) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionId]: aswerText,
    }));
  };

  const handleCreatePosts = () => {
    if (posts.length > 0) return;

    setPostsIsLoading(() => true);

    const answers_temp = questions
      .filter((q: Question) => responses[q.id] !== undefined)
      .map((q: Question) => ({
        question: q.text,
        answer: responses[q.id] ?? "",
      }));

    const fetchPosts = async () => {
      try {
        const response = await axios.post(API_URL + "/create-posts", {
          ideology: ideology,
          answers: answers_temp,
        });
        const posts = response.data.posts;
        posts.forEach((post: { text: string; tags: string[] }) => {
          addPost({
            text: post.text,
            tags: post.tags,
          });
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
    setPostsIsLoading(() => false);
  };

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
                <p
                  className={`font-bold text-xl ${question.id === 1 ? "" : "mt-6"}`}
                >
                  {question.text}
                </p>
                <ul>
                  {aswers
                    .filter((aswer: Aswers) => aswer.questionId === question.id)
                    .map((aswer: Aswers) => (
                      <li
                        key={aswer.id}
                        className="py-1 accent-amber-600 hover:text-amber-100"
                      >
                        <label htmlFor={question.id.toString() + aswer.id}>
                          <input
                            type="radio"
                            name={question.id.toString()}
                            id={question.id.toString() + aswer.id}
                            value={aswer.id}
                            onChange={() =>
                              handleSelectAnswer(
                                question.id,
                                aswer.text.toString(),
                              )
                            }
                            className="mr-2"
                          />
                          {aswer.text}
                        </label>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
            <div className="flex justify-center mt-6 mb-6">
              <button
                onClick={handleCreatePosts}
                className="ml-4 rounded-2xl bg-amber-700 p-2 px-4 font-bold text-white hover:bg-amber-600 active:bg-amber-700 hover:cursor-pointer disabled:bg-neutral-600 disabled:text-neutral-400 disabled:cursor-default"
              >
                Criar posts
              </button>
            </div>
          </div>
        </div>
      )}
      {postsIsLoading && <Loading />}
    </>
  );
};

export default Questions;
