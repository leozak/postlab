import { create } from "zustand";

/*
  # State
    title => string
    text => string
    ideology => string

  # Actions
    setTitle(title: string) => void;
    setText(text: string) => void;
    setIdeology(ideology: string) => void;
    setContent(title: string, text: string) => void;
    reset()

  # Selectors
    selectTitle => title
    selectText => text
    selectIdeology => ideology
    selectContent => { title: state.title, text: state.text, ideology: state.ideology }

  */

interface Question {
  id: number;
  text: string;
}

interface Aswers {
  questionId: number;
  id: string;
  text: string[];
}

interface Response {
  response: string;
}

interface Post {
  text: string;
  tags: string[];
}

// Definindo a interface do estado
interface ContentState {
  title: string;
  text: string;
  ideology: string;
  questions: Question[];
  aswers: Aswers[];
  responses: Response[];
  posts: Post[];
  // Actions
  setTitle: (title: string) => void;
  setText: (text: string) => void;
  setIdeology: (position: string) => void;
  setContent: (title: string, text: string, ideology?: string) => void;
  setQuestions: (questions: Question[]) => void;
  setAswers: (questions: Aswers[]) => void;
  setResponses: (responses: Response[]) => void;
  addResponse: (response: Response) => void;
  addPost: (post: Post) => void;
  reset: () => void;
}

// Criando a store com tipagem
export const useContentStore = create<ContentState>((set) => ({
  // Estado inicial
  title: "",
  text: "",
  ideology: "Centro",
  questions: [],
  aswers: [],
  responses: [],
  posts: [],

  // Actions
  setTitle: (title) => set({ title }),

  setText: (text) => set({ text }),

  setIdeology: (ideology) => set({ ideology }),

  setContent: (title, text, ideology) => set({ title, text, ideology }),

  setQuestions: (questions) => set({ questions }),

  setAswers: (aswers) => set({ aswers }),

  setResponses: (responses) => set({ responses }),

  addResponse: (response) =>
    set((state) => ({ responses: [...state.responses, response] })),

  addPost: (post) => set((state) => ({ posts: [...state.posts, post] })),

  reset: () =>
    set({
      title: "",
      text: "",
      ideology: "Centro",
      questions: [],
      aswers: [],
      responses: [],
      posts: [],
    }),
}));

// store/selectors.ts
export const selectTitle = (state: ContentState) => state.title;
export const selectText = (state: ContentState) => state.text;
export const selectIdeology = (state: ContentState) => state.ideology;
export const selectContent = (state: ContentState) => ({
  title: state.title,
  text: state.text,
  ideology: state.ideology,
});
export const selectQuestions = (state: ContentState) => state.questions;
export const selectAswers = (state: ContentState) => state.aswers;
export const selectResponses = (state: ContentState) => state.responses;
export const selectPosts = (state: ContentState) => state.posts;
