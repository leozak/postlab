import os
from typing import cast
from dotenv import load_dotenv


# from langchain_nvidia_ai_endpoints import ChatNVIDIA
from langchain.chat_models import BaseChatModel, init_chat_model

load_dotenv()
LLM_MODEL = os.getenv("LLM_MODEL")
LLM_URL = os.getenv("LLM_URL")
LLM_API_KEY = os.getenv("LLM_API_KEY")


def load_llm() -> BaseChatModel:
    return init_chat_model(model_provider="nvidia", model=LLM_MODEL, api_key=LLM_API_KEY, temperature=0.1, configurable_fields="any")
    # model = cast(
    #     "BaseChatModel",
    #     init_chat_model(
    #         model_provider="nvidia",
    #         model=LLM_MODEL,
    #         api_key=LLM_API_KEY,
    #         base_url=LLM_URL,
    #         temperature=0.2,
    #         configurable_fields="any",
    #     ),
    # )

    # assert hasattr(model, "bind_tools")
    # assert hasattr(model, "invoke")
    # assert hasattr(model, "with_config")

    # return model
    