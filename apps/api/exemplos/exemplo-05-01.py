import os
from dotenv import load_dotenv
from langchain.chat_models import init_chat_model
from langchain.tools import BaseTool, tool
from langchain_core.messages import (
    AIMessage,
    BaseMessage,
    HumanMessage,
    SystemMessage,
    ToolMessage,
)
from langchain_nvidia_ai_endpoints import ChatNVIDIA
from pydantic import ValidationError
from rich import print

@tool
def multiply(a: float, b: float) -> float:
    """Multiply a * b and returns the result

    Args:
        a: float multiplicand
        b: float multiplier

    Returns:
        the resulting float of the equation a * b
    """
    return a * b

load_dotenv()
LLM_MODEL = os.getenv("LLM_MODEL")
LLM_URL = os.getenv("LLM_URL")
LLM_API_KEY = os.getenv("LLM_API_KEY")


llm = ChatNVIDIA(
    model=LLM_MODEL,
    url=LLM_URL,
    api_key=LLM_API_KEY,
    temperature=0.1
)

# Criamos as mensagens
system_message = SystemMessage(
    "You are a helpful assistant. You have access to tools. When the user asks "
    "for something, first look if you have a tool that solves that problem."
)
human_message = HumanMessage("Pode me falar quanto é 1.13 vezes 2.31?")

# Adicionar as mensagens no histórico
messages: list[BaseMessage] = [system_message, human_message]

# Criamos a lista de ferramentas
tools: list[BaseTool] = [multiply]
# Isso ajuda a encontrar a ferramenta por nome
tools_by_name = {tool.name: tool for tool in tools}

# Criamos um LLM com base no anterior, mas com acesso a tools.
llm_with_tools = llm.bind_tools(tools)

# Enviar as mensagens para o modelo
llm_response = llm_with_tools.invoke(messages)

# Adicionamos a resposta do modelo no histórico
messages.append(llm_response)

# Conferimos se o modelo tentou chamar alguma ferramenta
if isinstance(llm_response, AIMessage) and getattr(llm_response, "tool_calls", None):
    # Pegamos a última chamada para ferramenta
    call = llm_response.tool_calls[-1]

    # Pegamos os dados que o modelo tentou usar para chamar nossa ferramenta.
    name, args, id_ = call["name"], call["args"], call["id"]

    # Tentamos garantir que não teremos erros aqui, por isso try/except
    try:
        # Executamos a ferramenta com os dados que o modelo nos passou
        content = tools_by_name[name].invoke(args)
        status = "success"
    except (KeyError, IndexError, TypeError, ValidationError, ValueError) as error:
        # Se der erro, vou informar para o modelo
        content = f"Please, fix your mistakes: {error}"
        status = "error"
    
    # Cria uma tool message
    tool_message = ToolMessage(content=content, tool_call_id=id_, status=status)
    # Adiciona a tool message no histórico de mensagens
    messages.append(tool_message)

    # Passa o histórico para o modelo (agora com o resultado da tool)
    llm_response = llm_with_tools.invoke(messages)
    # Adiciona a resposta do modelo no histórico de mensagens
    messages.append(llm_response)

# Exibe o resultado (com ou sem tool_calls)
print(messages)

