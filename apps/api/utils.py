import os
from dotenv import load_dotenv

from langchain.chat_models import BaseChatModel, init_chat_model
from langchain_openrouter import ChatOpenRouter


load_dotenv()
MODEL_PROVIDER = os.getenv("MODEL_PROVIDER")
LLM_MODEL = os.getenv("LLM_MODEL")
LLM_URL = os.getenv("LLM_URL")
LLM_API_KEY = os.getenv("LLM_API_KEY")


def load_llm() -> BaseChatModel:
    # return ChatOpenRouter(
    #     model=LLM_MODEL,
    #     api_key=LLM_API_KEY,
    #     base_url=LLM_URL,
    #     temperature=0.8
    # )
    return init_chat_model(
        model_provider=MODEL_PROVIDER,
        model=LLM_MODEL,
        api_key=LLM_API_KEY,
        temperature=0.8
    )