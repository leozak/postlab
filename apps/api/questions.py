from langchain_core.messages import HumanMessage, SystemMessage
from pydantic import BaseModel

from utils import load_llm


class Aswers(BaseModel):
    id: str
    texto: str

class Questions(BaseModel):
    id: int
    pergunta: str
    respostas: list[Aswers]

class QuestionsResponse(BaseModel):
    questions: list[Questions]


def questions(text: str) -> str:
    print("> questions")
        
    system_message = SystemMessage(
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
    human_message = HumanMessage(text)
    messages = [system_message, human_message]

    llm = load_llm()
    structured_output = llm.with_structured_output(QuestionsResponse)
    result = structured_output.invoke(messages)

    return result