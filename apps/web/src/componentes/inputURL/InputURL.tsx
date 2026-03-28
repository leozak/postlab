import { useEffect, useState } from "react";
import type { SubmitEvent } from "react";
import axios from "axios";

import { API_URL } from "../../config";
import Loading from "../loading/Loading";
import { useContentStore } from "../../store/context";

const url_test =
  "https://akitaonrails.com/2026/02/20/do-zero-a-pos-producao-em-1-semana-como-usar-ia-em-projetos-de-verdade-bastidores-do-the-m-akita-chronicles/";

const InputURL = () => {
  const [url, setUrl] = useState(url_test);
  const [isLoading, setIsLoading] = useState(false);

  const { title, setContent, reset } = useContentStore();

  const handleSubmit = async (e: SubmitEvent) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post(API_URL + "/summarize", { url });
      setContent(response.data.title, response.data.text);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const handleReset = () => {
    reset();
    setIsLoading(false);
  };

  useEffect(() => {
    if (title !== "") {
      setIsLoading(true);
    }
  }, [title]);

  return (
    <>
      <div className="flex flex-row justify-center items-center">
        <form
          onSubmit={handleSubmit}
          method="post"
          className="w-full flex flex-row justify-center"
        >
          <div className="border rounded-2xl p-2 px-4 bg-amber-900/10 w-2/3">
            <input
              id="url"
              name="url"
              type="url"
              value={url}
              placeholder="Informe a URL do texto"
              onChange={(e) => setUrl(e.target.value)}
              disabled={isLoading}
              className="w-full focus:outline-none focus:ring-0"
              required
              autoComplete="off"
              autoCorrect="off"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="ml-4 rounded-2xl bg-amber-700 p-2 px-4 font-bold text-white hover:bg-amber-600 active:bg-amber-700 hover:cursor-pointer disabled:bg-neutral-600 disabled:text-neutral-400 disabled:cursor-default"
          >
            Enviar
          </button>
          {title && (
            <button
              type="button"
              onClick={handleReset}
              className="ml-4 rounded-2xl bg-amber-700 p-2 px-4 font-bold text-white hover:bg-amber-600 active:bg-amber-700 hover:cursor-pointer disabled:bg-neutral-600 disabled:text-neutral-400 disabled:cursor-default"
            >
              Limpar
            </button>
          )}
        </form>
      </div>
      {isLoading && !title && <Loading />}
    </>
  );
};

export default InputURL;
