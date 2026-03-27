from rich import print
from rich.prompt import Prompt
from rich.markdown import Markdown
from langgraph.pregel.main import asyncio
from langgraph.graph.state import RunnableConfig
from langchain_core.messages import AIMessage, BaseMessage, HumanMessage, SystemMessage

from checkpointer import build_checkpointer
from context import Context
from graph import build_graph
from prompts import SYSTEM_PROMPT
from utils import Connection, async_lifespan


def run_graph(connection: Connection) -> None:
    checkpointer = build_checkpointer(connection)
    graph = build_graph(checkpointer)

    context = Context(user_type="plus")

    config = RunnableConfig(configurable={"thread_id": 1})

    all_messages: list[BaseMessage] = []

    prompt = Prompt()
    prompt.prompt_suffix = ""

    while True:
        user_input = prompt.ask("[bold cyan]Você: \n")
        print(Markdown("\n\n --- \n\n"))

        if user_input.lower() in ["q", "quit"]:
            print("\n\n Bye bye! \n\n")
            break

        human_message = HumanMessage(user_input)
        current_loop_messages = [human_message]

        if len(all_messages) == 0:
            current_loop_messages = [SystemMessage(SYSTEM_PROMPT), human_message]

        result = graph.invoke({"messages": current_loop_messages}, config=config, context=context)

        print("[bold cyan]RESPOSTA: \n")
        print(Markdown(result["messages"][-1].content))
        print(Markdown("\n\n --- \n\n"))

        all_messages = result["messages"]
    
    # print(all_messages)
    print(graph.get_state(config=config))


async def main() -> None:
    async with async_lifespan() as connection:
        run_graph(connection)

if __name__ == "__main__":
    asyncio.run(main())