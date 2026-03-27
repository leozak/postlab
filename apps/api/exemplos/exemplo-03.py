from typing import TypedDict, Annotated, Literal
from langgraph.graph import StateGraph, START, END
from rich import print
import operator
from dataclasses import dataclass


@dataclass
class State:
    nodes_path: Annotated[list[str], operator.add]
    current_number: int = 0



def node_a(state: State) -> State:
    output_state: State = State(nodes_path=["A"], current_number=state.current_number)
    print("> node_a", f"{state=}", f"{output_state=}")
    return output_state


def node_b(state: State) -> State:
    output_state: State = State(nodes_path=["B"], current_number=state.current_number)   
    print("> node_b", f"{state=}", f"{output_state=}")
    return output_state


def node_c(state: State) -> State:
    output_state: State = State(nodes_path=["C"], current_number=state.current_number)   
    print("> node_c", f"{state=}", f"{output_state=}")
    return output_state



# Função condicional
def the_conditional(state: State) -> Literal["B", "C"]:
    if state.current_number >= 50:
        return "goes_to_C"
    
    return "goes_to_B"



# 3 - Definir o builder do grafo
builder = StateGraph(State)



# 4 - Adicionar os nodes
builder.add_node("A", node_a)
builder.add_node("B", node_b)
builder.add_node("C", node_c)



# 5 - Adicionar as arestas
builder.add_edge(START, "A")
builder.add_conditional_edges("A", the_conditional, {
    "goes_to_B": "B",
    "goes_to_C": "C"
})
builder.add_edge("C", END)
builder.add_edge("B", END)



# 6 - Construir o grafo
graph = builder.compile()
print(graph.get_graph().draw_mermaid())


# Pegar a resposta
response = graph.invoke(State(nodes_path=[]))
# Resultado final
print("\n\n", f"{response=}", "\n\n")

# Pegar a resposta
response = graph.invoke(State(nodes_path=[], current_number=100))
# Resultado final
print("\n\n", f"{response=}", "\n\n")
