import { useEffect } from "react";
import axios from "axios";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import { API_URL } from "../../config";
import { useContentStore } from "../../store/context";

const Questions = () => {
  const { questions, aswers, setQuestions, setAswers } = useContentStore();

  const get_questions = async () => {
    try {
      const response = await axios.get(API_URL + "/questions");
      return response;
    } catch (error) {
      console.error(error);
    }
    return null;
  };
  useEffect(() => {
    const response = get_questions();
    if (response) console.log(response);
    return () => {
      setQuestions([]);
      setAswers([]);
    };
  }, []);
  return (
    <div className="mt-4 mb-4 pb-0.5 bg-neutral-900 rounded-2xl">
      <h1 className="font-bold text-xl text-center px-4 py-2">
        Perguntas de Alinhamento
      </h1>
      <div className="bg-neutral-950 mt-1 m-2 p-4 rounded-b-2xl">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          Perguntas
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Questions;
