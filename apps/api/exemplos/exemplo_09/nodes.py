from langgraph.prebuilt.tool_node import ToolNode
from langgraph.runtime import Runtime
from rich import print


from state import State
from tools import TOOLS
from utils import load_llm
from context import Context


tool_node = ToolNode(tools=TOOLS)


def call_llm(state: State, runtime: Runtime[Context]) -> State:
    print("> call_llm")
    ctx = runtime.context
    user_type = ctx.user_type

    print("[bold cyan]> runtime:", runtime)
    print("[bold cyan]> ctx:", ctx)
    print("[bold cyan]> user_type:", user_type)
    
    llm_with_tools = load_llm().bind_tools(TOOLS)
    result = llm_with_tools.invoke(state["messages"])
    
    return {"messages": [result]}