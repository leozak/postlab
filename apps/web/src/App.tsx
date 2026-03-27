import InputURL from "./componentes/inputURL/InputURL";
import Header from "./componentes/header/Header";
import TextSummarized from "./componentes/cards/TextSummarized";

import { useContentStore } from "./data/context";

function App() {
  const { title } = useContentStore();
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-200 p-6 pt-8">
        <Header />

        <InputURL />

        {title !== "" && <TextSummarized />}
      </div>
    </div>
  );
}

export default App;
