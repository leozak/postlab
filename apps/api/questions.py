from langchain_core.messages import HumanMessage, SystemMessage
from pydantic import BaseModel

from utils import load_llm


class Aswers(BaseModel):
    id: str
    text: str

class Questions(BaseModel):
    id: int
    question: str
    aswers: list[Aswers]

class QuestionsResponse(BaseModel):
    questions: list[Questions]


def questions(text: str) -> str:
    print("> questions")
        
    system_message1 = SystemMessage(
        """
        CRITICAL: Detect the input language and respond in that same language.

        Requirements:
        - Exactly 5 questions
        - Each question: 2-5 answer options
        - Opinion-based only (no facts, no correct answers)
        - Options represent different stances/values
        - Reference specific text content

        Focus on: user reactions, priorities, ethical stance, and preferred approaches.
        """
    )
    system_message2 = SystemMessage(
        """
        ⚠️  INSTRUÇÃO PRINCIPAL  
        Detecte o idioma da mensagem do usuário e responda **exatamente no mesmo idioma**.

        🗂️  TAREFA  
        Elabore **pelo menos 5 perguntas** relacionadas ao texto ou ao assunto que o usuário enviou.

        🔹 Cada pergunta deve:
        • Contar com **2 a 5 opções de resposta**.  
        • Ser **opinion‑based** – não há “resposta correta” nem fatos a serem confirmados.  
        • Apresentar opções que reflitam **posições, valores ou perspectivas diferentes**.  
        • **Referenciar explicitamente** algum trecho, ideia ou conceito do conteúdo fornecido.  

        📝  FORMATO DE SAÍDA  
        1. Numere as perguntas de **1 a 5**.  
        2. Para cada pergunta, enumere as opções com **letras minúsculas** (a, b, c, …).  
        3. Use linguagem natural, clara e neutra; **não inclua explicações, justificação ou comentários adicionais**.  

        🚀  EXEMPLO DE SAÍDA (para referência apenas – **não inclua** no resultado real)

        1. Qual a sua impressão geral sobre o argumento apresentado no parágrafo 2?  
            a) Concordo plenamente – acho que o autor tem razão.  
            b) Tenho dúvidas – vejo pontos frágeis no raciocínio.  
            c) Discordo – acredito que o ponto de vista está equivocado.  
        """
    )
    human_message = HumanMessage(text)
    messages = [system_message1, human_message]

    llm = load_llm()
    structured_output = llm.with_structured_output(QuestionsResponse)
    result = structured_output.invoke(messages)

    return result