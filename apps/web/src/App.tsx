import InputURL from "./componentes/inputURL/InputURL";
import Header from "./componentes/header/Header";
import TextSummarized from "./componentes/cards/TextSummarized";

import { useContentStore } from "./store/context";
import Questions from "./componentes/cards/Questions";
import IdeologicalThermometer from "./componentes/cards/IdeologicalThermometer";
import { useState } from "react";

function App() {
  const { title, text } = useContentStore();
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-200 p-6 pt-8">
        <Header />

        <InputURL />

        {title !== "" && <TextSummarized />}
        {text !== "" && <IdeologicalThermometer />}
        {text !== "" && <Questions />}
      </div>
    </div>
  );
}

export default App;
