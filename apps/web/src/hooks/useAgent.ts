import axios from "axios";

import { API_URL } from "../config";
import { useContentStore } from "../store/context";

import type { Aswers, Question } from "../interfaces/interfaces";
import { useState } from "react";

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
  const { setAswers } = useContentStore();
  const { setQuestions } = useContentStore();

  let isLoading = true;

  let questions_temp: Question[] = [];
  let aswers_temp: Aswers[] = [];

  get_questions().then((response) => {
    const questions = response.data.questions;
    questions.map((item: Questions) => {
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
    isLoading = false;
  });

  return {
    isLoading: isLoading,
  };
}
