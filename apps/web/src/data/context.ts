import { create } from "zustand";

/*
  # State
    title => string
    text => string

  # Actions
    setTitle(title: string) => void;
    setText(text: string) => void;
    setContent(title: string, text: string) => void;
    reset()

  # Selectors
    selectTitle => title
    selectText => text
    selectContent => { title: state.title, text: state.text }

  */

// Definindo a interface do estado
interface ContentState {
  title: string;
  text: string;
  // Actions
  setTitle: (title: string) => void;
  setText: (text: string) => void;
  setContent: (title: string, text: string) => void;
  reset: () => void;
}

// Criando a store com tipagem
export const useContentStore = create<ContentState>((set) => ({
  // Estado inicial
  title: "",
  text: "",

  // Actions
  setTitle: (title) => set({ title }),

  setText: (text) => set({ text }),

  setContent: (title, text) => set({ title, text }),

  reset: () => set({ title: "", text: "" }),
}));

// store/selectors.ts
export const selectTitle = (state: ContentState) => state.title;
export const selectText = (state: ContentState) => state.text;
export const selectContent = (state: ContentState) => ({
  title: state.title,
  text: state.text,
});
