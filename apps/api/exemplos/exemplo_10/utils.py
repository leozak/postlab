import os
from dotenv import load_dotenv

from collections.abc import AsyncGenerator, Generator
from contextlib import asynccontextmanager, contextmanager
from functools import lru_cache

# from langchain_nvidia_ai_endpoints import ChatNVIDIA
from langchain.chat_models import init_chat_model
from langgraph.graph.state import Runnable

load_dotenv()
LLM_MODEL = os.getenv("LLM_MODEL")
LLM_URL = os.getenv("LLM_URL")
LLM_API_KEY = os.getenv("LLM_API_KEY")


def load_llm() -> Runnable:
    return init_chat_model(
        model_provider="nvidia",
        model=LLM_MODEL,
        api_key=LLM_API_KEY,
        temperature=0.1,
        configurable_fields=["temperature"]
    )
    # return ChatNVIDIA(
    #     model=LLM_MODEL,
    #     url=LLM_URL,
    #     api_key=LLM_API_KEY,
    #     temperature=0.1
    # )


class Connection:
    def use(self) -> None:
        print("> use connection")
    
    def open_connection(self) -> None:
        print("> open connection")
    
    def close_connection(self) -> None:
        print("> close connection")


@lru_cache
def get_connection() -> Connection:
    return Connection()


@contextmanager
def sync_lifespan() -> Generator[Connection]:
    print("> sync_lifespan start")
    yield get_connection()
    print("> sync_lifespan end")


@asynccontextmanager
async def async_lifespan() -> AsyncGenerator[Connection]:
    print("> async_lifespan start")
    yield get_connection()
    print("> async_lifespan end")