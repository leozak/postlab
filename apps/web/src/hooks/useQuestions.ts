import axios from "axios";

import { API_URL } from "../config";
import { useContentStore } from "../store/context";

import type { Aswers, Question } from "../interfaces/interfaces";
import { useEffect, useState } from "react";

type Questions = {
  id: number;
  question: string;
  aswers: Aswers[];
};

async function get_questions() {
  const response = await axios.post(API_URL + "/questions");
  return response.data;
}

export function useQuestions() {
  const [isLoading, setIsLoading] = useState(false);

  const { questions } = useContentStore();
  const { setAswers } = useContentStore();
  const { setQuestions } = useContentStore();

  useEffect(() => {
    if (questions.length > 0) return;

    const fetchQuestions = async () => {
      setIsLoading(true);

      try {
        const response = await get_questions();
        const fetchedQuestions = response.questions;

        let questions_temp: Question[] = [];
        let aswers_temp: Aswers[] = [];

        fetchedQuestions.map((item: Questions) => {
          questions_temp.push({ id: item.id, text: item.question });
          item.aswers.map((aswer: Aswers) => {
            aswers_temp.push({
              questionId: item.id,
              id: aswer.id,
              text: aswer.text,
            });
          });
        });
        setQuestions(questions_temp);
        setAswers(aswers_temp);
      } catch {
        console.error("Error ao buscar as questões.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, [questions.length, setAswers, setQuestions]);

  return { isLoading };
}
