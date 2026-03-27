import os
from dotenv import load_dotenv
from langchain_nvidia_ai_endpoints import ChatNVIDIA
from langchain_core.messages import SystemMessage, HumanMessage
from rich import print

load_dotenv()

LLM_MODEL = os.getenv("LLM_MODEL")
LLM_URL = os.getenv("LLM_URL")
LLM_API_KEY = os.getenv("LLM_API_KEY")

llm = ChatNVIDIA(
  model=LLM_MODEL,
  url=LLM_URL,
  api_key=LLM_API_KEY,
  temperature=0.1,
)

system_message = SystemMessage("Você é um agente de chat inteligente, que responde perguntas sobre a ciência da computação.")

human_message = HumanMessage("Qual o tamanho de RAM necessária para carregar um modelo de 120B?")

messages = [system_message, human_message]

response = llm.invoke(messages)

print(response)