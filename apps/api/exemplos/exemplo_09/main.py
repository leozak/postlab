import builtins
from typing import Literal

from rich import print
from rich.prompt import Prompt
from rich.markdown import Markdown
from langgraph.graph.state import RunnableConfig
from langchain_core.messages import AIMessage, BaseMessage, HumanMessage, SystemMessage

from graph import build_graph
from prompts import SYSTEM_PROMPT
from context import Context

def main() -> None:
    graph = build_graph()

    config = RunnableConfig(configurable={"thread_id": 1})

    context = Context(user_type="plus")

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


if __name__ == "__main__":
    main()