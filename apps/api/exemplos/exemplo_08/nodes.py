from langgraph.prebuilt.tool_node import ToolNode


from state import State
from tools import TOOLS
from utils import load_llm


tool_node = ToolNode(tools=TOOLS)


def call_llm(state: State) -> State:
    print("> call_llm")
    llm_with_tools = load_llm().bind_tools(TOOLS)
    result = llm_with_tools.invoke(state["messages"])
    return {"messages": [result]}