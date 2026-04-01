from langchain_core.messages import HumanMessage, SystemMessage
from pydantic import BaseModel

from utils import load_llm

class Posts(BaseModel):
    text: str
    tags: list[str]

class PostsResponse(BaseModel):
    posts: list[Posts]

def get_posts(text: str, ideology: str, answers: list) -> str:
    print("> create posts")

    system_message = SystemMessage(
        """
        Você é um assistente especializado em análise de conteúdo político-ideológico e criação de conteúdo para redes sociais.

        Você receberá um material contendo:
        1. Um texto base (posicionamento ideológico, artigo, discurso, etc.).
        2. Um conjunto de perguntas e respostas que refletem a interação com o usuário sobre esse material.

        Seu papel é analisar esse conteúdo e criar **6 posts para a rede social X (antigo Twitter)**.

        Diretrizes para os posts:
        - Cada post deve ter no máximo 280 caracteres.
        - Os posts devem refletir o posicionamento ideológico presente no material, mantendo coerência com o tom e os argumentos.
        - Varie o formato: alguns podem ser mais diretos (frases de efeito), outros podem ser perguntas retóricas, citações, ou pequenos argumentos.
        - Sempre que possível, utilize elementos das perguntas e respostas para enriquecer os posts.
        - Os posts devem ser relevantes, engajadores e adequados ao contexto da rede social X.

        Além dos posts, você deve gerar **tags (hashtags) relevantes** para cada post, que podem variar ou se repetir conforme a necessidade.

        A saída deve ser estruturada no seguinte formato JSON:

        {
          "posts": [
            {
              "texto": "string com o conteúdo do post",
              "tags": ["tag1", "tag2"]
            },
            ... (6 itens no total)
          ]
        }

        Não inclua texto adicional fora do JSON. Apenas retorne o JSON com os 6 posts.
        """
    )
    prompt = ""

    prompt += f"Texto base: {text}\n\n"
    prompt += f"Posicionamento ideológico do usuário: {ideology}\n\n"
    
    prompt += "Aqui estão as perguntas e respostas do usuário:\n\n"
    for i, answer in enumerate(answers, 1):
        prompt += f"Pergunta {i}: {answer.question}\n"
        prompt += f"Resposta {i}: {answer.answer}\n\n"

    human_message = HumanMessage(prompt)

    messages = [system_message, human_message]

    llm = load_llm()
    structured_output = llm.with_structured_output(PostsResponse)
    result = structured_output.invoke(messages)

    return result