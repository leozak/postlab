import InputURL from "./componentes/inputURL/InputURL";
import Header from "./componentes/header/Header";
import TextSummarized from "./componentes/cards/TextSummarized";

import { useContentStore } from "./store/context";
import Questions from "./componentes/cards/Questions";
import IdeologicalThermometer from "./componentes/cards/IdeologicalThermometer";
import Posts from "./componentes/cards/Posts";

function App() {
  const { title, text, posts } = useContentStore();
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-200 p-6 pt-8">
        <Header />

        <InputURL />

        {title !== "" && <TextSummarized />}
        {text !== "" && <IdeologicalThermometer />}
        {text !== "" && <Questions />}
        {posts.length > 0 && <Posts />}
      </div>
    </div>
  );
}

export default App;
