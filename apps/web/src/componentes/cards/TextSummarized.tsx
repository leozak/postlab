import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import { useContentStore } from "../../data/context";

const TextSummarized = () => {
  const { title } = useContentStore();
  const { text } = useContentStore();

  return (
    <div className="mt-10 mb-4 pb-0.5 bg-neutral-900 rounded-2xl">
      <h1 className="font-bold text-xl text-center px-4 py-2">{title}</h1>
      <div className="bg-neutral-950 m-2 p-4 rounded-b-2xl">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {text}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default TextSummarized;
